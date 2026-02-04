/**
 * AI Analyzer Reference Guide
 * 
 * This file provides a quick reference for AI recommendation logic.
 * Use this to match user requirements to the best AI tools.
 */

export interface AIMatchCriteria {
  budgetRange: 'free' | 'low' | 'medium' | 'high' | 'enterprise';
  useCase: string;
  priorityFeatures: string[];
}

export interface AIRecommendationProfile {
  aiId: string;
  aiName: string;
  bestFor: string[];
  notGoodFor: string[];
  budgetCategory: 'free' | 'low' | 'medium' | 'high' | 'enterprise';
  keyStrengths: string[];
  keyWeaknesses: string[];
  technicalLevel: 'beginner' | 'intermediate' | 'advanced';
  integrationComplexity: 'easy' | 'moderate' | 'complex';
}

export const aiRecommendationProfiles: AIRecommendationProfile[] = [
  {
    aiId: '1',
    aiName: 'ChatGPT',
    bestFor: ['General writing', 'Beginner coding', 'Learning', 'Brainstorming', 'Customer support'],
    notGoodFor: ['Real-time data', 'Specialized domains without context', 'Mission-critical accuracy'],
    budgetCategory: 'low',
    keyStrengths: ['Versatile', 'Large knowledge base', 'Conversational', 'Easy to use'],
    keyWeaknesses: ['Knowledge cutoff date', 'Can hallucinate', 'May refuse some requests'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '2',
    aiName: 'Claude',
    bestFor: ['Complex analysis', 'Long documents', 'Research', 'Code review', 'Honest feedback'],
    notGoodFor: ['Image generation', 'Speed-critical tasks', 'Casual conversations'],
    budgetCategory: 'low',
    keyStrengths: ['Excellent reasoning', 'Very long context', 'Honest responses', 'Strong ethics'],
    keyWeaknesses: ['More conservative', 'Slower responses', 'Limited image generation'],
    technicalLevel: 'intermediate',
    integrationComplexity: 'easy',
  },
  {
    aiId: '3',
    aiName: 'Google Gemini',
    bestFor: ['Real-time research', 'Google Workspace integration', 'Current events', 'Multimodal tasks'],
    notGoodFor: ['Privacy-sensitive work', 'Creative writing', 'Non-Google ecosystems'],
    budgetCategory: 'low',
    keyStrengths: ['Real-time data', 'Google ecosystem', 'Multimodal', 'Fast'],
    keyWeaknesses: ['Privacy concerns', 'Less creative', 'Limited availability'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '4',
    aiName: 'DALL-E 3',
    bestFor: ['Marketing visuals', 'Concept art', 'Safe content', 'Professional images'],
    notGoodFor: ['Artistic freedom', 'Budget projects', 'Mature content'],
    budgetCategory: 'medium',
    keyStrengths: ['High quality', 'Follows prompts well', 'Safe content', 'Easy to use'],
    keyWeaknesses: ['Content restrictions', 'Slower generation', 'Higher cost'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '5',
    aiName: 'Midjourney',
    bestFor: ['Artistic images', 'Branding', 'High-quality visuals', 'Style consistency'],
    notGoodFor: ['Text rendering', 'Simple interfaces', 'Quick iterations'],
    budgetCategory: 'medium',
    keyStrengths: ['Artistic quality', 'Style variety', 'Active community', 'Consistent results'],
    keyWeaknesses: ['Discord-only interface', 'Learning curve', 'No free tier'],
    technicalLevel: 'intermediate',
    integrationComplexity: 'moderate',
  },
  {
    aiId: '6',
    aiName: 'Stable Diffusion',
    bestFor: ['Privacy', 'Custom models', 'Research', 'Full control'],
    notGoodFor: ['Beginners', 'Quick setup', 'Non-technical users'],
    budgetCategory: 'free',
    keyStrengths: ['Free and open', 'Full control', 'Customizable', 'Privacy'],
    keyWeaknesses: ['Technical setup', 'Requires hardware', 'Inconsistent quality', 'NSFW content risk'],
    technicalLevel: 'advanced',
    integrationComplexity: 'complex',
  },
  {
    aiId: '7',
    aiName: 'GitHub Copilot',
    bestFor: ['Coding', 'IDE integration', 'Learning to code', 'Fast development'],
    notGoodFor: ['Non-coding tasks', 'Critical systems', 'License-sensitive projects'],
    budgetCategory: 'low',
    keyStrengths: ['Seamless IDE integration', 'Multi-language', 'Fast', 'Context-aware'],
    keyWeaknesses: ['License concerns', 'Sometimes wrong', 'Dependency on GitHub'],
    technicalLevel: 'intermediate',
    integrationComplexity: 'easy',
  },
  {
    aiId: '8',
    aiName: 'Cursor',
    bestFor: ['AI-first development', 'Refactoring', 'Large codebases', 'Pair programming'],
    notGoodFor: ['Established workflows', 'Extension-dependent users', 'Simple scripts'],
    budgetCategory: 'low',
    keyStrengths: ['Codebase awareness', 'Natural interaction', 'Powerful refactoring', 'Fast'],
    keyWeaknesses: ['New ecosystem', 'Requires switching editors', 'Limited extensions'],
    technicalLevel: 'intermediate',
    integrationComplexity: 'moderate',
  },
  {
    aiId: '9',
    aiName: 'Perplexity AI',
    bestFor: ['Research', 'Fact-checking', 'Current information', 'Citations'],
    notGoodFor: ['Creative tasks', 'Long-form content', 'Image generation'],
    budgetCategory: 'low',
    keyStrengths: ['Accurate citations', 'Real-time data', 'Source transparency', 'Fast'],
    keyWeaknesses: ['Limited creativity', 'Search-focused only', 'Can miss context'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '10',
    aiName: 'Runway',
    bestFor: ['Video production', 'Professional editing', 'Marketing videos', 'AI effects'],
    notGoodFor: ['Budget projects', 'Simple edits', 'Long videos'],
    budgetCategory: 'high',
    keyStrengths: ['Video-focused', 'Professional tools', 'Easy interface', 'High quality'],
    keyWeaknesses: ['Expensive', 'Credit system', 'Learning curve', 'Processing time'],
    technicalLevel: 'intermediate',
    integrationComplexity: 'moderate',
  },
  {
    aiId: '11',
    aiName: 'ElevenLabs',
    bestFor: ['Voice-overs', 'Podcasts', 'Audiobooks', 'Multi-language content'],
    notGoodFor: ['Ethical concerns', 'Unlimited usage on budget', 'Perfect accents'],
    budgetCategory: 'low',
    keyStrengths: ['Realistic voices', 'Easy cloning', 'Many languages', 'High quality'],
    keyWeaknesses: ['Ethical concerns', 'Usage limits', 'Accent accuracy varies'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '12',
    aiName: 'Jasper',
    bestFor: ['Marketing teams', 'Brand consistency', 'SEO content', 'Team collaboration'],
    notGoodFor: ['Individual creators', 'Budget projects', 'Creative writing'],
    budgetCategory: 'high',
    keyStrengths: ['Marketing-focused', 'Templates', 'Team collaboration', 'Brand consistency'],
    keyWeaknesses: ['Expensive', 'Generic output', 'Requires editing', 'Learning curve'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '13',
    aiName: 'Copy.ai',
    bestFor: ['Social media', 'Quick copy', 'Small businesses', 'Ad copy'],
    notGoodFor: ['Long-form content', 'Deep analysis', 'Technical writing'],
    budgetCategory: 'medium',
    keyStrengths: ['Affordable', 'Easy to use', 'Many templates', 'Free tier'],
    keyWeaknesses: ['Generic content', 'Limited depth', 'Needs heavy editing'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '14',
    aiName: 'Notion AI',
    bestFor: ['Notion users', 'Documentation', 'Note-taking', 'Team wikis'],
    notGoodFor: ['Non-Notion users', 'Advanced AI tasks', 'Standalone AI work'],
    budgetCategory: 'low',
    keyStrengths: ['Notion integration', 'Affordable', 'Seamless workflow', 'Easy to use'],
    keyWeaknesses: ['Requires Notion', 'Limited compared to dedicated AI', 'Basic features'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '15',
    aiName: 'Grammarly',
    bestFor: ['Writing improvement', 'Professional communication', 'Grammar checking', 'Students'],
    notGoodFor: ['Privacy-sensitive documents', 'Creative freedom', 'Complex formatting'],
    budgetCategory: 'low',
    keyStrengths: ['Accurate corrections', 'Real-time feedback', 'Wide integration', 'Easy'],
    keyWeaknesses: ['Privacy concerns', 'Can be overzealous', 'Premium features expensive'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '16',
    aiName: 'Otter.ai',
    bestFor: ['Meeting transcription', 'Interviews', 'Lectures', 'English content'],
    notGoodFor: ['Accented speech', 'Noisy environments', 'Non-English primary'],
    budgetCategory: 'low',
    keyStrengths: ['Accurate transcription', 'Real-time', 'Affordable', 'Easy sharing'],
    keyWeaknesses: ['Accent challenges', 'Background noise issues', 'English-focused'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '17',
    aiName: 'Synthesia',
    bestFor: ['Training videos', 'Corporate communication', 'Multi-language videos', 'No-camera content'],
    notGoodFor: ['Authentic content', 'Budget projects', 'Highly customized videos'],
    budgetCategory: 'high',
    keyStrengths: ['Professional avatars', 'Many languages', 'No filming needed', 'Fast'],
    keyWeaknesses: ['Expensive', 'Uncanny valley', 'Limited customization', 'Credit system'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '18',
    aiName: 'Tableau',
    bestFor: ['Enterprise analytics', 'Complex visualizations', 'BI teams', 'Data science'],
    notGoodFor: ['Small teams', 'Simple charts', 'Budget projects'],
    budgetCategory: 'enterprise',
    keyStrengths: ['Powerful analytics', 'Beautiful visualizations', 'Enterprise-grade', 'Integrations'],
    keyWeaknesses: ['Very expensive', 'Steep learning curve', 'Overkill for small teams'],
    technicalLevel: 'advanced',
    integrationComplexity: 'complex',
  },
  {
    aiId: '19',
    aiName: 'Beautiful.ai',
    bestFor: ['Business presentations', 'Fast slide creation', 'Non-designers', 'Pitches'],
    notGoodFor: ['Complex customization', 'PowerPoint migration', 'Offline work'],
    budgetCategory: 'low',
    keyStrengths: ['Beautiful designs', 'Fast creation', 'Easy to use', 'Smart layouts'],
    keyWeaknesses: ['Limited customization', 'Template-dependent', 'Not as flexible as PowerPoint'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '20',
    aiName: 'Fireflies.ai',
    bestFor: ['Sales calls', 'Customer success', 'Remote teams', 'CRM integration'],
    notGoodFor: ['Privacy-sensitive calls', 'In-person meetings', 'Offline recording'],
    budgetCategory: 'low',
    keyStrengths: ['Automatic recording', 'Good integration', 'Affordable', 'Searchable'],
    keyWeaknesses: ['Privacy concerns', 'Accuracy varies', 'Requires permission to record'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '21',
    aiName: 'Pictory',
    bestFor: ['Social media videos', 'Content repurposing', 'Quick videos', 'Beginners'],
    notGoodFor: ['Professional production', 'Unique styles', 'Complex editing'],
    budgetCategory: 'medium',
    keyStrengths: ['Easy video creation', 'Auto-captions', 'Fast', 'Good for beginners'],
    keyWeaknesses: ['Template-based', 'Limited customization', 'Stock footage quality varies'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '22',
    aiName: 'Descript',
    bestFor: ['Podcasts', 'Text-based editing', 'Collaboration', 'Voice cloning'],
    notGoodFor: ['Complex video effects', 'Large files', 'Traditional editing'],
    budgetCategory: 'low',
    keyStrengths: ['Intuitive editing', 'Voice cloning', 'All-in-one', 'Collaborative'],
    keyWeaknesses: ['Learning curve', 'Performance issues', 'Export limitations on free tier'],
    technicalLevel: 'intermediate',
    integrationComplexity: 'moderate',
  },
  {
    aiId: '23',
    aiName: 'Hugging Face',
    bestFor: ['AI research', 'Model experimentation', 'Open source', 'Developers'],
    notGoodFor: ['Non-technical users', 'Production deployments', 'Simple use cases'],
    budgetCategory: 'free',
    keyStrengths: ['Open source', 'Vast model library', 'Community-driven', 'Free tier'],
    keyWeaknesses: ['Technical knowledge required', 'Quality varies', 'Setup complexity'],
    technicalLevel: 'advanced',
    integrationComplexity: 'complex',
  },
  {
    aiId: '24',
    aiName: 'Replicate',
    bestFor: ['API integration', 'Prototyping', 'Model experimentation', 'Scalable deployment'],
    notGoodFor: ['Continuous high usage', 'Custom models', 'Offline work'],
    budgetCategory: 'medium',
    keyStrengths: ['Easy API', 'Pay-per-use', 'Many models', 'Fast deployment'],
    keyWeaknesses: ['Cost can add up', 'Limited control', 'Dependent on third party'],
    technicalLevel: 'intermediate',
    integrationComplexity: 'moderate',
  },
  {
    aiId: '25',
    aiName: 'Framer AI',
    bestFor: ['Landing pages', 'Portfolios', 'Startups', 'Quick websites'],
    notGoodFor: ['Complex web apps', 'E-commerce at scale', 'Full customization'],
    budgetCategory: 'low',
    keyStrengths: ['Fast site creation', 'Beautiful designs', 'Easy to use', 'AI copy'],
    keyWeaknesses: ['Limited templates', 'Framer ecosystem', 'Learning curve for advanced features'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '26',
    aiName: 'Zapier AI',
    bestFor: ['Business automation', 'Integration', 'No-code workflows', 'Data sync'],
    notGoodFor: ['High-volume tasks', 'Complex logic', 'Budget projects at scale'],
    budgetCategory: 'high',
    keyStrengths: ['Massive integrations', 'No-code', 'Powerful', 'AI assistance'],
    keyWeaknesses: ['Expensive at scale', 'Complex pricing', 'Learning curve', 'Task limits'],
    technicalLevel: 'intermediate',
    integrationComplexity: 'moderate',
  },
  {
    aiId: '27',
    aiName: 'Mem',
    bestFor: ['Personal knowledge', 'Research notes', 'No-folder workflow', 'AI organization'],
    notGoodFor: ['Team collaboration', 'Traditional organization', 'Mobile-first users'],
    budgetCategory: 'low',
    keyStrengths: ['Smart organization', 'No folders needed', 'AI connections', 'Clean interface'],
    keyWeaknesses: ['Young product', 'Limited features', 'No free tier', 'Mobile limitations'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '28',
    aiName: 'Character.AI',
    bestFor: ['Entertainment', 'Creative writing', 'Role-play', 'Casual conversation'],
    notGoodFor: ['Factual information', 'Professional use', 'Privacy-sensitive'],
    budgetCategory: 'free',
    keyStrengths: ['Engaging conversations', 'Creative', 'Free tier', 'Many characters'],
    keyWeaknesses: ['Can be inaccurate', 'Content filtering', 'Memory limitations', 'Addictive'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '29',
    aiName: 'Krisp',
    bestFor: ['Remote work', 'Noisy environments', 'Professional calls', 'Podcasting'],
    notGoodFor: ['Music production', 'High-fidelity audio', 'Offline work'],
    budgetCategory: 'low',
    keyStrengths: ['Excellent noise removal', 'Works anywhere', 'Affordable', 'Easy setup'],
    keyWeaknesses: ['Can affect voice quality', 'Resource intensive', 'Subscription required for unlimited'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
  {
    aiId: '30',
    aiName: 'Podcastle',
    bestFor: ['Podcasting', 'Audio content', 'Remote interviews', 'Easy editing'],
    notGoodFor: ['Professional audio engineering', 'Music production', 'Complex workflows'],
    budgetCategory: 'low',
    keyStrengths: ['All-in-one solution', 'Easy editing', 'Good quality', 'Collaborative'],
    keyWeaknesses: ['Limited free tier', 'Some features buggy', 'Export limitations'],
    technicalLevel: 'beginner',
    integrationComplexity: 'easy',
  },
];

/**
 * Helper function to filter AIs by budget
 */
export function filterByBudget(budget: string): string[] {
  const budgetMap: Record<string, string[]> = {
    'Free': ['free'],
    'Under $20/month': ['free', 'low'],
    '$20-$50/month': ['free', 'low', 'medium'],
    '$50-$100/month': ['free', 'low', 'medium', 'high'],
    'Enterprise': ['free', 'low', 'medium', 'high', 'enterprise'],
  };

  const allowedCategories = budgetMap[budget] || ['free', 'low', 'medium', 'high', 'enterprise'];
  
  return aiRecommendationProfiles
    .filter(profile => allowedCategories.includes(profile.budgetCategory))
    .map(profile => profile.aiId);
}

/**
 * Helper function to get AIs by use case
 */
export function getAIsByUseCase(useCase: string): string[] {
  return aiRecommendationProfiles
    .filter(profile => 
      profile.bestFor.some(bf => 
        bf.toLowerCase().includes(useCase.toLowerCase())
      )
    )
    .map(profile => profile.aiId);
}

/**
 * Helper function to get AIs by technical level
 */
export function getAIsByTechnicalLevel(level: 'beginner' | 'intermediate' | 'advanced'): string[] {
  const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
  const userLevel = levelOrder[level];
  
  return aiRecommendationProfiles
    .filter(profile => levelOrder[profile.technicalLevel] <= userLevel)
    .map(profile => profile.aiId);
}

/**
 * Helper function to match features to AIs
 */
export function matchFeaturesToAIs(features: string[]): Record<string, number> {
  const scores: Record<string, number> = {};
  
  features.forEach(feature => {
    aiRecommendationProfiles.forEach(profile => {
      const featureLower = feature.toLowerCase();
      const matchScore = profile.keyStrengths.filter(strength => 
        strength.toLowerCase().includes(featureLower) ||
        featureLower.includes(strength.toLowerCase())
      ).length;
      
      scores[profile.aiId] = (scores[profile.aiId] || 0) + matchScore;
    });
  });
  
  return scores;
}
