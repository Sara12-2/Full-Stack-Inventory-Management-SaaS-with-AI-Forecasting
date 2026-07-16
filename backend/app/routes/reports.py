from flask import Blueprint, Response, request
from flask_jwt_extended import jwt_required

from app.services.report_service import (
    generate_inventory_csv,
    generate_movements_csv,
    generate_orders_csv,
    generate_revenue_csv,
)

reports_bp = Blueprint("reports", __name__)


def _csv_response(csv_text, filename):
    return Response(
        csv_text,
        mimetype="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


@reports_bp.get("/inventory")
@jwt_required()
def inventory_report():
    return _csv_response(generate_inventory_csv(), "inventory_report.csv")


@reports_bp.get("/orders")
@jwt_required()
def orders_report():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    return _csv_response(generate_orders_csv(start_date, end_date), "orders_report.csv")


@reports_bp.get("/revenue")
@jwt_required()
def revenue_report():
    return _csv_response(generate_revenue_csv(), "revenue_report.csv")


@reports_bp.get("/movements")
@jwt_required()
def movements_report():
    return _csv_response(generate_movements_csv(), "stock_movements_report.csv")
