from datetime import datetime, timedelta, timezone

from app.ai.forecasting import linear_forecast
from app.extensions import db
from app.models import Customer, Order, OrderItem, Product


def test_linear_forecast_empty_history():
    assert linear_forecast([], periods_ahead=4) == [0.0, 0.0, 0.0, 0.0]


def test_linear_forecast_single_point_flat():
    history = [{"week_start": "2026-01-01", "units_sold": 5}]
    assert linear_forecast(history, periods_ahead=3) == [5.0, 5.0, 5.0]


def test_linear_forecast_upward_trend():
    history = [{"units_sold": v} for v in [2, 4, 6, 8, 10]]
    forecast = linear_forecast(history, periods_ahead=2)
    # Trend is +2/week, so weeks 6 and 7 should continue near 12, 14.
    assert forecast[0] > 10
    assert forecast[1] > forecast[0]


def test_linear_forecast_never_negative():
    history = [{"units_sold": v} for v in [10, 8, 6, 4, 2]]
    forecast = linear_forecast(history, periods_ahead=6)
    assert all(v >= 0 for v in forecast)


def _make_product(sku="FC-001"):
    product = Product(name="Forecast Test Product", sku=sku, price=10, cost_price=5,
                       stock_quantity=100, low_stock_threshold=5)
    db.session.add(product)
    db.session.commit()
    return product


def test_forecast_endpoint_requires_auth(client):
    product = _make_product()
    resp = client.get(f"/api/products/{product.id}/forecast")
    assert resp.status_code == 401


def test_forecast_endpoint_not_found(client, admin_headers):
    resp = client.get("/api/products/9999/forecast", headers=admin_headers)
    assert resp.status_code == 404


def test_forecast_endpoint_no_api_key_degrades_gracefully(client, admin_headers):
    # Test env has no GEMINI_API_KEY configured -- the endpoint must still
    # return a real numeric forecast, with a clear placeholder insight
    # instead of crashing or hanging trying to reach Gemini.
    product = _make_product()
    resp = client.get(f"/api/products/{product.id}/forecast", headers=admin_headers)
    assert resp.status_code == 200
    data = resp.get_json()
    assert len(data["history"]) == 8
    assert len(data["forecast"]) == 4
    assert "GEMINI_API_KEY" in data["insight"]


def test_forecast_reflects_real_order_history(client, admin_headers):
    product = _make_product(sku="FC-002")
    customer = Customer(name="Forecast Buyer", email="fc@test.com")
    db.session.add(customer)
    db.session.flush()

    now = datetime.now(timezone.utc)
    order = Order(order_number="FC-ORD-1", customer=customer, customer_name=customer.name,
                   total_amount=50, status="delivered", created_at=now - timedelta(days=3))
    db.session.add(order)
    db.session.flush()
    db.session.add(OrderItem(order=order, product=product, quantity=5, unit_price=10))
    db.session.commit()

    resp = client.get(f"/api/products/{product.id}/forecast", headers=admin_headers)
    data = resp.get_json()
    total_units_in_history = sum(h["units_sold"] for h in data["history"])
    assert total_units_in_history == 5


def test_forecast_excludes_cancelled_orders(client, admin_headers):
    product = _make_product(sku="FC-003")
    order = Order(order_number="FC-ORD-2", customer_name="Cancelled Buyer",
                   total_amount=50, status="cancelled", created_at=datetime.now(timezone.utc))
    db.session.add(order)
    db.session.flush()
    db.session.add(OrderItem(order=order, product=product, quantity=99, unit_price=10))
    db.session.commit()

    resp = client.get(f"/api/products/{product.id}/forecast", headers=admin_headers)
    data = resp.get_json()
    total_units_in_history = sum(h["units_sold"] for h in data["history"])
    assert total_units_in_history == 0
