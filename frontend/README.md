# Frontend Setup Instructions

## Prerequisites
You need to have **Node.js** and **npm** installed on your system.

### Install Node.js
1. Download Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Install the LTS version (recommended)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Installation Steps

### 1. Navigate to the frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

This will install:
- React 18.3.1
- Vite 6.0.11
- TailwindCSS 3.4.17
- Axios 1.7.9
- Recharts 2.15.0
- And all necessary dev dependencies

### 3. Start the development server
```bash
npm run dev
```

The frontend will be available at: **http://localhost:5173**

## Backend Setup

### 1. Navigate to the backend directory
```bash
cd backend
```

### 2. Install Python dependencies
```bash
python -m pip install -r requirements.txt
```

### 3. Start the FastAPI server
```bash
python -m uvicorn main:app --reload --port 8000
```

The backend API will be available at: **http://localhost:8000**

## Running Both Servers

You need to run **both** servers simultaneously:

1. **Terminal 1** (Backend):
   ```bash
   cd backend
   python -m uvicorn main:app --reload --port 8000
   ```

2. **Terminal 2** (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

Then open your browser to **http://localhost:5173**

## Build for Production

To create a production build:

```bash
cd frontend
npm run build
```

The optimized files will be in the `dist/` folder.

## Project Structure

```
Global Cost of Living Tracker/
├── backend/
│   ├── main.py              # FastAPI server
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html           # HTML template
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # TailwindCSS config
└── data/
    └── latest_metrics.csv   # Data file
```

## Troubleshooting

### Port already in use
If port 5173 or 8000 is already in use, you can change them:

**Frontend** (in `vite.config.js`):
```javascript
server: {
  port: 3000, // Change to any available port
}
```

**Backend**:
```bash
python -m uvicorn main:app --reload --port 9000
```

### CORS issues
The backend is configured to accept requests from `http://localhost:5173`. If you change the frontend port, update `backend/main.py`:

```python
allow_origins=["http://localhost:YOUR_PORT"]
```
