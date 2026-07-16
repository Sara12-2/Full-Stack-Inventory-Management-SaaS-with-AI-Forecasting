from app.extensions import db
from app.models import Category, Product, Supplier


def _make_product(**overrides):
    category = Category(name="Test Category")
    supplier = Supplier(name="Test Supplier")
    db.session.add_all([category, supplier])
    db.session.flush()
    defaults = dict(name="Test Product", sku="TST-001", category=category, supplier=supplier,
                     price=10, cost_price=5, stock_quantity=20, low_stock_threshold=5)
    defaults.update(overrides)
    product = Product(**defaults)
    db.session.add(product)
    db.session.commit()
    return product


def test_list_products_requires_auth(client):
    resp = client.get("/api/products")
    assert resp.status_code == 401


def test_list_products(client, admin_headers):
    _make_product()
    resp = client.get("/api/products", headers=admin_headers)
    assert resp.status_code == 200
    assert len(resp.get_json()) == 1


def test_create_product(client, admin_headers):
    resp = client.post("/api/products", headers=admin_headers, json={
        "name": "New Product", "sku": "NEW-001", "price": 9.99, "cost_price": 4,
    })
    assert resp.status_code == 201
    assert resp.get_json()["sku"] == "NEW-001"


def test_create_product_duplicate_sku_rejected(client, admin_headers):
    client.post("/api/products", headers=admin_headers, json={"name": "A", "sku": "DUP-001", "price": 1, "cost_price": 1})
    resp = client.post("/api/products", headers=admin_headers, json={"name": "B", "sku": "DUP-001", "price": 1, "cost_price": 1})
    assert resp.status_code == 409


def test_get_product_not_found(client, admin_headers):
    resp = client.get("/api/products/9999", headers=admin_headers)
    assert resp.status_code == 404


def test_delete_product_requires_admin(client, admin_headers, staff_headers):
    product = _make_product(sku="DEL-001")
    resp = client.delete(f"/api/products/{product.id}", headers=staff_headers)
    assert resp.status_code == 403

    resp = client.delete(f"/api/products/{product.id}", headers=admin_headers)
    assert resp.status_code == 200


def test_delete_product_with_order_history_rejected(client, admin_headers):
    product = _make_product(sku="HIST-001")
    client.post("/api/orders", headers=admin_headers, json={
        "customer_name": "Buyer", "items": [{"product_id": product.id, "quantity": 1}],
    })
    resp = client.delete(f"/api/products/{product.id}", headers=admin_headers)
    assert resp.status_code == 409
