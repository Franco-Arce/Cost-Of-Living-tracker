import pytest
import pandas as pd
from src.processor import clean_currency, normalize_data, calculate_metrics

def test_clean_currency():
    assert clean_currency("1,200.50 $") == 1200.50
    assert clean_currency("$12.50") == 12.50
    assert clean_currency("3000") == 3000.0
    assert clean_currency("invalid") is None
    assert clean_currency(None) is None

def test_normalize_data():
    raw_data = {
        "Meal, Inexpensive Restaurant": "15.00 $",
        "Average Monthly Net Salary (After Tax)": "3,000.00 $",
        "Unknown Item": "100"
    }
    cleaned = normalize_data(raw_data)
    
    assert cleaned["meal_inexpensive"] == 15.00
    assert cleaned["salary_avg_net"] == 3000.00
    assert "Unknown Item" not in cleaned # verification of filtering

def test_calculate_metrics():
    data = [{
        "city": "Test City",
        "meal_inexpensive": 10.0,
        "cappuccino": 5.0,
        "milk_1l": 1.0,
        "bread_500g": 2.0,
        "eggs_12": 3.0,
        "chicken_1kg": 10.0,
        "apples_1kg": 2.0,
        "potato_1kg": 1.0,
        "water_1.5l": 1.0,
        "transport_pass": 50.0,
        "internet": 30.0,
        "utilities_basic": 100.0,
        "apt_1bed_center": 1000.0,
        "salary_avg_net": 3000.0
    }]
    
    df = pd.DataFrame(data)
    df = calculate_metrics(df)
    
    # Basket sum = 10+5+1+2+3+10+2+1+1+50+30+100+1000 = 1215
    expected_basket = 1215.0
    assert df.iloc[0]['basket_cost'] == expected_basket
    
    # Purchasing Power = 3000 / 1215 = 2.469
    assert abs(df.iloc[0]['purchasing_power_index'] - (3000.0 / 1215.0)) < 0.001
    
    # Hours to earn = (1215 / 3000) * 160 = 0.405 * 160 = 64.8
    assert abs(df.iloc[0]['hours_to_earn_basket'] - (1215.0 / 3000.0 * 160)) < 0.01
