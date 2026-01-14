import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pandas as pd
import os
import json
import logging

logger = logging.getLogger(__name__)

class GoogleSheetClient:
    def __init__(self):
        self.scope = ['https://www.googleapis.com/auth/spreadsheets', "https://www.googleapis.com/auth/drive"]
        self.credentials = self._get_credentials()
        self.client = None
        if self.credentials:
            try:
                self.client = gspread.authorize(self.credentials)
                logger.info("Authenticated with Google Sheets successfully.")
            except Exception as e:
                logger.error(f"Authentication failed: {e}")

    def _get_credentials(self):
        # Try finding credentials in environment variable (for GitHub Actions)
        json_creds = os.environ.get("GDRIVE_API_CREDENTIALS")
        if json_creds:
            try:
                creds_dict = json.loads(json_creds)
                return ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, self.scope)
            except Exception as e:
                logger.error(f"Failed to load credentials from env: {e}")
                return None
        
        # Try local file
        if os.path.exists("credentials.json"):
             return ServiceAccountCredentials.from_json_keyfile_name("credentials.json", self.scope)
        
        logger.warning("No credentials found (Env var GDRIVE_API_CREDENTIALS or credentials.json).")
        return None

    def update_sheet(self, sheet_id: str, df: pd.DataFrame, worksheet_name: str = None):
        if not self.client:
            logger.error("Client not authenticated. Cannot update sheet.")
            return

        try:
            sheet = self.client.open_by_key(sheet_id)
            if worksheet_name:
                try:
                    worksheet = sheet.worksheet(worksheet_name)
                except gspread.WorksheetNotFound:
                    worksheet = sheet.add_worksheet(title=worksheet_name, rows=1000, cols=30)
            else:
                # Default to the first worksheet (useful for different locales like "Hoja 1")
                worksheet = sheet.get_worksheet(0)
            
            # Prepare data
            # Replace NaN with empty string for cleaner sheet
            df_clean = df.fillna('')
            data = [df_clean.columns.values.tolist()] + df_clean.values.tolist()

            # Update data
            worksheet.clear()
            worksheet.update(data)
            logger.info("Sheet updated successfully.")
        except Exception as e:
            logger.error(f"Failed to update sheet: {e}")
