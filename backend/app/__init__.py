import os

from flask import Flask, jsonify

from app.config import config_by_name
from app.extensions import cors, db, init_redis, jwt, ma, migrate, socketio


def create_app(env=None):
    env = env or os.environ.get("FLASK_ENV", "development")
    app = Flask(__name__)
    app.config.from_object(config_by_name[env])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}}, supports_credentials=True)
    socketio.init_app(app, cors_allowed_origins=app.config["CORS_ORIGINS"])

    if env != "testing":
        init_redis(app)

    @jwt.unauthorized_loader
    def _missing_token(reason):
        return jsonify(error="Authentication required."), 401

    @jwt.invalid_token_loader
    def _invalid_token(reason):
        return jsonify(error="Invalid authentication token."), 401

    @jwt.expired_token_loader
    def _expired_token(header, payload):
        return jsonify(error="Session expired. Please log in again."), 401

    from app import models  # noqa: F401 -- registers models with SQLAlchemy metadata
    from app.routes.auth import auth_bp
    from app.routes.categories import categories_bp
    from app.routes.customers import customers_bp
    from app.routes.dashboard import dashboard_bp
    from app.routes.health import health_bp
    from app.routes.inventory import inventory_bp
    from app.routes.orders import orders_bp
    from app.routes.products import products_bp
    from app.routes.suppliers import suppliers_bp

    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(products_bp, url_prefix="/api/products")
    app.register_blueprint(categories_bp, url_prefix="/api/categories")
    app.register_blueprint(suppliers_bp, url_prefix="/api/suppliers")
    app.register_blueprint(inventory_bp, url_prefix="/api/inventory")
    app.register_blueprint(orders_bp, url_prefix="/api/orders")
    app.register_blueprint(customers_bp, url_prefix="/api/customers")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

    return app
