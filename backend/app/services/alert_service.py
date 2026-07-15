from app.extensions import db, socketio
from app.models import Notification
from app.sockets.alerts import ALERTS_ROOM


def _persist_and_emit(event_name, notif_type, message, payload):
    notification = Notification(type=notif_type, message=message)
    db.session.add(notification)
    db.session.commit()
    socketio.emit(event_name, {**payload, "notification": notification.to_dict()}, to=ALERTS_ROOM)


def emit_low_stock_alert(product):
    message = f"{product.name} is low on stock ({product.stock_quantity} left)."
    _persist_and_emit(
        "low_stock_alert",
        "low_stock",
        message,
        {"product_id": product.id, "product_name": product.name, "stock_quantity": product.stock_quantity},
    )


def emit_new_order_alert(order):
    message = f"New order {order.order_number} from {order.customer_name} (${order.total_amount})."
    _persist_and_emit(
        "new_order_alert",
        "new_order",
        message,
        {
            "order_id": order.id,
            "order_number": order.order_number,
            "customer_name": order.customer_name,
            "total_amount": float(order.total_amount),
        },
    )
