import redis as redis_lib
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()
cors = CORS()
socketio = SocketIO()

redis_client = None


def init_redis(app):
    """Connect to Redis for caching/pubsub. Non-fatal if unavailable in dev."""
    global redis_client
    try:
        client = redis_lib.from_url(app.config["REDIS_URL"], socket_connect_timeout=2)
        client.ping()
        redis_client = client
        app.logger.info("Connected to Redis at %s", app.config["REDIS_URL"])
    except Exception as exc:
        redis_client = None
        app.logger.warning("Redis unavailable (%s); continuing without cache/pubsub", exc)
