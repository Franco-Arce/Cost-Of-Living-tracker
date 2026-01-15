from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for Vercel deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Construct path relative to this file (Serverless environment safe)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "latest_metrics.csv")

@app.get("/api/metrics")
def get_metrics():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail=f"Data file not found at {DATA_PATH}")
    
    try:
        df = pd.read_csv(DATA_PATH)
        # Handle NaN values for JSON serialization
        df = df.where(pd.notnull(df), None)
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
def read_root():
    return {"status": "ok", "message": "Global Living Tracker API is running on Vercel"}
