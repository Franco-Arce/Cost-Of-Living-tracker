import re
import pandas as pd
import logging

logger = logging.getLogger(__name__)

def clean_currency(value_str: str) -> float:
    """
    Cleans a currency string (e.g., '1,200.50 $') and converts it to a float.
    Returns None if conversion fails.
    """
    if not value_str or not isinstance(value_str, str):
        return None
    
    # Remove everything except digits and decimal point
    # Check for range (e.g., "100-200") - taking the average? 
    # Numbeo main table usually shows the average. 
    # If a range is present or other text, we try to extract the first valid number group.
    
    # Common format: "12.50 $" or "$12.50" or "1,200.00"
    # Remove commas
    clean_str = value_str.replace(',', '')
    
    # Extract first float-like pattern
    match = re.search(r'(\d+\.\d+|\d+)', clean_str)
    if match:
        try:
            return float(match.group(1))
        except ValueError:
            return None
    return None

def normalize_data(raw_data: dict) -> dict:
    """
    Cleans all values in the extracted data dictionary.
    Maps specific Numbeo item names to standardized keys.
    """
    normalized = {}
    
    # Mapping Numbeo text to our internal keys
    key_mapping = {
        "Meal at an Inexpensive Restaurant": "meal_inexpensive",
        "Meal for Two at a Mid-Range Restaurant (Three Courses, Without Drinks)": "meal_mid_range_2ppl",
        "Combo Meal at McDonald's (or Equivalent Fast-Food Meal)": "mcmeal",
        "Cappuccino (Regular Size)": "cappuccino",
        "Soft Drink (Coca-Cola or Pepsi, 0.33 Liter Bottle)": "coke_330ml",
        "Milk (Regular, 1 Liter)": "milk_1l",
        "Fresh White Bread (500 g Loaf)": "bread_500g",
        "White Rice (1 kg)": "rice_1kg",
        "Eggs (12, Large Size)": "eggs_12",
        "Local Cheese (1 kg)": "cheese_1kg",
        "Chicken Fillets (1 kg)": "chicken_1kg",
        "Beef Round or Equivalent Back Leg Red Meat (1 kg)": "beef_1kg",
        "Apples (1 kg)": "apples_1kg",
        "Bananas (1 kg)": "banana_1kg",
        "Oranges (1 kg)": "oranges_1kg",
        "Tomatoes (1 kg)": "tomato_1kg",
        "Potatoes (1 kg)": "potato_1kg",
        "Onions (1 kg)": "onion_1kg",
        "Lettuce (1 Head)": "lettuce_head",
        "Bottled Water (1.5 Liter)": "water_1.5l",
        "Bottle of Wine (Mid-Range)": "wine_mid_range",
        "Domestic Beer (0.5 Liter Bottle)": "beer_domestic_0.5l",
        "Imported Beer (0.33 Liter Bottle)": "beer_imported_0.33l",
        "Cigarettes (Pack of 20, Marlboro)": "cigarettes_pack",
        "One-Way Ticket (Local Transport)": "transport_ticket",
        "Monthly Public Transport Pass (Regular Price)": "transport_pass",
        "Taxi Start (Standard Tariff)": "taxi_start",
        "Taxi 1 km (Standard Tariff)": "taxi_1km",
        "Gasoline (1 Liter)": "gasoline_1l",
        "Basic Utilities for 85 m2Apartment (Electricity, Heating, Cooling, Water, Garbage)": "utilities_basic",
        "Broadband Internet (Unlimited Data, 60 Mbps or Higher)": "internet",
        "Monthly Fitness Club Membership": "gym_monthly",
        "Tennis Court Rental (1 Hour, Weekend)": "tennis_hour",
        "Cinema Ticket (International Release)": "cinema",
        "1 Bedroom Apartment in City Centre": "apt_1bed_center",
        "1 Bedroom Apartment Outside of City Centre": "apt_1bed_outside",
        "3 Bedroom Apartment in City Centre": "apt_3bed_center",
        "3 Bedroom Apartment Outside of City Centre": "apt_3bed_outside",
        "Price per Square Meter to Buy Apartment in City Centre": "buy_price_sqm_center",
        "Price per Square Meter to Buy Apartment Outside of Centre": "buy_price_sqm_outside",
        "Annual Mortgage Interest Rate (20-Year Fixed, in %)": "mortgage_interest_rate",
        "Average Monthly Net Salary (After Tax)": "salary_avg_net"
    }

    for original_key, clean_value in raw_data.items():
        # Preserve metadata like country
        if original_key == 'country_name':
            normalized['country'] = clean_value
            continue
            
        # Clean the value (price)
        price_float = clean_currency(clean_value)
        
        # Map key if possible
        # We try exact match first
        standard_key = key_mapping.get(original_key)
        
        # If no exact match, we might skip or store as is. 
        # For this specific project, we only care about mapped keys for consistent analysis.
        if standard_key:
            normalized[standard_key] = price_float
            
    return normalized

def calculate_metrics(df: pd.DataFrame) -> pd.DataFrame:
    """
    Calculates derived metrics like Purchasing Power.
    Expects a DataFrame where rows are cities and columns include 'salary_avg_net' and basket items.
    """
    # define a basic basket cost (e.g. rent + food for 1 person)
    # Simple basket: apt_1bed_center + 30 * (meal_inexpensive / 2 + market_items...)
    # For simplicity in this demo, let's sum a subset of columns if they exist.
    
    basket_items = [
        'meal_inexpensive', 'cappuccino', 'milk_1l', 'bread_500g', 'eggs_12',
        'chicken_1kg', 'apples_1kg', 'potato_1kg', 'water_1.5l', 'transport_pass', 'internet', 'utilities_basic', 'apt_1bed_center'
    ]
    
    # Verify columns exist
    existing_items = [col for col in basket_items if col in df.columns]
    
    if existing_items:
         # Cost of Living Index (approximate sum of basket)
         # In a real scenario, we might apply weights.
         df['basket_cost'] = df[existing_items].sum(axis=1)
         
    if 'salary_avg_net' in df.columns and 'basket_cost' in df.columns:
        # Purchasing Power: How many baskets can one salary buy?
        df['purchasing_power_index'] = df['salary_avg_net'] / df['basket_cost']
        
        # Hours to earn basket: (basket_cost / salary) * 160 (approx working hours)
        df['hours_to_earn_basket'] = (df['basket_cost'] / df['salary_avg_net']) * 160

    return df
