# 🌍 Global Cost of Living Tracker

Automated dashboard that compares the **Real Purchasing Power** between different cities worldwide. It goes beyond simple price comparison by calculating how many hours of work are needed to buy a basic basket of goods.

## 🚀 Project Overview

- **Source**: [Numbeo](https://www.numbeo.com) (Scraping).
- **ETL**: Python 3.12 (Requests, BeautifulSoup, Pandas).
- **Storage**: Google Sheets (Cloud Database).
- **Visualization**: Power BI.
- **Automation**: GitHub Actions (Runs weekly).

## 🛠️ Components

The project is structured as a modular Python package:

- `src/scraper.py`: Handles polite fetching and robust parsing of Numbeo data.
- `src/processor.py`: Cleans currency strings and calculates metrics (Purchasing Power Index).
- `src/storage.py`: Manages Google Sheets authentication and data uploading.
- `src/main.py`: Orchestrator that ties the pipeline together.
- `.github/workflows/main.yml`: CI/CD configuration for automated execution.

## ⚙️ Setup & Installation

### 1. Prerequisites
- Python 3.12+
- a Google Cloud Service Account with Google Sheets API enabled.

### 2. Environment Setup
Clone the repository and install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Credentials
You need a `credentials.json` file from your Google Cloud Service Account.
1. Place it in the root directory (for local runs) OR set the `GDRIVE_API_CREDENTIALS` environment variable (JSON string).
2. Create a Google Sheet and share it with the Service Account email.
3. Get the Sheet ID from the URL and set it as `GOOGLE_SHEET_ID`.

### 4. Running Locally
Create a `.env` file:
```ini
GOOGLE_SHEET_ID=your_sheet_id
# Optional if you are using credentials.json file
GDRIVE_API_CREDENTIALS={"type": "service_account", ...} 
```

Run the pipeline:
```bash
python -m src.main
```

## ✅ Testing
Run the unit tests to verify data processing logic:

```bash
pytest -v
```

## 📊 Power BI Connection
1. Open Power BI Desktop.
2. Get Data -> Google Sheets.
3. Paste your Sheet URL.
4. Visualize "Purchasing Power Index" and "Hours to Earn Basket".

---
*Built for Portfolio Demonstration | Analyst + Engineer Profile*
