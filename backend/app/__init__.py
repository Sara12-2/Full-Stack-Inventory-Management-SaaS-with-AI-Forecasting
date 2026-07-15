import os

from flask import Flask

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

    from app.routes.health import health_bp

    app.register_blueprint(health_bp, url_prefix="/api")

    return app
