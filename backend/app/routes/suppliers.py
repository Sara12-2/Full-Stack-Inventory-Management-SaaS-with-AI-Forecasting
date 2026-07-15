from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.extensions import db
from app.models import Supplier
from app.schemas.supplier_schema import SupplierSchema
from app.utils.errors import first_error
from app.utils.rbac import roles_required

suppliers_bp = Blueprint("suppliers", __name__)
supplier_schema = SupplierSchema()


@suppliers_bp.get("")
@jwt_required()
def list_suppliers():
    suppliers = Supplier.query.order_by(Supplier.name).all()
    return jsonify([s.to_dict() for s in suppliers]), 200


@suppliers_bp.post("")
@jwt_required()
def create_supplier():
    try:
        payload = supplier_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    supplier = Supplier(**payload)
    db.session.add(supplier)
    db.session.commit()
    return jsonify(supplier.to_dict()), 201


@suppliers_bp.put("/<int:supplier_id>")
@jwt_required()
def update_supplier(supplier_id):
    supplier = db.session.get(Supplier, supplier_id)
    if not supplier:
        return jsonify(error="Supplier not found."), 404

    try:
        payload = supplier_schema.load(request.get_json(silent=True) or {}, partial=True)
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    for key, value in payload.items():
        setattr(supplier, key, value)
    db.session.commit()
    return jsonify(supplier.to_dict()), 200


@suppliers_bp.delete("/<int:supplier_id>")
@roles_required("admin")
def delete_supplier(supplier_id):
    supplier = db.session.get(Supplier, supplier_id)
    if not supplier:
        return jsonify(error="Supplier not found."), 404

    if supplier.products:
        return jsonify(error="Cannot delete a supplier with existing products. Reassign or delete those products first."), 409

    db.session.delete(supplier)
    db.session.commit()
    return jsonify(message="Supplier deleted."), 200
