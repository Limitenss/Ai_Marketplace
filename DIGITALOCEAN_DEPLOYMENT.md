# DigitalOcean Deployment Guide

## Backend Deployment to DigitalOcean App Platform

### Step 1: Create a DigitalOcean Account
1. Go to [digitalocean.com](https://digitalocean.com)
2. Sign up or log in
3. Create a new project (optional)

### Step 2: Connect Your GitHub Repository
1. In DigitalOcean, go to **Apps** → **Create App**
2. Select **GitHub** as your repository source
3. Authorize DigitalOcean to access your GitHub account
4. Select the `Ai_Marketplace` repository
5. Choose the `main` branch

### Step 3: Configure the Backend Service
1. DigitalOcean will auto-detect your app.yaml file
2. Review the configuration:
   - **Build Command**: `cd server && npm install`
   - **Run Command**: `cd server && npm start`
   - **HTTP Port**: 8080

### Step 4: Set Environment Variables
1. In the DigitalOcean app editor, go to **Environment**
2. Add your GROQ API key:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your actual GROQ API key (from groq.com console)
   - **Scope**: Select both **Build-time** and **Run-time**

### Step 5: Deploy
1. Click **Create Resources**
2. DigitalOcean will build and deploy your app
3. Wait for the build to complete (usually 2-5 minutes)

### Step 6: Get Your Backend URL
1. Once deployed, you'll see a live app URL like: `https://your-app-12345.ondigitalocean.app`
2. Your API endpoint will be: `https://your-app-12345.ondigitalocean.app/api/analyze`

### Step 7: Update Frontend Configuration
1. Update `.env.production` in the open-source repository:
   ```
   VITE_API_ENDPOINT=https://your-app-12345.ondigitalocean.app/api/analyze
   ```
2. Replace `your-app-12345` with your actual app slug
3. Commit and push to GitHub
4. GitHub Pages will automatically rebuild with the new backend URL

### Step 8: Verify Everything Works
1. Visit your GitHub Pages demo: https://limitenss.github.io/Ai_Marketplace/
2. Try the "Analyze and get recommendations" button
3. It should now call your DigitalOcean backend using your GROQ API key

## Cost Notes
- DigitalOcean App Platform: $5-12/month for basic tiers
- Very affordable for a small project
- Free tier available for testing

## Monitoring & Logs
- View logs in DigitalOcean Dashboard under **Logs**
- Check app health at: `https://your-app-slug.ondigitalocean.app/api/health`

## Redeploy on Changes
- Any push to the `main` branch automatically triggers a redeploy
- No manual deployment needed after initial setup
