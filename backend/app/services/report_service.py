import csv
import io

from app.models import Order, Product, StockMovement


def _to_csv(header, rows):
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(header)
    writer.writerows(rows)
    return buffer.getvalue()


def generate_inventory_csv():
    products = Product.query.order_by(Product.name).all()
    header = ["Name", "SKU", "Category", "Supplier", "Stock Quantity", "Low Stock Threshold", "Price", "Cost Price", "Status"]
    rows = [
        [
            p.name, p.sku,
            p.category.name if p.category else "",
            p.supplier.name if p.supplier else "",
            p.stock_quantity, p.low_stock_threshold,
            float(p.price), float(p.cost_price), p.status,
        ]
        for p in products
    ]
    return _to_csv(header, rows)


def generate_orders_csv(start_date=None, end_date=None):
    query = Order.query
    if start_date:
        query = query.filter(Order.created_at >= start_date)
    if end_date:
        query = query.filter(Order.created_at <= end_date)
    orders = query.order_by(Order.created_at.desc()).all()

    header = ["Order Number", "Customer Name", "Customer Email", "Status", "Total Amount", "Created At"]
    rows = [
        [o.order_number, o.customer_name, o.customer_email or "", o.status, float(o.total_amount), o.created_at.isoformat()]
        for o in orders
    ]
    return _to_csv(header, rows)


def generate_revenue_csv():
    # Grouped in Python rather than SQL (e.g. strftime) so this works
    # identically on SQLite (local dev) and MySQL (prod) without a
    # dialect-specific date-formatting function.
    orders = Order.query.filter(Order.status != "cancelled").order_by(Order.created_at).all()
    totals = {}
    for order in orders:
        period = order.created_at.strftime("%Y-%m")
        totals[period] = totals.get(period, 0.0) + float(order.total_amount)

    header = ["Period", "Revenue"]
    rows = [[period, total] for period, total in sorted(totals.items())]
    return _to_csv(header, rows)


def generate_movements_csv():
    movements = StockMovement.query.order_by(StockMovement.created_at.desc()).all()
    header = ["Product", "Movement Type", "Quantity", "Reason", "Created By", "Created At"]
    rows = [
        [
            m.product.name if m.product else "",
            m.movement_type, m.quantity, m.reason or "",
            m.created_by_user.name if m.created_by_user else "",
            m.created_at.isoformat(),
        ]
        for m in movements
    ]
    return _to_csv(header, rows)
