from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.ai.forecasting import generate_insight, get_weekly_sales, linear_forecast
from app.extensions import db
from app.models import Product, StockMovement
from app.schemas.product_schema import ProductSchema
from app.utils.errors import first_error
from app.utils.rbac import roles_required

products_bp = Blueprint("products", __name__)
product_schema = ProductSchema()


@products_bp.get("")
@jwt_required()
def list_products():
    products = Product.query.order_by(Product.created_at.desc()).all()
    return jsonify([p.to_dict() for p in products]), 200


@products_bp.get("/<int:product_id>")
@jwt_required()
def get_product(product_id):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify(error="Product not found."), 404
    return jsonify(product.to_dict()), 200


@products_bp.post("")
@jwt_required()
def create_product():
    try:
        payload = product_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    if Product.query.filter_by(sku=payload["sku"]).first():
        return jsonify(error="A product with this SKU already exists."), 409

    product = Product(**payload)
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201


@products_bp.put("/<int:product_id>")
@jwt_required()
def update_product(product_id):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify(error="Product not found."), 404

    try:
        payload = product_schema.load(request.get_json(silent=True) or {}, partial=True)
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    if "sku" in payload and payload["sku"] != product.sku:
        if Product.query.filter_by(sku=payload["sku"]).first():
            return jsonify(error="A product with this SKU already exists."), 409

    for key, value in payload.items():
        setattr(product, key, value)
    db.session.commit()
    return jsonify(product.to_dict()), 200


@products_bp.delete("/<int:product_id>")
@roles_required("admin")
def delete_product(product_id):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify(error="Product not found."), 404

    if product.order_items:
        return jsonify(error="Cannot delete a product that has order history."), 409

    db.session.delete(product)
    db.session.commit()
    return jsonify(message="Product deleted."), 200


@products_bp.get("/<int:product_id>/movements")
@jwt_required()
def get_product_movements(product_id):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify(error="Product not found."), 404

    movements = (
        StockMovement.query.filter_by(product_id=product_id)
        .order_by(StockMovement.created_at.desc())
        .all()
    )
    return jsonify([m.to_dict() for m in movements]), 200


@products_bp.get("/<int:product_id>/forecast")
@jwt_required()
def get_product_forecast(product_id):
    product = db.session.get(Product, product_id)
    if not product:
        return jsonify(error="Product not found."), 404

    history = get_weekly_sales(product_id, weeks=8)
    forecast_values = linear_forecast(history, periods_ahead=4)
    insight = generate_insight(product.name, history, forecast_values)

    return jsonify(
        product_id=product_id,
        history=history,
        forecast=[{"period": f"Week +{i + 1}", "units": v} for i, v in enumerate(forecast_values)],
        insight=insight,
    ), 200
