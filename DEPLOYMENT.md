# 🚀 Deploy to Vercel - Quick Guide

## Frontend Deployment (Vercel)

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow prompts:**
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`

### Option 2: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `Franco-Arce/Cost-Of-Living-tracker`
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click "Deploy"

### Environment Variables (Frontend)

Add these in Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.com
```

Then update `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
```

---

## Backend Deployment Options

### Option 1: Railway.app (Free Tier)

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo
4. Configure:
   - **Root Directory:** `backend`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables if needed
6. Copy the generated URL

### Option 2: Render.com (Free Tier)

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Configure:
   - **Name:** cost-of-living-api
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Copy the generated URL

### Option 3: Fly.io (Free Tier)

1. Install Fly CLI: [fly.io/docs/hands-on/install-flyctl](https://fly.io/docs/hands-on/install-flyctl/)
2. Navigate to backend:
   ```bash
   cd backend
   ```
3. Launch:
   ```bash
   fly launch
   ```
4. Follow prompts
5. Deploy:
   ```bash
   fly deploy
   ```

---

## Update Frontend with Backend URL

Once backend is deployed, update the frontend:

1. **In Vercel Dashboard:**
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`
   - Redeploy

2. **Or update `vite.config.js`:**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5173,
       proxy: {
         '/api': {
           target: 'https://your-backend-url.com',
           changeOrigin: true,
         }
       }
     }
   })
   ```

---

## Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Deploy backend to Railway/Render/Fly
- [ ] Copy backend URL
- [ ] Deploy frontend to Vercel
- [ ] Add backend URL as environment variable
- [ ] Test the live site
- [ ] Share the URL! 🎉

---

## Troubleshooting

### CORS Issues
Update `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Build Fails
- Check Node.js version (use 18.x or 20.x)
- Verify all dependencies in `package.json`
- Check build logs in Vercel dashboard

### API Not Working
- Verify backend is running
- Check CORS settings
- Verify environment variables
- Check browser console for errors

---

## Expected URLs

After deployment:
- **Frontend:** `https://cost-of-living-tracker.vercel.app`
- **Backend:** `https://cost-of-living-api.railway.app` (or similar)
- **API Endpoint:** `https://cost-of-living-api.railway.app/api/metrics`

---

## Pro Tips

1. **Use Vercel's Preview Deployments** - Every push to a branch creates a preview
2. **Monitor with Vercel Analytics** - Free analytics for your site
3. **Set up Custom Domain** - Add your own domain in Vercel settings
4. **Enable HTTPS** - Automatic with Vercel
5. **Use Environment Variables** - Never commit API keys or secrets

---

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Render Docs: [render.com/docs](https://render.com/docs)
