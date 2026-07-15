from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from marshmallow import ValidationError
from werkzeug.security import check_password_hash, generate_password_hash

from app.extensions import db
from app.models import User
from app.schemas.user_schema import LoginSchema, SignupSchema
from app.utils.errors import first_error

auth_bp = Blueprint("auth", __name__)

login_schema = LoginSchema()
signup_schema = SignupSchema()


def _issue_token(user):
    return create_access_token(identity=str(user.id), additional_claims={"role": user.role})


@auth_bp.post("/signup")
def signup():
    try:
        payload = signup_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    if User.query.filter_by(email=payload["email"]).first():
        return jsonify(error="An account with this email already exists."), 409

    # Role is always "staff" for public signup; promoting to admin is a
    # separate, deliberate action (seed script / admin-only endpoint later).
    user = User(
        name=payload["name"],
        email=payload["email"],
        password_hash=generate_password_hash(payload["password"]),
        role="staff",
    )
    db.session.add(user)
    db.session.commit()

    return jsonify(token=_issue_token(user), user=user.to_dict()), 201


@auth_bp.post("/login")
def login():
    try:
        payload = login_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    user = User.query.filter_by(email=payload["email"]).first()
    if not user or not check_password_hash(user.password_hash, payload["password"]):
        return jsonify(error="Invalid email or password."), 401

    return jsonify(token=_issue_token(user), user=user.to_dict()), 200


@auth_bp.get("/me")
@jwt_required()
def me():
    user = db.session.get(User, int(get_jwt_identity()))
    if not user:
        return jsonify(error="User not found."), 404
    return jsonify(user.to_dict()), 200
