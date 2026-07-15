from datetime import datetime, timezone

from app.extensions import db


class Supplier(db.Model):
    __tablename__ = "suppliers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(30), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    products = db.relationship("Product", back_populates="supplier")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email or "",
            "phone": self.phone or "",
            "created_at": self.created_at.isoformat(),
        }
