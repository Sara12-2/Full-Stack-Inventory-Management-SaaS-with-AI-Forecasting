from app.extensions import db
from app.models import Product


def _make_product(sku="ORD-TST-001", stock_quantity=10, low_stock_threshold=5, price=10):
    product = Product(name="Order Test Product", sku=sku, price=price, cost_price=5,
                       stock_quantity=stock_quantity, low_stock_threshold=low_stock_threshold)
    db.session.add(product)
    db.session.commit()
    return product


def test_create_order_deducts_stock(client, admin_headers):
    product = _make_product(stock_quantity=10)

    resp = client.post("/api/orders", headers=admin_headers, json={
        "customer_name": "Test Customer", "customer_email": "cust@test.com", "customer_phone": "555",
        "items": [{"product_id": product.id, "quantity": 3}],
    })
    assert resp.status_code == 201
    assert resp.get_json()["total_amount"] == 30.0

    product_resp = client.get(f"/api/products/{product.id}", headers=admin_headers)
    assert product_resp.get_json()["stock_quantity"] == 7


def test_create_order_insufficient_stock_rejected(client, admin_headers):
    product = _make_product(stock_quantity=2)

    resp = client.post("/api/orders", headers=admin_headers, json={
        "customer_name": "Test Customer", "items": [{"product_id": product.id, "quantity": 5}],
    })
    assert resp.status_code == 400


def test_cancel_order_restores_stock(client, admin_headers):
    product = _make_product(stock_quantity=10)

    order_resp = client.post("/api/orders", headers=admin_headers, json={
        "customer_name": "Test Customer", "items": [{"product_id": product.id, "quantity": 4}],
    })
    order_id = order_resp.get_json()["id"]

    status_resp = client.put(f"/api/orders/{order_id}/status", headers=admin_headers, json={"status": "cancelled"})
    assert status_resp.status_code == 200

    product_resp = client.get(f"/api/products/{product.id}", headers=admin_headers)
    assert product_resp.get_json()["stock_quantity"] == 10


def test_update_order_status_invalid_value_rejected(client, admin_headers):
    product = _make_product()
    order_resp = client.post("/api/orders", headers=admin_headers, json={
        "customer_name": "Test Customer", "items": [{"product_id": product.id, "quantity": 1}],
    })
    order_id = order_resp.get_json()["id"]
    resp = client.put(f"/api/orders/{order_id}/status", headers=admin_headers, json={"status": "not-a-real-status"})
    assert resp.status_code == 400


def test_customer_auto_created_and_reused_by_email(client, admin_headers):
    product = _make_product(stock_quantity=10)
    payload = {
        "customer_name": "Repeat Customer", "customer_email": "repeat@test.com",
        "items": [{"product_id": product.id, "quantity": 1}],
    }
    client.post("/api/orders", headers=admin_headers, json=payload)
    client.post("/api/orders", headers=admin_headers, json=payload)

    customers = client.get("/api/customers", headers=admin_headers).get_json()
    matching = [c for c in customers if c["email"] == "repeat@test.com"]
    assert len(matching) == 1
    assert matching[0]["total_orders"] == 2
