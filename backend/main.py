from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Construct path relative to this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "data", "latest_metrics.csv")

@app.get("/api/metrics")
def get_metrics():
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=404, detail="Data file not found. Run the ETL pipeline first.")
    
    try:
        df = pd.read_csv(DATA_PATH)
        # Handle NaN values for JSON serialization
        df = df.where(pd.notnull(df), None)
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Global Living Tracker API is running"}
