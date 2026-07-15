from datetime import datetime, timedelta, timezone

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy import case, func

from app.extensions import db
from app.models import Order, OrderItem, Product

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.get("/stats")
@jwt_required()
def stats():
    total_products = Product.query.count()
    total_orders = Order.query.count()
    low_stock_count = Product.query.filter(Product.stock_quantity <= Product.low_stock_threshold).count()

    now = datetime.now(timezone.utc)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    revenue_this_month = (
        db.session.query(func.coalesce(func.sum(Order.total_amount), 0))
        .filter(Order.created_at >= month_start, Order.status != "cancelled")
        .scalar()
    )

    return jsonify(
        total_products=total_products,
        total_orders=total_orders,
        low_stock_count=low_stock_count,
        revenue_this_month=float(revenue_this_month or 0),
    ), 200


@dashboard_bp.get("/revenue")
@jwt_required()
def revenue_trend():
    now = datetime.now(timezone.utc)
    points = []
    for days_ago in range(6, -1, -1):
        day = now - timedelta(days=days_ago)
        day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        total = (
            db.session.query(func.coalesce(func.sum(Order.total_amount), 0))
            .filter(Order.created_at >= day_start, Order.created_at < day_end, Order.status != "cancelled")
            .scalar()
        )
        points.append({"label": day.strftime("%a"), "revenue": float(total or 0)})
    return jsonify(points), 200


@dashboard_bp.get("/top-products")
@jwt_required()
def top_products():
    # Cancelled orders never completed a sale, so their items must not
    # count toward units sold / revenue -- excluded via CASE rather than a
    # WHERE filter so products with zero *completed* orders still appear.
    not_cancelled = Order.status != "cancelled"
    units_sold = func.coalesce(func.sum(case((not_cancelled, OrderItem.quantity), else_=0)), 0)
    revenue = func.coalesce(
        func.sum(case((not_cancelled, OrderItem.quantity * OrderItem.unit_price), else_=0)), 0
    )

    rows = (
        db.session.query(Product.id, Product.name, units_sold.label("units_sold"), revenue.label("revenue"))
        .outerjoin(OrderItem, OrderItem.product_id == Product.id)
        .outerjoin(Order, Order.id == OrderItem.order_id)
        .group_by(Product.id, Product.name)
        .order_by(units_sold.desc())
        .limit(5)
        .all()
    )
    return jsonify([
        {"id": r.id, "name": r.name, "units_sold": int(r.units_sold or 0), "revenue": float(r.revenue or 0)}
        for r in rows
    ]), 200


@dashboard_bp.get("/recent-orders")
@jwt_required()
def recent_orders():
    orders = Order.query.order_by(Order.created_at.desc()).limit(5).all()
    return jsonify([o.to_dict(include_items=False) for o in orders]), 200


@dashboard_bp.get("/low-stock")
@jwt_required()
def low_stock():
    products = (
        Product.query.filter(Product.stock_quantity <= Product.low_stock_threshold)
        .order_by(Product.stock_quantity)
        .all()
    )
    return jsonify([p.to_dict() for p in products]), 200
