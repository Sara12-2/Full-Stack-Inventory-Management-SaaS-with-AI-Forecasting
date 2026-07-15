from flask_jwt_extended import decode_token
from flask_socketio import join_room

from app.extensions import socketio

ALERTS_ROOM = "alerts:all"


@socketio.on("connect")
def handle_connect(auth):
    """Authenticate the socket handshake via a JWT passed as auth={token}.

    Returning False rejects the connection (client receives connect_error).
    """
    token = (auth or {}).get("token")
    if not token:
        return False
    try:
        decode_token(token)
    except Exception:
        return False

    join_room(ALERTS_ROOM)
    return True


@socketio.on("disconnect")
def handle_disconnect():
    pass
