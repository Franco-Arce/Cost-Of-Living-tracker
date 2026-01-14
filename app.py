
import streamlit as st
import pandas as pd
import plotly.express as px
import os

# --- Configuration ---
st.set_page_config(
    page_title="Global Cost of Living Tracker",
    page_icon="🌍",
    layout="wide"
)

# --- Data Loading ---
@st.cache_data
def load_data():
    # Try loading from local data folder first
    try:
        df = pd.read_csv("data/latest_metrics.csv")
        return df
    except FileNotFoundError:
        return pd.DataFrame()

df = load_data()

# --- Sidebar ---
st.sidebar.title("🌍 Settings")
st.sidebar.markdown("Filter the data displayed on the dashboard.")

if not df.empty:
    # Filter by Country
    all_countries = sorted(df['country'].unique())
    selected_countries = st.sidebar.multiselect("Select Countries", all_countries, default=all_countries)
    
    if selected_countries:
        df_filtered = df[df['country'].isin(selected_countries)]
    else:
        df_filtered = df
else:
    df_filtered = df

# --- Main Page ---
st.title("🌍 Global Cost of Living Tracker")
st.markdown("""
This dashboard compares the **Real Purchasing Power** between different cities worldwide.
It calculates how many hours of work are needed to buy a basic basket of goods based on local salaries.
""")

if df.empty:
    st.warning("No data found. Please run the ETL pipeline first to generate `data/latest_metrics.csv`.")
    st.stop()

# --- KPI metrics ---
col1, col2, col3 = st.columns(3)

avg_ppi = df_filtered['purchasing_power_index'].mean()
avg_hours = df_filtered['hours_to_earn_basket'].mean()
highest_ppi_city = df_filtered.loc[df_filtered['purchasing_power_index'].idxmax()]

with col1:
    st.metric("Avg Purchasing Power Index", f"{avg_ppi:.2f}")
with col2:
    st.metric("Avg Hours to Earn Basket", f"{avg_hours:.1f} hrs")
with col3:
    st.metric("Highest Purchasing Power", f"{highest_ppi_city['city']} ({highest_ppi_city['country']})")

st.divider()

# --- Visualizations ---

# 1. Purchasing Power Index (Bar Chart)
st.subheader("💰 Purchasing Power Index by City")
st.markdown("Higher is better. It means local salary can buy more goods.")

fig_ppi = px.bar(
    df_filtered.sort_values("purchasing_power_index", ascending=False),
    x="purchasing_power_index",
    y="city",
    color="country",
    orientation="h",
    text_auto='.2f',
    title="Purchasing Power Index (Higher = Better)",
    height=600
)
fig_ppi.update_layout(yaxis={'categoryorder':'total ascending'})
st.plotly_chart(fig_ppi, use_container_width=True)

# 2. Scatter Plot: Cost vs Salary
st.subheader("⚖️ Cost of Living vs. Local Salary")
st.markdown("Are high costs matched by high salaries?")

fig_scatter = px.scatter(
    df_filtered,
    x="basket_cost",
    y="salary_avg_net",
    size="purchasing_power_index",
    color="country",
    hover_name="city",
    text="city",
    title="Basket Cost vs. Average Net Salary (USD)",
    labels={"basket_cost": "Basket Cost (USD)", "salary_avg_net": "Avg Net Salary (USD)"},
    height=600
)
fig_scatter.update_traces(textposition='top center')
st.plotly_chart(fig_scatter, use_container_width=True)

# 3. Hours to Earn Basket (Bar Chart)
st.subheader("⏱️ Work Hours Needed to Buy Basic Basket")
st.markdown("Lower is better. Shows how many hours of the average wage are needed to buy a standard basket of goods.")

fig_hours = px.bar(
    df_filtered.sort_values("hours_to_earn_basket", ascending=True),
    x="hours_to_earn_basket",
    y="city",
    color="country",
    orientation="h",
    text_auto='.1f',
    title="Hours to Earn Basket (Lower = Better)",
    height=600
)
fig_hours.update_layout(yaxis={'categoryorder':'total descending'})
st.plotly_chart(fig_hours, use_container_width=True)

# --- Data Table ---
with st.expander("📊 View Raw Data"):
    st.dataframe(df_filtered)

st.markdown("---")
st.caption("Data source: Numbeo. Calculated automatically.")
