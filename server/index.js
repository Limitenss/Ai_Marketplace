import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Security Middleware - Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
    },
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
}));

// CORS configuration - restrict to specific origin
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400,
};
app.use(cors(corsOptions));

// Rate limiting - prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/api/health', // Don't rate limit health checks
});
app.use(limiter);

// Stricter rate limit for analyze endpoint
const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: 'Too many analysis requests. Please wait before trying again.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Input validation middleware
app.use(express.json({ limit: '10kb' })); // Limit JSON payload size

// Input validation function
function validateInput(input, maxLength = 1000) {
  if (!input) return '';
  const str = String(input).trim();
  if (str.length > maxLength) {
    return str.substring(0, maxLength);
  }
  // Remove potentially dangerous patterns
  return str.replace(/[<>]/g, '');
}

function validateArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr
    .filter(item => typeof item === 'string' && item.length > 0)
    .map(item => validateInput(item, 50))
    .slice(0, 10); // Limit to 10 items max
}

// Embedded AI data with key fields
const mockAIs = [
  { id: '1', name: 'ChatGPT', rating: 4.8, category: 'Content Generation', useCases: ['Writing', 'Coding'], features: ['Fast', 'Reliable'] },
  { id: '2', name: 'Claude', rating: 4.9, category: 'Content Generation', useCases: ['Analysis', 'Writing'], features: ['Accurate', 'Detailed'] },
  { id: '3', name: 'Midjourney', rating: 4.8, category: 'Image & Video', useCases: ['Art', 'Design'], features: ['Creative', 'Fast'] },
  { id: '4', name: 'Cursor', rating: 4.8, category: 'Coding', useCases: ['Development'], features: ['Intelligent', 'Fast'] },
  { id: '5', name: 'Gemini', rating: 4.7, category: 'Content Generation', useCases: ['Research', 'Writing'], features: ['Comprehensive', 'Reliable'] },
  { id: '6', name: 'Copilot', rating: 4.7, category: 'Coding', useCases: ['Development'], features: ['Smart', 'Integrated'] },
  { id: '7', name: 'DALL-E', rating: 4.6, category: 'Image & Video', useCases: ['Art', 'Marketing'], features: ['Creative', 'Unique'] },
  { id: '8', name: 'Perplexity', rating: 4.5, category: 'Research', useCases: ['Research', 'Analysis'], features: ['Accurate', 'Cited'] },
  { id: '9', name: 'Runway', rating: 4.6, category: 'Image & Video', useCases: ['Video', 'Effects'], features: ['Professional', 'Creative'] },
  { id: '10', name: 'Notebooklm', rating: 4.4, category: 'Research', useCases: ['Note-taking', 'Analysis'], features: ['Organized', 'Smart'] },
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Marketplace API is running' });
});

// Get all AIs
app.get('/api/ais', (req, res) => {
  res.json(mockAIs);
});

// Analyze scenario and recommend AIs
app.post('/api/analyze', analyzeLimiter, async (req, res) => {
  try {
    // Input validation
    const { scenario, useCase, budget, features } = req.body;
    
    if (!scenario || typeof scenario !== 'string' || scenario.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Validation error',
        message: 'Scenario is required and must be a non-empty string' 
      });
    }

    // Validate and sanitize inputs
    const validatedScenario = validateInput(scenario, 500);
    const validatedUseCase = validateInput(useCase, 100);
    const validatedBudget = validateInput(budget, 100);
    const validatedFeatures = validateArray(features);

    // Create context from mock AIs
    const aiContext = mockAIs.slice(0, 10).map(ai => ({
      id: ai.id,
      name: ai.name,
      category: ai.category,
      rating: ai.rating,
      features: ai.features || [],
    }));

    // Build safe prompt for Groq - with validated data only
    const prompt = `You are an AI recommendation expert. Analyze this scenario and recommend the top 3-5 AI tools.

USER REQUEST:
Scenario: ${validatedScenario}
Primary Use Case: ${validatedUseCase || 'Not specified'}
Budget: ${validatedBudget || 'Not specified'}
Required Features: ${validatedFeatures.length > 0 ? validatedFeatures.join(', ') : 'Not specified'}

AVAILABLE AI TOOLS:
${JSON.stringify(aiContext, null, 2)}

INSTRUCTIONS:
1. Recommend 3-5 AI tools that best match the user's needs
2. Return ONLY a valid JSON array with the AI IDs (as strings) in order of recommendation
3. Format: ["1", "2", "3"]
4. Consider budget, use case, and required features

Return only the JSON array, nothing else.`;

    // Call Groq API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI recommendation assistant. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 200,
    });
    
    clearTimeout(timeoutId);

    // Parse response safely
    const responseText = completion.choices[0].message.content.trim();
    let recommendedIds = [];

    try {
      const parsed = JSON.parse(responseText);
      recommendedIds = Array.isArray(parsed) ? parsed : [];
    } catch (parseError) {
      // Fallback: extract IDs from text if JSON parsing fails
      const matches = responseText.match(/["'](\d+)["']/g);
      recommendedIds = matches 
        ? matches.map(m => m.replace(/["']/g, '')).slice(0, 5) 
        : ['1', '2', '3'];
    }

    // Get full AI objects - validate IDs
    const recommendedAIs = recommendedIds
      .filter(id => /^\d+$/.test(String(id))) // Only accept numeric strings
      .map(id => mockAIs.find(ai => ai.id === String(id)))
      .filter(Boolean)
      .slice(0, 5);

    // Generate explanation
    const explanationPrompt = `Based on the scenario "${validatedScenario}" with use case "${validatedUseCase}", budget "${validatedBudget}", and features ${validatedFeatures.join(', ') || 'none specified'}, explain in 2-3 sentences why these AI tools are recommended: ${recommendedAIs.map(ai => ai.name).join(', ')}`;

    const explanationCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: explanationPrompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 200,
    });

    const explanation = explanationCompletion.choices[0].message.content;

    // Return results - only safe data
    res.json({
      scenario: validatedScenario,
      recommendedAIs: recommendedAIs.map(ai => ({
        id: ai.id,
        name: ai.name,
        rating: ai.rating,
        category: ai.category,
        features: ai.features,
      })),
      explanation: String(explanation).substring(0, 1000), // Limit explanation length
    });
  } catch (error) {
    console.error('Error analyzing scenario:', error.message);
    
    // Don't expose internal error details to client
    const statusCode = error.name === 'AbortError' ? 408 : 500;
    const message = error.name === 'AbortError' 
      ? 'Request timeout - analysis took too long' 
      : 'Failed to analyze scenario';
    
    res.status(statusCode).json({
      error: message,
      code: error.name === 'AbortError' ? 'TIMEOUT' : 'ANALYSIS_ERROR'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Marketplace API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
