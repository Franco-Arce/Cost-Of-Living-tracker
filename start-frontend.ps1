# Start Frontend Server
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Magenta
Set-Location -Path "$PSScriptRoot\frontend"

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies first..." -ForegroundColor Yellow
    npm install
}

npm run dev
