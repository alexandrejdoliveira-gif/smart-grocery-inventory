# 🚀 Git & Deployment Setup Guide

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Git installed ([download here](https://git-scm.com/downloads))
- [ ] GitHub account ([sign up here](https://github.com/signup))
- [ ] Vercel account ([sign up here](https://vercel.com/signup))
- [ ] Node.js 18+ installed ([download here](https://nodejs.org/))

---

## 🔧 Step 1: Initialize Git Repository

Open your terminal in the project directory and run:

```bash
# Navigate to project directory
cd C:\Users\oliveiraa\.gemini\antigravity\scratch\pwa-estoque-supermercado

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create first commit
git commit -m "feat: initial project setup with Next.js 14, TypeScript, and PWA support"
```

---

## 🌐 Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not installed
# Download from: https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository
gh repo create smart-grocery-inventory --public --source=. --remote=origin --push

# Done! Your code is now on GitHub
```

### Option B: Using GitHub Website

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `smart-grocery-inventory`
3. Description: `Intelligent PWA for grocery inventory management with crowdsourced price intelligence`
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have them)
6. Click **Create repository**

Then connect your local repo:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/smart-grocery-inventory.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🚀 Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

### Option B: Using Vercel Dashboard (Recommended for first time)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your GitHub repository: `smart-grocery-inventory`
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
5. Click **Deploy**
6. Wait 2-3 minutes ⏳
7. Your app is live! 🎉

Your app will be available at:
```
https://smart-grocery-inventory.vercel.app
```

---

## 🔄 Step 4: Set Up Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
# ... edit files ...

# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new feature"

# Push to GitHub
git push

# Vercel automatically deploys! 🚀
```

### Deployment Workflow

```
Local Changes → Git Commit → Push to GitHub → Vercel Auto-Deploy
```

- **Main branch** → Production deployment
- **Other branches** → Preview deployments

---

## 📝 Conventional Commit Messages

Use these prefixes for better commit history:

```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style changes (formatting, etc.)
refactor: # Code refactoring
test:     # Adding tests
chore:    # Maintenance tasks
perf:     # Performance improvements
```

### Examples:

```bash
git commit -m "feat: add receipt OCR functionality"
git commit -m "fix: resolve price calculation bug"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor: optimize price prediction algorithm"
```

---

## 🌿 Git Branching Strategy

### For Solo Development (Simple)

```bash
# Work directly on main
git checkout main
# ... make changes ...
git add .
git commit -m "feat: add feature"
git push
```

### For Team Development (Recommended)

```bash
# Create feature branch
git checkout -b feature/receipt-scanning

# Make changes
# ... edit files ...

# Commit changes
git add .
git commit -m "feat: implement receipt OCR"

# Push feature branch
git push -u origin feature/receipt-scanning

# Create Pull Request on GitHub
# After review, merge to main
```

---

## 🔐 Environment Variables (For Later)

When you need API keys (OCR, Database, etc.):

### Local Development

Create `.env.local` file:

```bash
# .env.local (NOT committed to Git)
NEXT_PUBLIC_APP_NAME="Smart Grocery Inventory"
GOOGLE_CLOUD_VISION_API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
```

### Vercel Production

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add variables:
   - `GOOGLE_CLOUD_VISION_API_KEY`
   - `DATABASE_URL`
   - etc.
4. Redeploy

---

## 📊 Monitoring Deployments

### Vercel Dashboard

- **Deployments**: See all deployments and their status
- **Analytics**: View page views, performance metrics
- **Logs**: Debug issues with runtime logs
- **Domains**: Add custom domains

### GitHub Integration

- **Commit Status**: See deployment status on commits
- **Pull Request Previews**: Every PR gets a preview URL
- **Deployment Comments**: Vercel comments on PRs with preview links

---

## 🛠️ Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View changes
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes) ⚠️
git reset --hard HEAD~1

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Pull latest changes
git pull

# View remote repositories
git remote -v

# Tag a release
git tag -a v0.1.0 -m "Initial release"
git push --tags
```

---

## 🚨 Troubleshooting

### Issue: "git: command not found"

**Solution**: Install Git from [git-scm.com](https://git-scm.com/downloads)

### Issue: "Permission denied (publickey)"

**Solution**: Set up SSH keys or use HTTPS

```bash
# Use HTTPS instead
git remote set-url origin https://github.com/YOUR_USERNAME/smart-grocery-inventory.git
```

### Issue: Vercel build fails

**Solution**: Check build logs in Vercel dashboard

Common fixes:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Test build locally
npm run build
```

### Issue: Changes not deploying

**Solution**: 
1. Check Vercel dashboard for deployment status
2. Ensure you pushed to the correct branch
3. Check for build errors in logs

---

## 📈 Next Steps After Deployment

1. ✅ **Custom Domain** (Optional)
   - Go to Vercel → Domains
   - Add your custom domain
   - Update DNS settings

2. ✅ **Analytics**
   - Enable Vercel Analytics
   - Track page views and performance

3. ✅ **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor performance (Vercel Speed Insights)

4. ✅ **CI/CD**
   - Already set up with Vercel!
   - Every push = automatic deployment

---

## 🎯 Quick Reference

### First Time Setup
```bash
cd C:\Users\oliveiraa\.gemini\antigravity\scratch\pwa-estoque-supermercado
git init
git add .
git commit -m "feat: initial project setup"
gh repo create smart-grocery-inventory --public --source=. --remote=origin --push
vercel
```

### Daily Workflow
```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push
# Vercel auto-deploys! ✨
```

---

## 📞 Need Help?

- **Git**: [git-scm.com/doc](https://git-scm.com/doc)
- **GitHub**: [docs.github.com](https://docs.github.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

---

**Ready to deploy? Let's go! 🚀**
