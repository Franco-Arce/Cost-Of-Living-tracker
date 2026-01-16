# Actualización de Datos - Global Cost of Living Tracker

## 📊 Estado Actual de los Datos

Los datos actualmente están **ESTÁTICOS** en `api/data/latest_metrics.csv`. Fueron extraídos una vez y no se actualizan automáticamente.

## 🔄 Cómo Actualizar los Datos

### Opción 1: Usando Numbeo API (Recomendado)

1. **Obtener API Key de Numbeo:**
   - Visita: https://www.numbeo.com/api/doc.jsp
   - Registrate y obtén tu API key
   - Costo: ~$50-100 USD por mes (dependiendo del plan)

2. **Configurar el script:**
   ```bash
   # Establecer la API key como variable de entorno
   set NUMBEO_API_KEY=tu_api_key_aqui
   ```

3. **Ejecutar el script de actualización:**
   ```bash
   python scripts/update_numbeo_data.py
   ```

### Opción 2: Actualización Manual desde Numbeo Website

Si no quieres pagar por la API, puedes actualizar manualmente:

1. Visita https://www.numbeo.com/cost-of-living/
2. Para cada ciudad, extrae los datos necesarios
3. Actualiza el archivo `api/data/latest_metrics.csv`

### Opción 3: Web Scraping (No Recomendado)

Numbeo no permite scraping según sus términos de servicio. Usa la API oficial.

## 📅 Frecuencia de Actualización Recomendada

- **Mensual**: Para mantener datos actualizados
- **Trimestral**: Mínimo aceptable
- **Anual**: Solo si el presupuesto es muy limitado

## 🤖 Automatización con GitHub Actions

Puedes automatizar la actualización creando un workflow de GitHub Actions:

```yaml
# .github/workflows/update-data.yml
name: Update Numbeo Data

on:
  schedule:
    - cron: '0 0 1 * *'  # Primer día de cada mes
  workflow_dispatch:  # Permite ejecución manual

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Update data
        env:
          NUMBEO_API_KEY: ${{ secrets.NUMBEO_API_KEY }}
        run: python scripts/update_numbeo_data.py
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add api/data/latest_metrics.csv
          git commit -m "Update Numbeo data" || echo "No changes"
          git push
```

## ⚠️ Importante

1. **Calidad de Datos**: Numbeo es crowdsourced, verifica la calidad
2. **Costos**: La API de Numbeo es de pago
3. **Alternativas Gratuitas**: 
   - World Bank Open Data (menos detallado)
   - OECD Data (solo países OECD)
   - Manual updates from public sources

## 📝 Notas

- Los datos actuales parecen ser de 2023-2024
- Para un dashboard profesional de 2026, se recomienda actualizar
- Considera agregar un timestamp visible en el dashboard
