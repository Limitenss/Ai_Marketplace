# ⚡ Quick Start Guide

Get AI Marketplace running in 5 minutes!

## 📦 Prerequisites
- Node.js 16+
- Groq API Key (free at https://console.groq.com)

## 🚀 Quick Setup

### Step 1: Get Groq API Key (2 min)
1. Visit https://console.groq.com
2. Sign up or log in
3. Go to API Keys section
4. Create new API key
5. Copy the key

### Step 2: Setup Backend (2 min)
```bash
cd server

# Create .env file
echo GROQ_API_KEY=paste_your_key_here > .env
echo CORS_ORIGIN=http://localhost:5173 >> .env
echo PORT=3001 >> .env

# Install & run
npm install
npm start
# Backend ready: http://localhost:3001
```

### Step 3: Setup Frontend (1 min)
```bash
# In project root
npm install
npm run dev
# Frontend ready: http://localhost:5173
```

## ✅ Verify It's Working

1. Open http://localhost:5173
2. Try the "Scenario Analyzer" feature
3. Enter any scenario and click "Get Recommendations"
4. Should see 3 AI tool recommendations

## 📁 Project Structure

```
ai-marketplace-opensource/
├── server/              ← Backend API (port 3001)
│   └── .env            ← Paste API key here
├── src/                ← Frontend React (port 5173)
│   ├── components/     ← UI components
│   ├── data/           ← AI database
│   └── styles/         ← CSS files
└── public/             ← Static files
```

## 🔌 API Test (Optional)

```bash
# Test health check
curl http://localhost:3001/api/health

# Test recommendations
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "useCase": "I need help with data analysis",
    "skills": "python",
    "budget": "free",
    "priorities": "accuracy"
  }'
```

## 🛠 Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS Error | Restart backend, check .env CORS_ORIGIN |
| Invalid API Key | Check key in server/.env matches Groq console |
| Port 3001 in use | Change PORT in server/.env |
| Cannot connect | Ensure both servers running in separate terminals |

## 📚 Full Documentation

- **Setup Details:** [OPEN_SOURCE_README.md](./OPEN_SOURCE_README.md)
- **Deployment:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Security:** [SECURITY_AUDIT.md](./SECURITY_AUDIT.md)
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md)

## 🚀 Next Steps

1. **Explore the code** - See how it works
2. **Deploy** - Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
3. **Customize** - Add your own AI tools to database
4. **Contribute** - See [CONTRIBUTING.md](./CONTRIBUTING.md)

## 💡 Common Tasks

### Add Your Own AI Tool
Edit `src/data/mockAIs.ts` and add to the array:
```typescript
{
  id: "my-tool",
  name: "My AI Tool",
  category: "Analysis",
  rating: 4.5,
  description: "Description here",
  features: ["Feature 1", "Feature 2"],
  pricing: "free",
  // ... other properties
}
```

### Change Port Numbers
Backend `server/.env`:
```env
PORT=3002
```

Frontend `vite.config.ts`:
```typescript
server: {
  port: 5174
}
```

### Deploy to Production
```bash
# Follow DEPLOYMENT_GUIDE.md for detailed instructions
# Quick: npm run build (frontend), then deploy both
```

## 📞 Need Help?

- Check [OPEN_SOURCE_README.md](./OPEN_SOURCE_README.md#-troubleshooting)
- Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Open a GitHub issue
- Check security docs: [SECURITY_SUMMARY.md](./SECURITY_SUMMARY.md)

---

**Ready?** Run the setup commands above and visit http://localhost:5173! 🎉
