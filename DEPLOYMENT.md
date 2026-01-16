# 🚀 Deployment Guide

The Global Cost of Living Tracker is now a **static application**. This means it can be deployed on virtually any hosting platform efficiently and for free.

## Build Command

For any platform, the build settings are:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## Hosting Options

### 1. Vercel (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** > **Project**
3. Import your Git repository
4. Vercel will automatically detect Vite/React settings
5. Click **Deploy**

### 2. Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **Add new site** > **Import an existing project**
3. Select your provider (GitHub/GitLab/Bitbucket)
4. Select the repository
5. **Build command:** `npm run build`
6. **Publish directory:** `dist`
7. Click **Deploy site**

### 3. GitHub Pages

You can deploy using GitHub Actions. Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install and Build
        run: |
          npm ci
          npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
```

## Manual Deployment

You can also build locally and upload the files manually:

1. Run `npm run build`
2. The `dist/` folder contains your production-ready site
3. Upload the contents of `dist/` to any web server or FTP host
