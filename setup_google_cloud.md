# ☁️ Guía de Configuración: Google Cloud & Sheets API

Para que el script pueda "escribir" en tu Google Sheet, necesitas crear un "robot" (Service Account) y darle permiso. Sigue estos pasos exactos:

## Paso 1: Crear Proyecto en Google Cloud
1.  Entra a [Google Cloud Console](https://console.cloud.google.com/).
2.  Si es tu primera vez, acepta los términos (es gratis).
3.  Arriba a la izquierda, haz clic en el selector de proyectos y elige **"New Project"** (Nuevo Proyecto).
4.  Ponle de nombre: `Cost-Tracker` y dale a **Create**.

## Paso 2: Activar la API de Google Sheets
1.  Asegúrate de que tu nuevo proyecto `Cost-Tracker` esté seleccionado arriba.
2.  En la barra de búsqueda superior, escribe **"Google Sheets API"**.
3.  Haz clic en el resultado "Google Sheets API" (Marketplace).
4.  Dale al botón azul **ENABLE** (Habilitar).
5.  *(Opcional)* Haz lo mismo buscando **"Google Drive API"** y habilítala también (a veces es necesario para permisos).

## Paso 3: Crear la Service Account (El Robot)
1.  Ve al menú (tres líneas arriba izq) -> **IAM & Admin** -> **Service Accounts**.
2.  Haz clic en **+ CREATE SERVICE ACCOUNT**.
3.  **Name**: `cost-tracker-bot`.
4.  **Description**: "Bot for Numbeo ETL".
5.  Dale a **Create and Continue**.
6.  **Role**: En "Select a role", elige **Basic** -> **Editor** (para que pueda editar).
7.  Dale a **Continue** y luego a **Done**.

## Paso 4: Descargar la Llave (JSON)
1.  En la lista de Service Accounts, verás la que acabas de crear (`cost-tracker-bot@...`). Haz clic en ella (en el email).
2.  Ve a la pestaña **KEYS** (Claves) arriba.
3.  Haz clic en **ADD KEY** -> **Create new key**.
4.  Elige **JSON** y dale a **CREATE**.
5.  🚨 **IMPORTANTE**: Se descargará un archivo `.json` a tu PC.
6.  Mueve ese archivo a la carpeta de este proyecto:
    `C:\Users\franc\OneDrive\Escritorio\Mis Cosas\Global Cost of Living Tracker\`
7.  **Renómbralo** para que se llame exactamente: `credentials.json`.

## Paso 5: Conectar con tu Google Sheet
1.  Abre el archivo `credentials.json` con el bloc de notas y busca el campo `"client_email"`. Copia ese email (ej: `cost-tracker-bot@cost-tracker.iam.gserviceaccount.com`).
2.  Ve a **Google Sheets** y crea una hoja nueva llamada `Global Cost of Living`.
3.  Dale al botón **Compartir** (Share) arriba a la derecha.
4.  **Pega el email del robot** y asegúrate de que tenga permiso de **Editor**.
5.  Dale a **Enviar**.

## Paso 6: Obtener ID de la Hoja
1.  Mira la URL de tu Google Sheet.
2.  Copia el código largo que está entre `/d/` y `/edit`.
    *   Ejemplo: `docs.google.com/spreadsheets/d/`**`1a2b3c4d5e...`**`/edit`
3.  Ese es tu `GOOGLE_SHEET_ID`. Lo usaremos para configurar el script.
