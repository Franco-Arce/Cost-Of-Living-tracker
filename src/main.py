import logging
import os
import pandas as pd
from dotenv import load_dotenv

from src.scraper import fetch_html, parse_numbeo_city
from src.processor import normalize_data, calculate_metrics
from src.storage import GoogleSheetClient

# Load env vars
load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# List of cities to track
CITIES = [
    # LatAm
    ("https://www.numbeo.com/cost-of-living/in/Cordoba?displayCurrency=USD", "Argentina"),
    ("https://www.numbeo.com/cost-of-living/in/Buenos-Aires?displayCurrency=USD", "Argentina"),
    ("https://www.numbeo.com/cost-of-living/in/Santiago?displayCurrency=USD", "Chile"),
    ("https://www.numbeo.com/cost-of-living/in/Sao-Paulo?displayCurrency=USD", "Brazil"),
    ("https://www.numbeo.com/cost-of-living/in/Rio-De-Janeiro?displayCurrency=USD", "Brazil"),
    ("https://www.numbeo.com/cost-of-living/in/Bogota?displayCurrency=USD", "Colombia"),
    ("https://www.numbeo.com/cost-of-living/in/Medellin?displayCurrency=USD", "Colombia"),
    ("https://www.numbeo.com/cost-of-living/in/Lima?displayCurrency=USD", "Peru"),
    ("https://www.numbeo.com/cost-of-living/in/Mexico-City?displayCurrency=USD", "Mexico"),
    ("https://www.numbeo.com/cost-of-living/in/Monterrey?displayCurrency=USD", "Mexico"),
    ("https://www.numbeo.com/cost-of-living/in/Montevideo?displayCurrency=USD", "Uruguay"),
    ("https://www.numbeo.com/cost-of-living/in/San-Jose-Costa-Rica?displayCurrency=USD", "Costa Rica"),
    ("https://www.numbeo.com/cost-of-living/in/Panama-City?displayCurrency=USD", "Panama"),
    
    # North America
    ("https://www.numbeo.com/cost-of-living/in/Miami?displayCurrency=USD", "United States"),
    ("https://www.numbeo.com/cost-of-living/in/New-York?displayCurrency=USD", "United States"),
    ("https://www.numbeo.com/cost-of-living/in/San-Francisco?displayCurrency=USD", "United States"),
    ("https://www.numbeo.com/cost-of-living/in/Los-Angeles?displayCurrency=USD", "United States"),
    ("https://www.numbeo.com/cost-of-living/in/Chicago?displayCurrency=USD", "United States"),
    ("https://www.numbeo.com/cost-of-living/in/Toronto?displayCurrency=USD", "Canada"),
    ("https://www.numbeo.com/cost-of-living/in/Vancouver?displayCurrency=USD", "Canada"),
    ("https://www.numbeo.com/cost-of-living/in/Montreal?displayCurrency=USD", "Canada"),
    
    # Europe
    ("https://www.numbeo.com/cost-of-living/in/Madrid?displayCurrency=USD", "Spain"),
    ("https://www.numbeo.com/cost-of-living/in/Barcelona?displayCurrency=USD", "Spain"),
    ("https://www.numbeo.com/cost-of-living/in/London?displayCurrency=USD", "United Kingdom"),
    ("https://www.numbeo.com/cost-of-living/in/Paris?displayCurrency=USD", "France"),
    ("https://www.numbeo.com/cost-of-living/in/Berlin?displayCurrency=USD", "Germany"),
    ("https://www.numbeo.com/cost-of-living/in/Munich?displayCurrency=USD", "Germany"),
    ("https://www.numbeo.com/cost-of-living/in/Rome?displayCurrency=USD", "Italy"),
    ("https://www.numbeo.com/cost-of-living/in/Milan?displayCurrency=USD", "Italy"),
    ("https://www.numbeo.com/cost-of-living/in/Amsterdam?displayCurrency=USD", "Netherlands"),
    ("https://www.numbeo.com/cost-of-living/in/Zurich?displayCurrency=USD", "Switzerland"),
    ("https://www.numbeo.com/cost-of-living/in/Lisbon?displayCurrency=USD", "Portugal"),
    ("https://www.numbeo.com/cost-of-living/in/Dublin?displayCurrency=USD", "Ireland"),
    ("https://www.numbeo.com/cost-of-living/in/Vienna?displayCurrency=USD", "Austria"),
    
    # Asia (Japan & others)
    ("https://www.numbeo.com/cost-of-living/in/Tokyo?displayCurrency=USD", "Japan"),
    ("https://www.numbeo.com/cost-of-living/in/Osaka?displayCurrency=USD", "Japan"),
    ("https://www.numbeo.com/cost-of-living/in/Kyoto?displayCurrency=USD", "Japan"),
    ("https://www.numbeo.com/cost-of-living/in/Seoul?displayCurrency=USD", "South Korea"),
    ("https://www.numbeo.com/cost-of-living/in/Singapore?displayCurrency=USD", "Singapore")
]

def main():
    logger.info("Starting Global Cost of Living Tracker ETL...")
    
    all_data = []
    
    for url, country in CITIES:
        # Extract city name from URL for logging/tracking
        try:
            city_name = url.split('/in/')[1].split('?')[0]
        except IndexError:
            city_name = "Unknown"
            
        logger.info(f"Processing {city_name} ({country})...")
        
        html = fetch_html(url)
        if html:
            raw_data = parse_numbeo_city(html)
            if raw_data:
                cleaned_data = normalize_data(raw_data)
                cleaned_data['city'] = city_name
                cleaned_data['country'] = country
                all_data.append(cleaned_data)
            else:
                logger.warning(f"No cost data found for {city_name}")
        else:
             logger.warning(f"Failed to fetch HTML for {city_name}")

    if not all_data:
        logger.error("No data collected from any city. Exiting.")
        return

    # Transformation
    df = pd.DataFrame(all_data)
    
    # Calculate derived metrics
    df = calculate_metrics(df)
    
    logger.info(f"Data processed. Metrics calculated. Total rows: {len(df)}")
    
    # Optional: Save to local CSV for debugging/backup
    os.makedirs("data", exist_ok=True)
    df.to_csv("data/latest_metrics.csv", index=False)
    logger.info("Saved local backup to data/latest_metrics.csv")

    # Load to Google Sheets
    sheet_id = os.environ.get("GOOGLE_SHEET_ID")
    if sheet_id:
        logger.info(f"Uploading to Google Sheet ID: {sheet_id}")
        storage = GoogleSheetClient()
        storage.update_sheet(sheet_id, df)
    else:
        logger.warning("GOOGLE_SHEET_ID environment variable not set. Skipping upload.")

if __name__ == "__main__":
    main()
