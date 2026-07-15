from datetime import datetime, timezone

from app.extensions import db

MOVEMENT_TYPES = ("in", "out", "adjustment")


class StockMovement(db.Model):
    __tablename__ = "stock_movements"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    movement_type = db.Column(db.Enum(*MOVEMENT_TYPES, name="movement_type"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    reason = db.Column(db.String(255), nullable=True, default="")
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    product = db.relationship("Product", back_populates="stock_movements")
    created_by_user = db.relationship("User", back_populates="stock_movements")

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "movement_type": self.movement_type,
            "quantity": self.quantity,
            "reason": self.reason or "",
            "created_by": self.created_by,
            "created_by_name": self.created_by_user.name if self.created_by_user else None,
            "created_at": self.created_at.isoformat(),
        }
