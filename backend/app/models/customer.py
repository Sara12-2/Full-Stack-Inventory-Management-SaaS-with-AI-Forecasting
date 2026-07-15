from datetime import datetime, timezone

from app.extensions import db


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(255), nullable=True, index=True)
    phone = db.Column(db.String(30), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    orders = db.relationship("Order", back_populates="customer")

    @property
    def total_orders(self):
        return len(self.orders)

    @property
    def total_spent(self):
        return float(sum((order.total_amount or 0) for order in self.orders))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email or "",
            "phone": self.phone or "",
            "total_orders": self.total_orders,
            "total_spent": self.total_spent,
            "created_at": self.created_at.isoformat(),
        }
