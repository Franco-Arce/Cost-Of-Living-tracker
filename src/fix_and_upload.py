import pandas as pd
import logging
import os
from dotenv import load_dotenv
from src.storage import GoogleSheetClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load env
load_dotenv()

# Hardcoded mapping (URL -> Country is not needed, just City -> Country)
# Or I can just map City Name -> Country since city names are unique enough here.
CITY_TO_COUNTRY = {
    "Cordoba": "Argentina",
    "Buenos-Aires": "Argentina",
    "Santiago": "Chile",
    "Sao-Paulo": "Brazil",
    "Rio-De-Janeiro": "Brazil",
    "Bogota": "Colombia",
    "Medellin": "Colombia",
    "Lima": "Peru",
    "Mexico-City": "Mexico",
    "Monterrey": "Mexico",
    "Montevideo": "Uruguay",
    "San-Jose-Costa-Rica": "Costa Rica",
    "Panama-City": "Panama",
    "Miami": "United States",
    "New-York": "United States",
    "San-Francisco": "United States",
    "Los-Angeles": "United States",
    "Chicago": "United States",
    "Toronto": "Canada",
    "Vancouver": "Canada",
    "Montreal": "Canada",
    "Madrid": "Spain",
    "Barcelona": "Spain",
    "London": "United Kingdom",
    "Paris": "France",
    "Berlin": "Germany",
    "Munich": "Germany",
    "Rome": "Italy",
    "Milan": "Italy",
    "Amsterdam": "Netherlands",
    "Zurich": "Switzerland",
    "Lisbon": "Portugal",
    "Dublin": "Ireland",
    "Vienna": "Austria",
    "Tokyo": "Japan",
    "Osaka": "Japan",
    "Kyoto": "Japan",
    "Seoul": "South Korea",
    "Singapore": "Singapore"
}

def main():
    csv_path = "data/latest_metrics.csv"
    if not os.path.exists(csv_path):
        logger.error(f"CSV not found at {csv_path}")
        return

    logger.info(f"Loading data from {csv_path}...")
    df = pd.read_csv(csv_path)
    
    # Fix Country
    def get_country(row):
        city = row.get('city')
        return CITY_TO_COUNTRY.get(city, "Unknown")
        
    df['country'] = df.apply(get_country, axis=1)
    
    logger.info("Enriched data with Country.")
    logger.info(df[['city', 'country']].head())
    
    # Save back
    df.to_csv(csv_path, index=False)
    
    # Upload
    sheet_id = os.environ.get("GOOGLE_SHEET_ID")
    if sheet_id:
        logger.info(f"Uploading to Sheet {sheet_id}...")
        storage = GoogleSheetClient()
        storage.update_sheet(sheet_id, df)
    else:
        logger.error("GOOGLE_SHEET_ID not set.")

if __name__ == "__main__":
    main()
