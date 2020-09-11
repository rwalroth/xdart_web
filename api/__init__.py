from flask import Flask
from api.routes import bp
from api.blueprints.ttheta_scan.ttheta_scan import ttheta_scan_bp
from api.extensions import db, migrate, bcrypt
from api.admin_views import admin
from api.config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.register_blueprint(bp)
    app.register_blueprint(ttheta_scan_bp)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    admin.init_app(app)

    return app
