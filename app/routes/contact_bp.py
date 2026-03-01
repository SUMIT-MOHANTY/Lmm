from flask import Blueprint, request, jsonify
from app import db
from app.s.contact import Contact
from app.services.email_service import EmailService
from app.services.rate_limiter import rate_limiter
import re

contact_bp = Blueprint('contact', __name__)
email_service = EmailService()

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

def validate_contact_data(data):
    errors = []
    if not data.get('name'):
        errors.append({'field': 'name', 'message': 'Name is required'})
    elif len(data['name']) > 100:
        errors.append({'field': 'name', 'message': 'Name must be max 100 characters'})
    
    if not data.get('email'):
        errors.append({'field': 'email', 'message': 'Email is required'})
    elif not EMAIL_REGEX.match(data['email']):
        errors.append({'field': 'email', 'message': 'Valid email is required'})
    
    if data.get('subject') and len(data['subject']) > 200:
        errors.append({'field': 'subject', 'message': 'Subject must be max 200 characters'})
    
    if not data.get('message'):
        errors.append({'field': 'message', 'message': 'Message is required'})
    elif len(data['message']) > 2000:
        errors.append({'field': 'message', 'message': 'Message must be max 2000 characters'})
    
    return errors

@contact_bp.route('/api/contact/submit', methods=['POST'])
def submit_contact():
    # Rate limiting check
    ip_address = request.remote_addr
    if not rate_limiter.is_allowed(ip_address):
        return jsonify({
            'success': False,
            'message': 'Too many requests. Please try again later.'
        }), 429
    
    # Get request data
    data = request.get_json()
    if not data:
        return jsonify({
            'success': False,
            'errors': [{'field': 'general', 'message': 'No data provided'}]
        }), 400
    
    # Input validation
    errors = validate_contact_data(data)
    if errors:
        return jsonify({'success': False, 'errors': errors}), 400
    
    try:
        # Create contact submission
        contact = Contact(
            name=data['name'].strip(),
            email=data['email'].strip(),
            subject=data.get('subject', '').strip() or None,
            message=data['message'].strip()
        )
        db.session.add(contact)
        db.session.commit()
        
        # Send email notifications (mock mode with placeholder key)
        email_service.send_contact_notification(data)
        email_service.send_confirmation(data)
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your message. We will get back to you soon.',
            'contact_id': contact.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': 'An error occurred. Please try again later.'
        }), 500
