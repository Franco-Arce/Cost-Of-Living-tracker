"""
Script to fetch and update cost of living data from Numbeo API
This script retrieves current data for major cities worldwide and updates the CSV file
"""

import requests
import pandas as pd
import os
from datetime import datetime

# Numbeo API configuration
# Note: You need to get an API key from https://www.numbeo.com/api/doc.jsp
NUMBEO_API_KEY = os.getenv('NUMBEO_API_KEY', 'YOUR_API_KEY_HERE')
NUMBEO_BASE_URL = 'https://www.numbeo.com:8008/api'

# Cities to track (city, country)
CITIES = [
    # Latin America
    ('Cordoba', 'Argentina'),
    ('Buenos Aires', 'Argentina'),
    ('Santiago', 'Chile'),
    ('Sao Paulo', 'Brazil'),
    ('Rio de Janeiro', 'Brazil'),
    ('Bogota', 'Colombia'),
    ('Medellin', 'Colombia'),
    ('Lima', 'Peru'),
    ('Mexico City', 'Mexico'),
    ('Monterrey', 'Mexico'),
    ('Montevideo', 'Uruguay'),
    ('San Jose', 'Costa Rica'),
    ('Panama City', 'Panama'),
    
    # North America
    ('Miami', 'United States'),
    ('New York', 'United States'),
    ('San Francisco', 'United States'),
    ('Los Angeles', 'United States'),
    ('Chicago', 'United States'),
    ('Toronto', 'Canada'),
    ('Vancouver', 'Canada'),
    ('Montreal', 'Canada'),
    
    # Europe
    ('Madrid', 'Spain'),
    ('Barcelona', 'Spain'),
    ('London', 'United Kingdom'),
    ('Paris', 'France'),
    ('Berlin', 'Germany'),
    ('Munich', 'Germany'),
    ('Rome', 'Italy'),
    ('Milan', 'Italy'),
    ('Amsterdam', 'Netherlands'),
    ('Zurich', 'Switzerland'),
    ('Lisbon', 'Portugal'),
    ('Dublin', 'Ireland'),
    ('Vienna', 'Austria'),
    
    # Asia
    ('Tokyo', 'Japan'),
    ('Osaka', 'Japan'),
]

def fetch_city_data(city, country):
    """
    Fetch cost of living data for a specific city from Numbeo API
    """
    try:
        # Prices endpoint
        prices_url = f"{NUMBEO_BASE_URL}/city_prices"
        params = {
            'api_key': NUMBEO_API_KEY,
            'query': f"{city}, {country}"
        }
        
        response = requests.get(prices_url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return data
    except Exception as e:
        print(f"Error fetching data for {city}, {country}: {e}")
        return None

def calculate_metrics(city_data):
    """
    Calculate purchasing power index and other metrics from raw data
    """
    # This is a simplified calculation
    # You would need to implement the actual formulas based on Numbeo's methodology
    
    # Extract key prices
    prices = city_data.get('prices', [])
    
    # Calculate basket cost (sum of essential items)
    basket_cost = sum([p.get('average_price', 0) for p in prices if p.get('item_id') in [1, 2, 3, 4, 5]])
    
    # Get average salary
    salary = city_data.get('average_monthly_net_salary', {}).get('average_price', 0)
    
    # Calculate purchasing power index
    if basket_cost > 0 and salary > 0:
        ppi = (salary / basket_cost) * 100 / 1000  # Normalized
    else:
        ppi = 0
    
    # Calculate hours to earn basket
    if salary > 0:
        hourly_wage = salary / 160  # Assuming 160 hours/month
        hours_to_earn = basket_cost / hourly_wage if hourly_wage > 0 else 0
    else:
        hours_to_earn = 0
    
    return {
        'basket_cost': basket_cost,
        'salary_avg_net': salary,
        'purchasing_power_index': ppi,
        'hours_to_earn_basket': hours_to_earn
    }

def update_data():
    """
    Main function to update all city data
    """
    print("Starting data update from Numbeo...")
    print(f"Timestamp: {datetime.now()}")
    
    if NUMBEO_API_KEY == 'YOUR_API_KEY_HERE':
        print("\n⚠️  WARNING: Please set your Numbeo API key!")
        print("Get one from: https://www.numbeo.com/api/doc.jsp")
        print("Set it as environment variable: NUMBEO_API_KEY")
        return
    
    all_data = []
    
    for city, country in CITIES:
        print(f"Fetching data for {city}, {country}...")
        city_data = fetch_city_data(city, country)
        
        if city_data:
            metrics = calculate_metrics(city_data)
            metrics['city'] = city.replace(' ', '-')
            metrics['country'] = country
            all_data.append(metrics)
        else:
            print(f"  ⚠️  Failed to fetch data for {city}")
    
    if all_data:
        # Create DataFrame
        df = pd.DataFrame(all_data)
        
        # Save to CSV
        output_path = os.path.join('api', 'data', 'latest_metrics.csv')
        df.to_csv(output_path, index=False)
        
        print(f"\n✅ Data updated successfully!")
        print(f"   Total cities: {len(all_data)}")
        print(f"   Saved to: {output_path}")
    else:
        print("\n❌ No data was fetched. Please check your API key and internet connection.")

if __name__ == '__main__':
    update_data()
