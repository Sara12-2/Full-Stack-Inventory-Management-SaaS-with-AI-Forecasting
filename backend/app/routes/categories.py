from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.extensions import db
from app.models import Category
from app.schemas.category_schema import CategorySchema
from app.utils.errors import first_error

categories_bp = Blueprint("categories", __name__)
category_schema = CategorySchema()


@categories_bp.get("")
@jwt_required()
def list_categories():
    categories = Category.query.order_by(Category.name).all()
    return jsonify([c.to_dict() for c in categories]), 200


@categories_bp.post("")
@jwt_required()
def create_category():
    try:
        payload = category_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    if Category.query.filter_by(name=payload["name"]).first():
        return jsonify(error="A category with this name already exists."), 409

    category = Category(**payload)
    db.session.add(category)
    db.session.commit()
    return jsonify(category.to_dict()), 201
