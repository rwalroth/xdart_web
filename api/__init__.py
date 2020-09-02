from flask import Flask
from api.routes import bp
from api.sql_database import db, migrate
from api.admin_views import admin


def create_app():
    app = Flask(__name__)
    app.register_blueprint(bp)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SECRET_KEY'] = "thisisthesecretkeyforxdartCHANGETHISINPRODUCTION" # This needs to be changed for production!!

    db.init_app(app)
    migrate.init_app(app, db)
    admin.init_app(app)

    return app
