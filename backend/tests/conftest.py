import pytest
from werkzeug.security import generate_password_hash

from app import create_app
from app.extensions import db as _db
from app.models import User


@pytest.fixture
def app():
    flask_app = create_app("testing")
    with flask_app.app_context():
        _db.create_all()
        yield flask_app
        _db.session.remove()
        _db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


def _login(client, email, role):
    user = User(name=role.capitalize(), email=email, role=role,
                password_hash=generate_password_hash("password123"))
    _db.session.add(user)
    _db.session.commit()
    resp = client.post("/api/auth/login", json={"email": email, "password": "password123"})
    token = resp.get_json()["token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def admin_headers(client):
    return _login(client, "admin@fixture.test", "admin")


@pytest.fixture
def staff_headers(client):
    return _login(client, "staff@fixture.test", "staff")
