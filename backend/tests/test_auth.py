def test_signup_creates_staff_user(client):
    resp = client.post("/api/auth/signup", json={"name": "New User", "email": "new@test.com", "password": "password123"})
    assert resp.status_code == 201
    data = resp.get_json()
    assert data["user"]["role"] == "staff"
    assert "token" in data


def test_signup_duplicate_email_rejected(client):
    client.post("/api/auth/signup", json={"name": "A", "email": "dup@test.com", "password": "password123"})
    resp = client.post("/api/auth/signup", json={"name": "B", "email": "dup@test.com", "password": "password123"})
    assert resp.status_code == 409


def test_signup_weak_password_rejected(client):
    resp = client.post("/api/auth/signup", json={"name": "A", "email": "weak@test.com", "password": "123"})
    assert resp.status_code == 400


def test_login_success(client):
    client.post("/api/auth/signup", json={"name": "A", "email": "login@test.com", "password": "password123"})
    resp = client.post("/api/auth/login", json={"email": "login@test.com", "password": "password123"})
    assert resp.status_code == 200
    assert "token" in resp.get_json()


def test_login_wrong_password_rejected(client):
    client.post("/api/auth/signup", json={"name": "A", "email": "wrong@test.com", "password": "password123"})
    resp = client.post("/api/auth/login", json={"email": "wrong@test.com", "password": "incorrect"})
    assert resp.status_code == 401


def test_me_requires_token(client):
    resp = client.get("/api/auth/me")
    assert resp.status_code == 401


def test_me_returns_current_user(client):
    client.post("/api/auth/signup", json={"name": "Me User", "email": "me@test.com", "password": "password123"})
    login_resp = client.post("/api/auth/login", json={"email": "me@test.com", "password": "password123"})
    token = login_resp.get_json()["token"]
    resp = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    assert resp.get_json()["email"] == "me@test.com"
