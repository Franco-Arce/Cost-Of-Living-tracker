# 🌍 Global Cost of Living Tracker

A modern web application to compare the **Real Purchasing Power** between different cities worldwide. Built with React and static JSON data.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/react-18.3-blue)
![Vite](https://img.shields.io/badge/vite-6.0-purple)

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

- **Node.js 20+** ([Download here](https://nodejs.org/))

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

### Running the Application

**Development Mode:**
```bash
npm run dev
```

Then open your browser at: **http://localhost:5173**

**Production Build:**
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
Global Cost of Living Tracker/
├── public/
│   └── data/
│       └── metrics.json     # Static data file (37 cities)
├── src/
│   ├── components/          # React components
│   │   ├── KPICards.jsx
│   │   ├── Sidebar.jsx
│   │   ├── PurchasingPowerChart.jsx
│   │   ├── CostVsSalaryChart.jsx
│   │   └── HoursToEarnChart.jsx
│   ├── services/
│   │   └── api.js           # API service with Axios
│   ├── i18n/                # Internationalization
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json             # Node dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # TailwindCSS config
└── README.md                # This file
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Chart library
- **Axios** - HTTP client
- **Static JSON** - Data storage

## 📊 Data

The application currently tracks **37 cities** across multiple countries including:
- 🇦🇷 Argentina (Cordoba, Buenos Aires)
- 🇨🇱 Chile (Santiago)
- 🇧🇷 Brazil (Sao Paulo, Rio de Janeiro)
- 🇺🇸 United States (Miami, New York, San Francisco, Los Angeles, Chicago)
- 🇨🇦 Canada (Toronto, Vancouver, Montreal)
- 🇯🇵 Japan (Tokyo, Osaka)
- 🇪🇺 European cities (Madrid, Barcelona, London, Paris, Berlin, Munich, Rome, Milan, Amsterdam, Zurich, Lisbon, Dublin, Vienna)
- 🇲🇽 Mexico (Mexico City, Monterrey)
- 🇺🇾 Uruguay (Montevideo)
- 🇨🇷 Costa Rica (San Jose)
- 🇵🇦 Panama (Panama City)
- 🇨🇴 Colombia (Bogota, Medellin)
- 🇵🇪 Peru (Lima)

Data source: **Numbeo**
Data format: **Static JSON** (`public/data/metrics.json`)

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI effects
- **Gradient Colors**: Vibrant color schemes
- **Smooth Animations**: Hover effects and transitions
- **Dark Mode**: Elegant dark theme
- **Responsive**: Works on all screen sizes

## 📊 Data Structure

The application uses a static JSON file located at `/data/metrics.json`:

```json
[
  {
    "city": "Buenos-Aires",
    "country": "Argentina",
    "purchasing_power_index": 0.7952243270189432,
    "hours_to_earn_basket": 201.2010882511504,
    "basket_cost": 1003.0,
    "salary_avg_net": 797.61,
    "image_url": "https://images.unsplash.com/...",
    // ... additional metrics
  },
  // ... more cities
]
```

## 🔧 Development

### Development Server
```bash
npm run dev
```
App will be available at http://localhost:5173

### Build for Production
```bash
npm run build
```
Optimized files will be in `dist/`

### Preview Production Build
```bash
npm run preview
```

## 🚀 Deployment

This is a static application and can be deployed to any static hosting platform:

- **Vercel**: Connect your repo and deploy automatically
- **Netlify**: Drag and drop the `dist/` folder or connect your repo
- **GitHub Pages**: Use GitHub Actions to deploy
- **Cloudflare Pages**: Connect your repo for automatic deployments

Build command: `npm run build`
Output directory: `dist`

## 🐛 Troubleshooting

See [INSTALL.md](INSTALL.md) for common issues and solutions.

## 📄 License

This project is for educational and personal use.

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

---

Made with ❤️ using FastAPI, React, and TailwindCSS
