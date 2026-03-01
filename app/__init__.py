from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    
    # Register blueprints
    from app.routes.portfolio_bp import portfolio_bp
    from app.routes.contact_bp import contact_bp
    
    app.register_blueprint(portfolio_bp)
    app.register_blueprint(contact_bp)
    
    with app.app_context():
        db.create_all()
    
    return app
