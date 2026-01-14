import pandas as pd
import os
from src.storage import GoogleSheetClient
from dotenv import load_dotenv
import logging

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mapping countries/cities to high-quality image URLs (Unsplash/Wikimedia)
# Using generic high-res images for demo purposes.
IMAGE_MAP = {
    "Argentina": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=800&auto=format&fit=crop",
    "Chile": "https://images.unsplash.com/photo-1533658608620-3b95a8f60f69?q=80&w=800&auto=format&fit=crop",
    "Brazil": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop",
    "Colombia": "https://images.unsplash.com/photo-1596395347206-897db6e7eb5c?q=80&w=800&auto=format&fit=crop",
    "Peru": "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800&auto=format&fit=crop",
    "Mexico": "https://images.unsplash.com/photo-1518638151313-982d2ee50809?q=80&w=800&auto=format&fit=crop",
    "Uruguay": "https://images.unsplash.com/photo-1620864380104-54c7d23e595e?q=80&w=800&auto=format&fit=crop",
    "Costa Rica": "https://images.unsplash.com/photo-1518182170546-0766be1332cc?q=80&w=800&auto=format&fit=crop",
    "Panama": "https://images.unsplash.com/photo-1558223637-29363d596497?q=80&w=800&auto=format&fit=crop",
    "United States": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop",
    "Canada": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop",
    "Spain": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=800&auto=format&fit=crop",
    "United Kingdom": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
    "France": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    "Germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
    "Italy": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
    "Netherlands": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=800&auto=format&fit=crop",
    "Switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
    "Portugal": "https://images.unsplash.com/photo-1555881400-74d7acaacd81?q=80&w=800&auto=format&fit=crop",
    "Ireland": "https://images.unsplash.com/photo-1590089415225-401eb6b9b912?q=80&w=800&auto=format&fit=crop",
    "Austria": "https://images.unsplash.com/photo-1516550893923-42d28e560348?q=80&w=800&auto=format&fit=crop",
    "Japan": "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=800&auto=format&fit=crop",
    "South Korea": "https://images.unsplash.com/photo-1517154421773-052f83c42226?q=80&w=800&auto=format&fit=crop",
    "Singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop"
}

def main():
    csv_path = "data/latest_metrics.csv"
    if not os.path.exists(csv_path):
        logger.error(f"CSV not found at {csv_path}")
        return

    logger.info(f"Loading data from {csv_path}...")
    df = pd.read_csv(csv_path)
    
    # Add image_url
    def get_image(row):
        country = row.get('country')
        # fallback to a generic travel image if not found
        return IMAGE_MAP.get(country, "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop")
        
    df['image_url'] = df.apply(get_image, axis=1)
    
    logger.info("Enriched data with Images.")
    logger.info(df[['city', 'country', 'image_url']].head())
    
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
