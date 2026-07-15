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

def init_redis(app):
    """Connect to Redis for caching/pubsub. Non-fatal if unavailable in dev.

    Stored on the app object (not a module-level global) so it can't go
    stale across multiple create_app() calls in the same process.
    """
    try:
        client = redis_lib.from_url(app.config["REDIS_URL"], socket_connect_timeout=2)
        client.ping()
        app.redis_client = client
        app.logger.info("Connected to Redis at %s", app.config["REDIS_URL"])
    except Exception as exc:
        app.redis_client = None
        app.logger.warning("Redis unavailable (%s); continuing without cache/pubsub", exc)
