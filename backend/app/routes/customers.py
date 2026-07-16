from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.extensions import db
from app.models import Customer
from app.schemas.customer_schema import CustomerSchema
from app.utils.errors import first_error

customers_bp = Blueprint("customers", __name__)
customer_schema = CustomerSchema()


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


@customers_bp.post("")
@jwt_required()
def create_customer():
    try:
        payload = customer_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    if payload.get("email") and Customer.query.filter_by(email=payload["email"]).first():
        return jsonify(error="A customer with this email already exists."), 409

    customer = Customer(**payload)
    db.session.add(customer)
    db.session.commit()
    return jsonify(customer.to_dict()), 201
