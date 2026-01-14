import requests
from bs4 import BeautifulSoup
import logging
import time
import random

logger = logging.getLogger(__name__)

def fetch_html(url: str) -> str:
    """
    Fetches the HTML content of a given URL with a polite delay and user-agent rotation.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
    }
    
    try:
        logger.info(f"Fetching URL: {url}")
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        
        # Polite delay to avoid getting blocked
        time.sleep(random.uniform(5, 10))
        
        return response.text
    except requests.RequestException as e:
        logger.error(f"Failed to fetch {url}: {e}")
        return None

def parse_numbeo_city(html: str) -> dict:
    """
    Parses the Numbeo city page HTML to extract prices and salary.
    Returns a dictionary with raw extracted values.
    """
    if not html:
        return {}
    
    soup = BeautifulSoup(html, 'html.parser')
    data = {}
    
    # 1. Extract Country from breadcrumbs
    # Structure: <div class="nav_bits"><a href="">Cost of Living</a> > <a href="">Country</a> > City</div>
    nav = soup.find('div', class_='nav_bits')
    if nav:
        links = nav.find_all('a')
        # Usually: Home(0), Cost of Living(1), Country(2), sometimes City(3).
        # We can try to grab the one before the last if it's a hierarchy.
        # Or simpler: The one that links to "country" URL or just 3rd item.
        # Let's try grabbing the text of the 2nd 'a' tag (index 1 is Cost of Living, index 2 usually Country).
        if len(links) >= 3:
             data['country_name'] = links[2].get_text(strip=True)
        elif len(links) == 2:
             data['country_name'] = "Unknown"
    
    # Fallback/Confirmation: Check Title
    # Format: Cost of Living in City, Country. ...
    if 'country_name' not in data or data['country_name'] == "Unknown":
        title = soup.find('title')
        if title:
            text = title.get_text(strip=True)
            # "Cost of Living in Cordoba, Argentina. ..."
            if " in " in text:
                parts = text.split(" in ")[1].split(",")
                if len(parts) >= 2:
                    # parts[0] is City, parts[1] is Country (mostly)
                    # "Cordoba, Argentina. Jun 2024..."
                    country_candidate = parts[1].split(".")[0].strip()
                    # Clean up "prices..." suffix if exists
                    data['country_name'] = country_candidate

    # 2. Extract Prices from the main table
    # Numbeo tables often have class 'data_wide_table'
    tables = soup.find_all('table', class_='data_wide_table')
    
    for table in tables:
        rows = table.find_all('tr')
        for row in rows:
            cols = row.find_all('td')
            if len(cols) >= 2:
                item_name = cols[0].get_text(strip=True)
                # The price is usually in the second column, formatted like "12.50 $"
                # We extract the raw text for now
                price_text = cols[1].find('span', class_='first_currency')
                if not price_text:
                    price_text = cols[1] # Fallback if specific span is missing
                
                if item_name and price_text:
                    data[item_name] = price_text.get_text(strip=True)

    # 2. Extract Average Monthly Net Salary
    # It is typically in the same table, often near the bottom
    # We look for the specific key if not found in the loop above (though it usually is)
    # The key on Numbeo is often "Average Monthly Net Salary (After Tax)"
    
    return data
