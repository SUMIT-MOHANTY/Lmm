import os
import logging

logger = logging.getLogger(__name__)

# Placeholder SendGrid API key - replace with real key once provided
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY', 'SENDGRID_API_KEY_PLACEHOLDER')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@example.com')
FROM_EMAIL = os.environ.get('FROM_EMAIL', 'noreply@example.com')

class EmailService:
    def __init__(self):
        self.api_key = SENDGRID_API_KEY
        self.from_email = FROM_EMAIL
        self.admin_email = ADMIN_EMAIL
    
    def send_contact_notification(self, contact_data):
        subject = f"New Contact: {contact_data.get('subject', 'No Subject')}"
        body = f"""Name: {contact_data['name']}
Email: {contact_data['email']}
Subject: {contact_data.get('subject', 'N/A')}

Message:
{contact_data['message']}"""
        # Mock email sending since using placeholder API key
        logger.info(f"[MOCK EMAIL] Sending to {self.admin_email}: {subject}")
        return True, "Email sent (mock mode)"
    
    def send_confirmation(self, contact_data):
        subject = "Thank you for your message"
        body = f"Hi {contact_data['name']},\n\nWe received your message and will get back to you soon.\n\nBest regards"
        logger.info(f"[MOCK EMAIL] Confirmation to {contact_data['email']}")
        return True, "Confirmation sent (mock mode)"
