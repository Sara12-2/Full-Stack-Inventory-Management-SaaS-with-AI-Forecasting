from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Customer

customers_bp = Blueprint("customers", __name__)


@customers_bp.get("")
@jwt_required()
def list_customers():
    customers = Customer.query.order_by(Customer.created_at.desc()).all()
    return jsonify([c.to_dict() for c in customers]), 200


@customers_bp.get("/<int:customer_id>")
@jwt_required()
def get_customer(customer_id):
    customer = db.session.get(Customer, customer_id)
    if not customer:
        return jsonify(error="Customer not found."), 404
    return jsonify(customer.to_dict()), 200
