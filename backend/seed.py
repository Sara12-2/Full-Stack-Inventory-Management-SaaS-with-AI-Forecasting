"""Seed the database with sample data for local development.

Usage: flask --app main.py shell -c "exec(open('seed.py').read())"
or:    python seed.py   (requires FLASK_ENV/DATABASE_URL etc. to be set)
"""
from datetime import datetime, timezone

from werkzeug.security import generate_password_hash

from app import create_app
from app.extensions import db
from app.models import Category, Customer, Order, OrderItem, Product, StockMovement, Supplier, User


def run():
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()

        admin = User(name="Admin User", email="admin@stockflow.dev", role="admin",
                     password_hash=generate_password_hash("password123"))
        staff = User(name="Staff User", email="staff@stockflow.dev", role="staff",
                     password_hash=generate_password_hash("password123"))
        db.session.add_all([admin, staff])
        db.session.flush()

        categories = [
            Category(name="Electronics", description="Gadgets and devices"),
            Category(name="Clothing", description="Apparel"),
            Category(name="Food", description="Consumables"),
            Category(name="Beauty", description="Cosmetics"),
            Category(name="Home", description="Household items"),
        ]
        db.session.add_all(categories)
        db.session.flush()
        cat = {c.name: c for c in categories}

        suppliers = [
            Supplier(name="Acme Supplies", email="contact@acme.com", phone="555-0101"),
            Supplier(name="Global Traders", email="hello@globaltraders.com", phone="555-0102"),
            Supplier(name="Northwind Distribution", email="info@northwind.com", phone="555-0103"),
        ]
        db.session.add_all(suppliers)
        db.session.flush()
        sup = {s.name: s for s in suppliers}

        products = [
            Product(name="Wireless Mouse", sku="ELE-001", category=cat["Electronics"], supplier=sup["Acme Supplies"],
                    price=19.99, cost_price=9.5, stock_quantity=45, low_stock_threshold=10),
            Product(name="Bluetooth Speaker", sku="ELE-002", category=cat["Electronics"], supplier=sup["Acme Supplies"],
                    price=39.99, cost_price=20, stock_quantity=6, low_stock_threshold=10),
            Product(name="Cotton T-Shirt", sku="CLO-001", category=cat["Clothing"], supplier=sup["Global Traders"],
                    price=14.99, cost_price=6, stock_quantity=120, low_stock_threshold=20),
            Product(name="Denim Jacket", sku="CLO-002", category=cat["Clothing"], supplier=sup["Global Traders"],
                    price=59.99, cost_price=28, stock_quantity=8, low_stock_threshold=10),
            Product(name="Organic Honey 500g", sku="FOO-001", category=cat["Food"], supplier=sup["Northwind Distribution"],
                    price=8.99, cost_price=4, stock_quantity=60, low_stock_threshold=15),
            Product(name="Face Moisturizer", sku="BEA-001", category=cat["Beauty"], supplier=sup["Global Traders"],
                    price=24.99, cost_price=11, stock_quantity=5, low_stock_threshold=10),
            Product(name="Scented Candle", sku="HOM-001", category=cat["Home"], supplier=sup["Northwind Distribution"],
                    price=12.99, cost_price=5, stock_quantity=75, low_stock_threshold=15),
            Product(name="Ceramic Mug Set", sku="HOM-002", category=cat["Home"], supplier=sup["Northwind Distribution"],
                    price=22.99, cost_price=10, stock_quantity=3, low_stock_threshold=10),
        ]
        db.session.add_all(products)
        db.session.flush()
        prod = {p.sku: p for p in products}

        db.session.add_all([
            StockMovement(product=prod["ELE-002"], movement_type="in", quantity=10, reason="Restock", created_by_user=admin),
            StockMovement(product=prod["ELE-002"], movement_type="out", quantity=4, reason="Order fulfillment", created_by_user=admin),
            StockMovement(product=prod["HOM-002"], movement_type="adjustment", quantity=-2, reason="Damaged in warehouse", created_by_user=admin),
        ])

        customers = [
            Customer(name="Ayesha Khan", email="ayesha@example.com", phone="555-1111"),
            Customer(name="Bilal Ahmed", email="bilal@example.com", phone="555-2222"),
            Customer(name="Sara Manzoor", email="sara@example.com", phone="555-3333"),
            Customer(name="Usman Tariq", email="usman@example.com", phone="555-4444"),
            Customer(name="Hina Riaz", email="hina@example.com", phone="555-5555"),
        ]
        db.session.add_all(customers)
        db.session.flush()
        cust = {c.name: c for c in customers}

        orders_data = [
            ("ORD-1001", "Ayesha Khan", "delivered", [("ELE-001", 3, 19.99)]),
            ("ORD-1002", "Bilal Ahmed", "shipped", [("ELE-002", 1, 39.99)]),
            ("ORD-1003", "Sara Manzoor", "processing", [("CLO-002", 1, 59.99), ("HOM-001", 1, 12.99)]),
            ("ORD-1004", "Usman Tariq", "pending", [("CLO-001", 1, 14.99)]),
            ("ORD-1005", "Hina Riaz", "cancelled", [("HOM-002", 1, 22.99)]),
        ]
        for order_number, customer_name, status, items in orders_data:
            customer = cust[customer_name]
            total = sum(qty * price for _, qty, price in items)
            order = Order(order_number=order_number, customer=customer, customer_name=customer.name,
                          customer_email=customer.email, customer_phone=customer.phone,
                          total_amount=total, status=status)
            db.session.add(order)
            db.session.flush()
            for sku, qty, price in items:
                db.session.add(OrderItem(order=order, product=prod[sku], quantity=qty, unit_price=price))

        db.session.commit()
        print("Seed complete:")
        print(f"  Users: {User.query.count()}")
        print(f"  Categories: {Category.query.count()}")
        print(f"  Suppliers: {Supplier.query.count()}")
        print(f"  Products: {Product.query.count()}")
        print(f"  Customers: {Customer.query.count()}")
        print(f"  Orders: {Order.query.count()}")
        print(f"  Stock movements: {StockMovement.query.count()}")


if __name__ == "__main__":
    run()
