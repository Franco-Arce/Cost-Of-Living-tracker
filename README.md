# 🌍 Global Cost of Living Tracker

A modern web application to compare the **Real Purchasing Power** between different cities worldwide. Built with FastAPI backend and React frontend.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Python](https://img.shields.io/badge/python-3.14-green)
![React](https://img.shields.io/badge/react-18.3-blue)
![FastAPI](https://img.shields.io/badge/fastapi-0.128-teal)

## ✨ Features

- 💰 **KPI Metrics**: Average Purchasing Power Index, Hours to Earn Basket, Highest PP City
- 📊 **Interactive Charts**: 
  - Purchasing Power Index by City (Bar Chart)
  - Cost of Living vs Salary (Scatter Plot)
  - Hours to Earn Basket (Bar Chart)
- 🔍 **Smart Filtering**: Filter by countries with search functionality
- 🎨 **Premium Design**: Glassmorphism effects, smooth animations, dark mode
- ⚡ **Fast & Modern**: Built with Vite, React 18, and TailwindCSS

## 🚀 Quick Start

### Prerequisites

- **Python 3.14+** (already installed ✅)
- **Node.js 20+** ([Download here](https://nodejs.org/))

### Installation

1. **Install Node.js** (if not installed)
   - See [INSTALL.md](INSTALL.md) for detailed instructions

2. **Install Backend Dependencies**
   ```bash
   cd backend
   python -m pip install -r requirements.txt
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

You need **two terminals** running simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser at: **http://localhost:5173**

## 📁 Project Structure

```
Global Cost of Living Tracker/
├── backend/
│   ├── main.py              # FastAPI server
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── KPICards.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── PurchasingPowerChart.jsx
│   │   │   ├── CostVsSalaryChart.jsx
│   │   │   └── HoursToEarnChart.jsx
│   │   ├── services/
│   │   │   └── api.js       # API service with Axios
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Node dependencies
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # TailwindCSS config
├── data/
│   └── latest_metrics.csv   # Data file (36 cities)
├── INSTALL.md               # Installation guide
└── README.md                # This file
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pandas** - Data manipulation
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Chart library
- **Axios** - HTTP client

## 📊 Data

The application currently tracks **36 cities** across multiple countries including:
- 🇦🇷 Argentina (Cordoba, Buenos Aires)
- 🇨🇱 Chile (Santiago)
- 🇧🇷 Brazil (Sao Paulo, Rio de Janeiro)
- 🇺🇸 United States
- 🇨🇦 Canada
- 🇯🇵 Japan
- 🇪🇺 European cities
- And more...

Data source: **Numbeo** (automatically calculated)

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI effects
- **Gradient Colors**: Vibrant color schemes
- **Smooth Animations**: Hover effects and transitions
- **Dark Mode**: Elegant dark theme
- **Responsive**: Works on all screen sizes

## 📝 API Endpoints

### `GET /`
Health check endpoint
```json
{
  "status": "ok",
  "message": "Global Living Tracker API is running"
}
```

### `GET /api/metrics`
Get all city metrics
```json
[
  {
    "city": "Buenos-Aires",
    "country": "Argentina",
    "purchasing_power_index": 45.23,
    "hours_to_earn_basket": 12.5,
    "basket_cost": 350.00,
    "salary_avg_net": 1200.00
  },
  ...
]
```

## 🔧 Development

### Backend Development
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```
API will be available at http://localhost:8000
API docs at http://localhost:8000/docs

### Frontend Development
```bash
cd frontend
npm run dev
```
App will be available at http://localhost:5173

### Build for Production
```bash
cd frontend
npm run build
```
Optimized files will be in `frontend/dist/`

## 🐛 Troubleshooting

See [INSTALL.md](INSTALL.md) for common issues and solutions.

## 📄 License

This project is for educational and personal use.

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

---

Made with ❤️ using FastAPI, React, and TailwindCSS
