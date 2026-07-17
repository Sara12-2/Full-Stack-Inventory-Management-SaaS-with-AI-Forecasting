from datetime import datetime, timedelta, timezone

from app.ai.restock_recommender import compute_recommendation, generate_summary
from app.extensions import db
from app.models import Order, OrderItem, Product


def _make_product(sku="RR-001", stock_quantity=10):
    product = Product(name="Restock Test Product", sku=sku, price=10, cost_price=5,
                       stock_quantity=stock_quantity, low_stock_threshold=5)
    db.session.add(product)
    db.session.commit()
    return product


def _sell_units(product, quantity, weeks_ago=0):
    order = Order(order_number=f"RR-ORD-{product.id}-{weeks_ago}", customer_name="Buyer",
                  total_amount=quantity * 10, status="delivered",
                  created_at=datetime.now(timezone.utc) - timedelta(weeks=weeks_ago, days=1))
    db.session.add(order)
    db.session.flush()
    db.session.add(OrderItem(order=order, product=product, quantity=quantity, unit_price=10))
    db.session.commit()


def test_no_sales_history_never_recommended(app, client, admin_headers):
    product = _make_product(stock_quantity=0)
    assert compute_recommendation(product) is None


def test_sufficient_stock_not_recommended(app, client, admin_headers):
    product = _make_product(stock_quantity=1000)
    _sell_units(product, 5, weeks_ago=0)
    assert compute_recommendation(product) is None


def test_low_stock_with_sales_velocity_recommended(app, client, admin_headers):
    product = _make_product(stock_quantity=2)
    for week in range(4):
        _sell_units(product, 10, weeks_ago=week)

    rec = compute_recommendation(product)
    assert rec is not None
    assert rec["recommended_quantity"] > 0
    assert rec["product_name"] == "Restock Test Product"


def test_recommendations_endpoint_requires_auth(client):
    resp = client.get("/api/inventory/recommendations")
    assert resp.status_code == 401


def test_recommendations_endpoint_no_api_key_degrades_gracefully(client, admin_headers):
    product = _make_product(stock_quantity=2)
    for week in range(4):
        _sell_units(product, 10, weeks_ago=week)

    resp = client.get("/api/inventory/recommendations", headers=admin_headers)
    assert resp.status_code == 200
    data = resp.get_json()
    assert len(data["recommendations"]) == 1
    assert "GROQ_API_KEY" in data["summary"]


def test_recommendations_endpoint_empty_list_has_friendly_summary(client, admin_headers):
    resp = client.get("/api/inventory/recommendations", headers=admin_headers)
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["recommendations"] == []
    assert "No products" in data["summary"]


def test_generate_summary_empty_list_skips_groq_entirely():
    # Even with no API key configured, an empty list should short-circuit
    # to the friendly message without attempting any Groq call.
    assert generate_summary([]) == "No products currently need reordering based on recent sales velocity."
