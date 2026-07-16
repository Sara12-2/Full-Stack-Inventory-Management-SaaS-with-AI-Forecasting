from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import Schema, ValidationError, fields, validate

from app.ai.restock_recommender import generate_summary, get_all_recommendations
from app.extensions import db
from app.models import Product, StockMovement
from app.models.stock_movement import MOVEMENT_TYPES
from app.services.alert_service import emit_low_stock_alert
from app.utils.errors import first_error

inventory_bp = Blueprint("inventory", __name__)


class StockAdjustSchema(Schema):
    product_id = fields.Integer(required=True)
    movement_type = fields.String(required=True, validate=validate.OneOf(MOVEMENT_TYPES))
    quantity = fields.Integer(required=True, validate=validate.Range(min=1))
    reason = fields.String(required=False, allow_none=True, load_default="")


stock_adjust_schema = StockAdjustSchema()


@inventory_bp.post("/adjust")
@jwt_required()
def adjust_stock():
    try:
        payload = stock_adjust_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    product = db.session.get(Product, payload["product_id"])
    if not product:
        return jsonify(error="Product not found."), 404

    movement_type = payload["movement_type"]
    quantity = payload["quantity"]
    before_quantity = product.stock_quantity

    if movement_type == "in":
        product.stock_quantity += quantity
        signed_quantity = quantity
    else:
        # "out" and "adjustment" (e.g. damage/shrinkage corrections) both
        # reduce stock; the UI collects a positive quantity for both.
        if product.stock_quantity < quantity:
            return jsonify(error="Not enough stock to remove that quantity."), 400
        product.stock_quantity -= quantity
        signed_quantity = -quantity

    movement = StockMovement(
        product_id=product.id,
        movement_type=movement_type,
        quantity=signed_quantity,
        reason=payload.get("reason") or "",
        created_by=int(get_jwt_identity()),
    )
    db.session.add(movement)
    db.session.commit()

    was_low = before_quantity <= product.low_stock_threshold
    is_low = product.stock_quantity <= product.low_stock_threshold
    if is_low and not was_low:
        emit_low_stock_alert(product)

    return jsonify(product=product.to_dict(), movement=movement.to_dict()), 200


@inventory_bp.get("/recommendations")
@jwt_required()
def get_recommendations():
    recommendations = get_all_recommendations()
    summary = generate_summary(recommendations)
    return jsonify(recommendations=recommendations, summary=summary), 200
