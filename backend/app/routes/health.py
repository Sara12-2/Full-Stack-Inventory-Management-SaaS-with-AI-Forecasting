from flask import Blueprint, jsonify

from app.extensions import db

health_bp = Blueprint("health", __name__)


@health_bp.get("/health")
def health():
    try:
        db.session.execute(db.text("SELECT 1"))
        database_status = "connected"
    except Exception:
        database_status = "unavailable"

    return jsonify(status="ok", database=database_status), 200
