# Start Backend Server
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\backend"
python -m uvicorn main:app --reload --port 8000
