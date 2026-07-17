from datetime import datetime, timedelta, timezone

from flask import current_app
from sqlalchemy import func

from app.extensions import db
from app.models import Order, OrderItem


def get_weekly_sales(product_id, weeks=8):
    """Units sold per week for the last `weeks` weeks, oldest first.

    Cancelled orders are excluded (they were never a completed sale), same
    rule as the dashboard's top-products aggregation.
    """
    now = datetime.now(timezone.utc)
    history = []
    for i in range(weeks - 1, -1, -1):
        week_end = now - timedelta(weeks=i)
        week_start = week_end - timedelta(weeks=1)
        units = (
            db.session.query(func.coalesce(func.sum(OrderItem.quantity), 0))
            .join(Order, Order.id == OrderItem.order_id)
            .filter(
                OrderItem.product_id == product_id,
                Order.status != "cancelled",
                Order.created_at >= week_start,
                Order.created_at < week_end,
            )
            .scalar()
        )
        history.append({"week_start": week_start.date().isoformat(), "units_sold": int(units or 0)})
    return history


def linear_forecast(history, periods_ahead=4):
    """Least-squares linear trend extrapolated `periods_ahead` weeks forward.

    Deliberately a plain statistical calculation, not an LLM call -- asking
    a language model to compute a time series is unreliable and prone to
    making up numbers. Groq is used only for the narrative insight in
    generate_insight(), never for the numbers themselves.
    """
    n = len(history)
    ys = [h["units_sold"] for h in history]

    if n == 0:
        return [0.0] * periods_ahead
    if n < 2:
        return [float(ys[0])] * periods_ahead

    xs = list(range(n))
    x_mean = sum(xs) / n
    y_mean = sum(ys) / n
    numerator = sum((xs[i] - x_mean) * (ys[i] - y_mean) for i in range(n))
    denominator = sum((xs[i] - x_mean) ** 2 for i in range(n)) or 1
    slope = numerator / denominator
    intercept = y_mean - slope * x_mean

    return [max(0.0, round(slope * (n + i) + intercept, 1)) for i in range(periods_ahead)]


def generate_insight(product_name, history, forecast):
    """A short Groq-generated narrative recommendation. Degrades gracefully
    (never raises) if no API key is configured or the call fails -- the
    numeric forecast above is unaffected either way.
    """
    api_key = current_app.config.get("GROQ_API_KEY")
    if not api_key:
        return "AI insight unavailable — set GROQ_API_KEY to enable narrative recommendations."

    try:
        from groq import Groq

        client = Groq(api_key=api_key)

        history_units = [h["units_sold"] for h in history]
        prompt = (
            f'You are an inventory analyst. Given weekly sales history and a forecast for "{product_name}":\n'
            f"History (units/week, oldest first): {history_units}\n"
            f"Forecast (units/week, next {len(forecast)} weeks): {forecast}\n\n"
            "In 2-3 short sentences, describe the trend and give one concrete restocking "
            "recommendation. Be concise and specific to the numbers given."
        )
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )
        return response.choices[0].message.content.strip()
    except Exception as exc:
        current_app.logger.warning("Groq forecast insight failed: %s", exc)
        return "AI insight temporarily unavailable. Numeric forecast is still accurate."
