from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app, origins="http://localhost:", allow_headers=["Content-Type"])
    app.config["CORS_HEADERS"] = "Content-Type"
    app.secret_key = "bhutsumutandarika"

    app.config["SECRETE_KEY"] = 'babatunde'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

    db.init_app(app)

    from .views import main
    app.register_blueprint(main)

    return app
