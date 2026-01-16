# 🔄 Updating Data

With the new static architecture, updating data is straightforward. All data is stored in a static JSON file.

## Data File Location

📂 `public/data/metrics.json`

## How to Update

1. Open `public/data/metrics.json` in your code editor.
2. The file contains an array of city objects. You can:
   - **Edit** existing values directly
   - **Add** a new city object to the array
   - **Remove** a city object

### City Object Structure

```json
{
  "city": "City-Name",
  "country": "Country Name",
  "purchasing_power_index": 85.5,
  "hours_to_earn_basket": 150.2,
  "basket_cost": 500.00,
  "salary_avg_net": 2500.00,
  "image_url": "https://images.unsplash.com/...",
  "meal_inexpensive": 15.00,
  ... (other detailed metrics)
}
```

## Adding Images

When adding a new city, you can use Unsplash for high-quality images. Copy the image URL and paste it into the `image_url` field.

## Deploying Updates

After modifying the JSON file:

1. Commit your changes:
   ```bash
   git add public/data/metrics.json
   git commit -m "Update city data"
   ```
2. Push to your repository:
   ```bash
   git push
   ```
3. Your hosting provider (e.g., Vercel, Netlify) will automatically redeploy with the new data.
