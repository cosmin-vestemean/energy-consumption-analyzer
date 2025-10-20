# Heroku Deployment Guide

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Heroku account (free tier available at https://heroku.com)
3. ✅ This repository pushed to GitHub

## 🚀 Deployment Steps

### Option 1: Deploy via Heroku Dashboard (Recommended - Easiest)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Heroku deployment"
   git push origin main
   ```

2. **Go to Heroku Dashboard:**
   - Visit: https://dashboard.heroku.com/
   - Click "New" → "Create new app"

3. **Create your app:**
   - App name: `your-app-name` (must be unique)
   - Region: Choose closest to your users
   - Click "Create app"

4. **Connect to GitHub:**
   - Go to "Deploy" tab
   - Deployment method: Select "GitHub"
   - Click "Connect to GitHub"
   - Authorize Heroku to access your GitHub
   - Search for repository: `codespaces-react-1`
   - Click "Connect"

5. **Configure deployment:**
   - Scroll to "Manual deploy" or "Automatic deploys"
   - Select branch: `main`
   - Click "Deploy Branch"

6. **Wait for deployment:**
   - Heroku will:
     - Install Node.js
     - Run `npm install`
     - Run `npm run build`
     - Start the server with `serve`
   - This takes 2-5 minutes

7. **Open your app:**
   - Click "View" or "Open app"
   - Your app is now live at: `https://your-app-name.herokuapp.com`

### Option 2: Deploy via Heroku CLI

1. **Login to Heroku:**
   ```bash
   heroku login -i
   ```

2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Add Heroku remote:**
   ```bash
   heroku git:remote -a your-app-name
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **Open your app:**
   ```bash
   heroku open
   ```

## 📁 Files Created for Heroku

### `Procfile`
Tells Heroku how to start your app:
```
web: npm run build && npx serve -s dist -l $PORT
```

### `app.json`
Specifies Node.js buildpack:
```json
{
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    }
  ]
}
```

## ⚙️ How It Works

1. **Build Phase:**
   - Heroku runs `npm install`
   - Heroku runs `npm run build` (creates `dist/` folder)
   - All React code is compiled to static HTML/CSS/JS

2. **Run Phase:**
   - `serve` package serves the `dist/` folder
   - Listens on port provided by Heroku ($PORT)
   - Your app is accessible via HTTPS

## 🔧 Configuration

### Environment Variables (if needed)

If your app needs environment variables:

1. **Via Dashboard:**
   - Go to app → Settings → Config Vars
   - Add your variables

2. **Via CLI:**
   ```bash
   heroku config:set VAR_NAME=value
   ```

### Custom Domain (Optional)

To use your own domain:

1. **Via Dashboard:**
   - Settings → Domains → Add domain

2. **Via CLI:**
   ```bash
   heroku domains:add www.yourdomain.com
   ```

## 📊 Monitoring

### View Logs
```bash
heroku logs --tail
```

### View App Info
```bash
heroku apps:info
```

### Restart App
```bash
heroku restart
```

## 🔄 Automatic Deployments

To enable automatic deployment on every GitHub push:

1. Go to Heroku Dashboard → Deploy tab
2. Under "Automatic deploys"
3. Select branch: `main`
4. Click "Enable Automatic Deploys"

Now every push to `main` branch automatically deploys!

## 💰 Cost

**Free Tier includes:**
- ✅ 550-1000 dyno hours per month
- ✅ Enough for 24/7 operation
- ✅ Custom domain support
- ✅ HTTPS included
- ⚠️ App sleeps after 30 min of inactivity
- ⚠️ Cold start takes 5-10 seconds

**To prevent sleeping (upgrade to Hobby tier):**
- $7/month
- No sleep
- Custom SSL certificates

## 🚨 Troubleshooting

### Build Fails

**Check logs:**
```bash
heroku logs --tail
```

**Common issues:**
- Node version mismatch → Add `"engines"` to package.json
- Missing dependencies → Check package.json
- Build errors → Test locally with `npm run build`

### App Crashes

**Check logs:**
```bash
heroku logs --tail
```

**Restart app:**
```bash
heroku restart
```

## 📱 Testing Locally Before Deploy

Test the production build locally:

```bash
# Build the app
npm run build

# Serve it locally
npx serve -s dist -l 3000

# Visit http://localhost:3000
```

## ✅ Verification Checklist

Before deploying, ensure:

- [ ] All files committed to git
- [ ] Code pushed to GitHub
- [ ] `Procfile` exists
- [ ] `app.json` exists
- [ ] `serve` in dependencies (package.json)
- [ ] Build works locally (`npm run build`)
- [ ] Documentation files included
- [ ] No sensitive data in code

## 🎯 Your App URLs

After deployment:

**Application:**
- `https://your-app-name.herokuapp.com/`

**Documentation:**
- `https://your-app-name.herokuapp.com/docs/`
- `https://your-app-name.herokuapp.com/docs/client-summary.html`
- `https://your-app-name.herokuapp.com/docs/quick-reference.html`
- `https://your-app-name.herokuapp.com/docs/technical-formulas.html`
- `https://your-app-name.herokuapp.com/docs/data-processing.html`

## 📞 Support

- Heroku Docs: https://devcenter.heroku.com/
- Heroku Status: https://status.heroku.com/
- Community: https://help.heroku.com/

---

## 🎉 Quick Summary

**Easiest Method:**
1. Push code to GitHub ✅
2. Create Heroku app via dashboard
3. Connect to GitHub repository
4. Click "Deploy Branch"
5. Done! App is live 🚀

Your Electric Consumption Analyzer will be accessible 24/7 (with free tier sleeping after 30 min inactivity).

---

**Created:** October 20, 2025  
**Repository:** cosmin-vestemean/codespaces-react-1
