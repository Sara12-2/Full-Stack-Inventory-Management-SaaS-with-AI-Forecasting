from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.extensions import db
from app.models import Customer, Order, OrderItem, Product
from app.schemas.order_schema import OrderCreateSchema, OrderStatusSchema
from app.utils.errors import first_error

orders_bp = Blueprint("orders", __name__)
order_create_schema = OrderCreateSchema()
order_status_schema = OrderStatusSchema()


def _generate_order_number():
    last = Order.query.order_by(Order.id.desc()).first()
    next_id = (last.id + 1) if last else 1
    return f"ORD-{1000 + next_id}"


@orders_bp.get("")
@jwt_required()
def list_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([o.to_dict() for o in orders]), 200


@orders_bp.get("/<int:order_id>")
@jwt_required()
def get_order(order_id):
    order = db.session.get(Order, order_id)
    if not order:
        return jsonify(error="Order not found."), 404
    return jsonify(order.to_dict()), 200


@orders_bp.post("")
@jwt_required()
def create_order():
    try:
        payload = order_create_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    # Validate every line item (product exists, enough stock) before making
    # any changes, so a failure partway through never leaves a partial order.
    line_items = []
    for item in payload["items"]:
        product = db.session.get(Product, item["product_id"])
        if not product:
            return jsonify(error=f"Product {item['product_id']} not found."), 404
        if product.stock_quantity < item["quantity"]:
            return jsonify(error=f"Not enough stock for {product.name}."), 400
        line_items.append((product, item["quantity"]))

    customer = None
    if payload.get("customer_email"):
        customer = Customer.query.filter_by(email=payload["customer_email"]).first()
    if not customer:
        customer = Customer(
            name=payload["customer_name"],
            email=payload.get("customer_email"),
            phone=payload.get("customer_phone", ""),
        )
        db.session.add(customer)
        db.session.flush()

    total_amount = sum(product.price * qty for product, qty in line_items)

    order = Order(
        order_number=_generate_order_number(),
        customer=customer,
        customer_name=payload["customer_name"],
        customer_email=payload.get("customer_email"),
        customer_phone=payload.get("customer_phone", ""),
        total_amount=total_amount,
        status="pending",
    )
    db.session.add(order)
    db.session.flush()

    for product, qty in line_items:
        db.session.add(OrderItem(order=order, product=product, quantity=qty, unit_price=product.price))
        product.stock_quantity -= qty

    db.session.commit()
    return jsonify(order.to_dict()), 201


@orders_bp.put("/<int:order_id>/status")
@jwt_required()
def update_order_status(order_id):
    order = db.session.get(Order, order_id)
    if not order:
        return jsonify(error="Order not found."), 404

    try:
        payload = order_status_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    new_status = payload["status"]

    # Restore stock when an order moves into "cancelled" from any other state.
    if new_status == "cancelled" and order.status != "cancelled":
        for item in order.items:
            if item.product:
                item.product.stock_quantity += item.quantity

    order.status = new_status
    db.session.commit()
    return jsonify(order.to_dict()), 200
