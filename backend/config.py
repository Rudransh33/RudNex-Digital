import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'change-me')
    DATABASE_PATH = os.getenv('DATABASE_PATH', './rudnex_digital.db')
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
    SENDER_EMAIL = os.getenv('SENDER_EMAIL', '')
    SENDER_PASSWORD = os.getenv('SENDER_PASSWORD', '')
    SUPPORT_EMAIL = os.getenv('SUPPORT_EMAIL', 'help@rudnex.com')
    API_RATE_LIMIT = int(os.getenv('API_RATE_LIMIT', 1000))
    ADMIN_TOKEN = os.getenv('ADMIN_TOKEN', 'admin-token')
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
