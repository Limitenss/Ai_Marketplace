# AI Marketplace - Open Source Edition

A modern, dark-themed AI tool discovery and recommendation platform powered by Groq's AI API.

## 🚀 Features

- **Dark Theme UI** with glass morphism effects
- **AI Recommendations** using Groq API (llama-3.3-70b-versatile)
- **30+ AI Tools** database with detailed information
- **Staff Picks** - Featured top-rated AI tools
- **Scenario Analyzer** - Get personalized AI recommendations based on your use case
- **Browse AI** - Explore our comprehensive AI database
- **Security First** - Built-in protections against common vulnerabilities
  - Helmet.js for security headers
  - Rate limiting to prevent abuse
  - Input validation and sanitization
  - CORS protection

## 📋 Requirements

- Node.js 16+ 
- npm or yarn
- Groq API Key (get free at [https://console.groq.com](https://console.groq.com))

## 🔧 Installation

### 1. Clone or Extract the Repository
```bash
# If downloaded as ZIP
unzip ai-marketplace-opensource.zip
cd ai-marketplace-opensource
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Create environment file (optional for local testing)
# .env file is already configured in vite.config.ts
```

### 3. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with your Groq API key
# Create a file named `.env` and add:
echo GROQ_API_KEY=your_actual_groq_api_key_here > .env
echo CORS_ORIGIN=http://localhost:5173 >> .env
echo PORT=3001 >> .env
```

**Important:** Get your free Groq API key from [https://console.groq.com](https://console.groq.com)

### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
# Backend running on http://localhost:3001
```

**Terminal 2 - Start Frontend (in project root):**
```bash
npm run dev
# Frontend running on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

## 📁 Project Structure

```
ai-marketplace-opensource/
├── src/                      # React frontend
│   ├── components/          # React components
│   ├── data/               # AI database & reference data
│   ├── styles/             # Component CSS files
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── server/                  # Express backend
│   ├── index.js            # API server & Groq integration
│   ├── .env.example        # Environment template
│   └── package.json        # Backend dependencies
├── public/                  # Static assets
├── package.json            # Frontend dependencies
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status (always available, no rate limit)

### Get All AIs
```
GET /api/ais
```
Returns list of all AI tools in database

### Analyze & Get Recommendations
```
POST /api/analyze
Content-Type: application/json

{
  "useCase": "I need help with data analysis",
  "skills": "python, sql",
  "budget": "free",
  "priorities": "accuracy, ease of use"
}
```

**Response:**
```json
{
  "analysis": "Based on your requirements...",
  "recommendations": [
    {
      "name": "AI Tool Name",
      "score": 0.95,
      "reasoning": "Why this tool matches your needs"
    }
  ]
}
```

## 🔐 Security Features

### Implemented Protections
- ✅ **Helmet.js** - Security headers (CSP, X-Frame-Options, etc.)
- ✅ **Rate Limiting** - 30 requests per 15 minutes per IP (can be adjusted)
- ✅ **Input Validation** - All fields validated before processing
- ✅ **Sanitization** - XSS attack prevention
- ✅ **CORS** - Restricted to configured origin
- ✅ **Payload Size Limit** - 10KB max request size
- ✅ **Error Handling** - Safe error messages (no stack traces)

### Environment Variables
Never commit `.env` files! The `.env.example` file shows required variables:

```env
# .env (NOT in version control)
GROQ_API_KEY=your_api_key_here
CORS_ORIGIN=http://localhost:5173
PORT=3001
```

## 🛠 Build for Production

### Frontend Build
```bash
npm run build
# Output in `dist/` folder
```

### Deploy

**Option 1: Vercel (Recommended for Frontend)**
```bash
npm install -g vercel
vercel
# Follow prompts, set API_ENDPOINT env var to your backend URL
```

**Option 2: Heroku (Backend)**
```bash
# Ensure Procfile exists or add:
echo "web: node server/index.js" > Procfile

heroku create your-app-name
git push heroku main
```

**Option 3: Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
WORKDIR /app/server
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### "Cannot GET /api/analyze"
- Ensure backend is running on port 3001
- Check CORS_ORIGIN in backend `.env` matches frontend URL

### "Invalid API Key"
- Verify Groq API key in `server/.env`
- Generate new key at https://console.groq.com

### "CORS Error"
- Update `CORS_ORIGIN` in `server/.env` to match frontend URL
- Restart backend server

### Rate Limit Exceeded (429 error)
- Wait 15 minutes or adjust rate limit in `server/index.js`

## 📚 Documentation

- [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) - Detailed security analysis
- [SECURITY_IMPLEMENTATION.md](./SECURITY_IMPLEMENTATION.md) - Security implementation details
- [SECURITY_SUMMARY.md](./SECURITY_SUMMARY.md) - Security best practices checklist
- [README.md](./README.md) - Original project README
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Additional setup information

## 📊 Tech Stack

**Frontend:**
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.3.1
- CSS3 (Glass morphism & animations)

**Backend:**
- Express 4.18.2
- Groq SDK 0.3.3
- Helmet 7.2.0
- express-rate-limit 7.5.1

**Model:**
- Llama 3.3 70B (via Groq API)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source. See LICENSE file for details.

## 🙏 Acknowledgments

- Groq for the amazing AI API
- Open source community for the awesome libraries
- All AI tool creators featured in our database

## 🔗 Links

- **Groq Console:** https://console.groq.com
- **Groq Documentation:** https://console.groq.com/docs
- **React Documentation:** https://react.dev
- **Express Documentation:** https://expressjs.com

## ❓ Questions?

For issues and questions, please open an issue on GitHub or contact the project maintainers.

---

**Happy exploring! 🚀**
