from app.extensions import db
from app.models import Product


def test_chat_requires_auth(client):
    resp = client.post("/api/ai/chat", json={"message": "Which products need restocking?"})
    assert resp.status_code == 401


def test_chat_empty_message_rejected(client, admin_headers):
    resp = client.post("/api/ai/chat", headers=admin_headers, json={"message": ""})
    assert resp.status_code == 400


def test_chat_missing_message_rejected(client, admin_headers):
    resp = client.post("/api/ai/chat", headers=admin_headers, json={})
    assert resp.status_code == 400


def test_chat_no_api_key_degrades_gracefully(client, admin_headers):
    # Test env has no GEMINI_API_KEY -- must still return 200 with a clear
    # placeholder reply instead of crashing or hanging trying to reach Gemini.
    resp = client.post("/api/ai/chat", headers=admin_headers, json={"message": "Which products need restocking?"})
    assert resp.status_code == 200
    data = resp.get_json()
    assert "GEMINI_API_KEY" in data["reply"]


def test_chat_accepts_conversation_history(client, admin_headers):
    resp = client.post("/api/ai/chat", headers=admin_headers, json={
        "message": "And what about the second one?",
        "history": [
            {"role": "user", "content": "What are my top 3 products?"},
            {"role": "assistant", "content": "Your top sellers are A, B, and C."},
        ],
    })
    assert resp.status_code == 200


def test_chat_invalid_history_role_rejected(client, admin_headers):
    resp = client.post("/api/ai/chat", headers=admin_headers, json={
        "message": "Hello",
        "history": [{"role": "system", "content": "not a valid role"}],
    })
    assert resp.status_code == 400


def test_gather_inventory_context_includes_low_stock(app, client, admin_headers):
    from app.ai.assistant import _gather_inventory_context

    product = Product(name="Almost Out Widget", sku="LOW-001", price=5, cost_price=2,
                       stock_quantity=1, low_stock_threshold=10)
    db.session.add(product)
    db.session.commit()

    context = _gather_inventory_context()
    assert "Almost Out Widget" in context
    assert "1 left" in context
