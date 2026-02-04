# AI Marketplace

A web application for discovering and comparing AI tools. Features an AI-powered recommendation engine built with Groq API.

## Features

- Dark-themed UI with modern design
- AI tool database with 30+ entries
- Recommendation engine (Groq API)
- Tool comparison and browsing
- Security hardened (rate limiting, input validation, CORS)
- RESTful API backend

## Requirements

- Node.js 16+
- npm or yarn
- Groq API key (free tier available at https://console.groq.com)

## Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/ai-marketplace.git
cd ai-marketplace
```

### Frontend setup
```bash
npm install
```

### Backend setup
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
GROQ_API_KEY=your_groq_api_key_here
CORS_ORIGIN=http://localhost:5173
PORT=3001
EOF
```

### Run the application

Terminal 1 - Backend:
```bash
cd server
npm start
```

Terminal 2 - Frontend:
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Project structure

```
ai-marketplace/
├── src/                   # React frontend
│   ├── components/        # React components
│   ├── data/             # AI database
│   ├── styles/           # CSS files
│   ├── App.tsx
│   └── main.tsx
├── server/               # Express backend
│   ├── index.js          # API server
│   ├── .env.example
│   └── package.json
├── public/               # Static files
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## API endpoints

### Health check
```
GET /api/health
```

### Get all AI tools
```
GET /api/ais
```

### Get recommendations
```
POST /api/analyze
Content-Type: application/json

{
  "useCase": "I need help with data analysis",
  "skills": "python, sql",
  "budget": "free",
  "priorities": "accuracy"
}
```

Response:
```json
{
  "analysis": "...",
  "recommendations": [
    {
      "name": "Tool Name",
      "score": 0.95,
      "reasoning": "..."
    }
  ]
}
```

## Security

- Rate limiting: 30 requests per 15 minutes per IP
- Input validation and sanitization
- CORS protection
- Security headers (Helmet.js)
- 10KB payload size limit
- Safe error handling

## Build for production

### Frontend
```bash
npm run build
# Output in dist/
```

### Deploy options

Vercel (frontend):
```bash
npm install -g vercel
vercel
```

Heroku (backend):
```bash
heroku create your-app-name
git push heroku main
```

Docker:
```bash
docker build -t ai-marketplace .
docker run -e GROQ_API_KEY=xxx -p 3001:3001 ai-marketplace
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot GET /api/analyze | Ensure backend is running on port 3001 |
| Invalid API Key | Check GROQ_API_KEY in server/.env |
| CORS Error | Update CORS_ORIGIN in server/.env |
| Rate limit exceeded | Wait 15 minutes or adjust limit in server/index.js |

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contributing guidelines
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment instructions
- [SECURITY_AUDIT.md](./SECURITY_AUDIT.md) - Security details
- [QUICK_START.md](./QUICK_START.md) - Quick start guide

## Tech stack

**Frontend:** React 19, TypeScript, Vite, CSS3

**Backend:** Express, Groq SDK, Helmet, rate-limit

**Model:** Llama 3.3 70B (Groq)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

MIT - See LICENSE file for details.

## Links

- [Groq Console](https://console.groq.com)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
