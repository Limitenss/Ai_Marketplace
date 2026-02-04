# 🚀 Deployment Guide

This guide covers deploying the AI Marketplace to production.

## 📋 Pre-Deployment Checklist

- [ ] All tests pass
- [ ] Code reviewed and merged
- [ ] Environment variables configured
- [ ] Security audit completed
- [ ] Database/API keys ready
- [ ] SSL certificate obtained
- [ ] Performance optimized

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

**Easiest for React/Vite projects**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd ai-marketplace-opensource
vercel

# Follow prompts:
# - Project name: ai-marketplace
# - Framework: Vite
# - Root directory: ./
# - Build command: npm run build
# - Output directory: dist
```

**Set Environment Variables:**
```bash
vercel env add API_ENDPOINT https://your-backend.com/api
```

**Update vite.config.ts:**
```typescript
const API_ENDPOINT = process.env.VITE_API_ENDPOINT || 'http://localhost:3001/api';
```

**Deploy:**
```bash
vercel --prod
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Build command: npm run build
# Publish directory: dist
```

**Environment Variables:**
- Dashboard → Site settings → Build & deploy → Environment
- Add `VITE_API_ENDPOINT=https://your-backend.com/api`

### Option 3: Self-Hosted (AWS S3 + CloudFront)

```bash
# Build frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 🔧 Backend Deployment

### Option 1: Heroku (Easiest)

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku
# Or: npm install -g heroku

# Login
heroku login

# Create app
heroku create ai-marketplace-api

# Set environment variables
heroku config:set GROQ_API_KEY=your_api_key
heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
heroku config:set PORT=80

# Deploy
cd server
git push heroku main

# View logs
heroku logs --tail
```

**Procfile (already included):**
```
web: node index.js
```

### Option 2: Railway.app

1. Connect GitHub repository
2. Configure environment variables:
   - `GROQ_API_KEY`
   - `CORS_ORIGIN`
   - `PORT=3001`
3. Deploy automatically on push

### Option 3: DigitalOcean App Platform

1. Connect GitHub repo
2. Select `Express.js`
3. Set environment variables
4. Deploy

### Option 4: Self-Hosted (Ubuntu Server)

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/your-repo/ai-marketplace.git
cd ai-marketplace/server

# Install dependencies
npm install --production

# Create .env file
cat > .env << EOF
GROQ_API_KEY=your_api_key
CORS_ORIGIN=https://your-frontend-domain.com
PORT=3001
EOF

# Install PM2 for process management
sudo npm install -g pm2

# Start server
pm2 start index.js --name "ai-marketplace"
pm2 startup
pm2 save

# Setup Nginx reverse proxy
sudo apt-get install nginx

# Edit /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable HTTPS with Let's Encrypt:**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.your-domain.com
```

## 🐳 Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production

# Copy server files
COPY server/ ./server/

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start server
CMD ["node", "server/index.js"]
```

**Build and Run:**
```bash
# Build image
docker build -t ai-marketplace:latest .

# Run container
docker run -d \
  -e GROQ_API_KEY=your_key \
  -e CORS_ORIGIN=https://your-frontend.com \
  -p 3001:3001 \
  --name ai-marketplace \
  ai-marketplace:latest

# View logs
docker logs ai-marketplace
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
      - CORS_ORIGIN=${CORS_ORIGIN}
      - PORT=3001
    restart: unless-stopped
```

```bash
docker-compose up -d
```

## 🔒 SSL/HTTPS Setup

### Let's Encrypt (Free)

```bash
# Ubuntu/Debian with Nginx
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com

# Automatic renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### AWS Certificate Manager

1. Request certificate in ACM console
2. Validate domain
3. Attach to CloudFront/ALB

## 📊 Monitoring & Logging

### Backend Health Monitoring

```bash
# Check health endpoint
curl https://api.your-domain.com/api/health

# Monitor with PM2
pm2 monit

# View logs
pm2 logs
```

### Uptime Monitoring

Use services like:
- UptimeRobot (free tier available)
- Statuspageio
- NewRelic

### Log Aggregation

```javascript
// Add logging to server/index.js
const fs = require('fs');
const accessLog = fs.createWriteStream('access.log', { flags: 'a' });

app.use((req, res, next) => {
  accessLog.write(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode}\n`);
  next();
});
```

## 🚨 Scaling & Performance

### Frontend Optimization
- Enable gzip compression
- Use CDN (CloudFront, Cloudflare)
- Minify and bundle CSS/JS
- Optimize images
- Enable caching

### Backend Optimization
- Connection pooling
- Request caching
- Rate limiting (already implemented)
- Database indexing
- Load balancing with multiple instances

### Load Balancing

**AWS Load Balancer:**
```bash
# Create ALB with multiple backend instances
# Configure health check: /api/health
# Set sticky sessions if needed
```

**Nginx Load Balancing:**
```nginx
upstream api_backend {
    server api-instance-1:3001;
    server api-instance-2:3001;
    server api-instance-3:3001;
}

server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://api_backend;
        proxy_set_header Host $host;
    }
}
```

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "ai-marketplace-api"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
```

## 📈 Post-Deployment

1. **Test all endpoints**
   ```bash
   curl https://api.your-domain.com/api/health
   ```

2. **Monitor performance**
   - Response times
   - Error rates
   - CPU/Memory usage

3. **Collect metrics**
   - Daily active users
   - API calls
   - Recommendations generated

4. **Set up alerts**
   - High error rate (>5%)
   - Slow response times (>2s)
   - Server down
   - Rate limit exceeded

## 🔙 Rollback Procedure

```bash
# Heroku
heroku releases
heroku rollback

# Docker
docker run -d --name ai-marketplace-v1 ai-marketplace:previous-tag

# Git
git revert HEAD
git push
```

## 📚 Resources

- [Heroku Deployment](https://devcenter.heroku.com/articles/git)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)
- [Railway.app](https://docs.railway.app/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**Questions?** Check the main README or open an issue!
