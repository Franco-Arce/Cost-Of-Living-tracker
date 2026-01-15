# 🌍 Global Cost of Living Tracker - Vercel Deployment

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Franco-Arce/Cost-Of-Living-tracker)

---

## 📋 Deployment Steps

### 1. Import to Vercel

1. Go to [vercel.com](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository: `Franco-Arce/Cost-Of-Living-tracker`

### 2. Configure Project

**Framework Preset:** Vite

**Root Directory:** `frontend`

**Build Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3. Environment Variables (Optional)

If you deploy the backend separately, add:

```
VITE_API_URL=https://your-backend-url.com
```

### 4. Deploy!

Click "Deploy" and wait ~2 minutes.

---

## 🔗 Your Live URLs

After deployment:
- **Frontend:** `https://your-project.vercel.app`
- **API (if using proxy):** `https://your-project.vercel.app/api/metrics`

---

## ⚙️ Backend Options

### Option A: Mock Data (No Backend Needed)

The app can work with the static CSV data in `data/latest_metrics.csv`.

### Option B: Deploy Backend Separately

**Recommended Services:**
1. **Railway.app** (Free tier, easy Python deployment)
2. **Render.com** (Free tier, auto-deploy from GitHub)
3. **Fly.io** (Free tier, global edge network)

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed backend deployment instructions.

---

## 🎨 Features Included

✨ **Modern Design**
- Violet/Fuchsia/Pink color scheme
- Glassmorphism effects
- 3D card animations
- Floating particles background

🏳️ **Country Flags**
- Emoji flags in sidebar
- Flags in chart tooltips
- Color-coded by country

📊 **Interactive Charts**
- Purchasing Power Index (Bar Chart)
- Cost vs Salary (Scatter Plot)
- Hours to Earn Basket (Color-coded Bar Chart)

🔍 **Smart Filtering**
- Search countries
- Multi-select with checkboxes
- Real-time chart updates

---

## 🚀 Performance

- **Build Time:** ~30 seconds
- **Bundle Size:** ~500KB (gzipped)
- **Lighthouse Score:** 95+ (Performance)
- **First Load:** <2 seconds

---

## 🔧 Troubleshooting

### Build Fails

**Error:** "Module not found"
- **Solution:** Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error:** "Build exceeded time limit"
- **Solution:** Vercel free tier has 45s limit. This project builds in ~30s.

### CORS Issues

If backend is on different domain:

1. Update `backend/main.py`:
```python
allow_origins=["https://your-vercel-app.vercel.app"]
```

2. Or use Vercel's proxy in `vite.config.js`

### Charts Not Showing

- Check browser console for errors
- Verify data is loading from `/api/metrics`
- Check network tab for failed requests

---

## 📱 Mobile Responsive

The app is fully responsive and works on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1920px+)

---

## 🎯 Custom Domain

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. SSL certificate is automatic!

---

## 📊 Analytics

Enable Vercel Analytics (Free):
1. Go to Project Settings → Analytics
2. Click "Enable"
3. View real-time visitor data

---

## 🔄 Automatic Deployments

Every push to `main` branch automatically deploys to production.

**Preview Deployments:**
- Every PR gets a unique preview URL
- Test changes before merging
- Share with team for review

---

## 💡 Pro Tips

1. **Use Preview Deployments** - Test before going live
2. **Enable Analytics** - Track your visitors
3. **Add Custom Domain** - Professional look
4. **Monitor Performance** - Use Vercel's built-in tools
5. **Set up Notifications** - Get alerts on deployment status

---

## 📞 Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)
- **Issues:** [GitHub Issues](https://github.com/Franco-Arce/Cost-Of-Living-tracker/issues)

---

## 🎉 You're Ready!

Your app is now live and accessible worldwide. Share your URL and impress recruiters! 🚀

**Example URL:** `https://global-living-cost-tracker.vercel.app`
