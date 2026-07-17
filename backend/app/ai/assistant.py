from flask import current_app
from sqlalchemy import func

from app.extensions import db
from app.models import Order, OrderItem, Product

SYSTEM_PROMPT = (
    "You are StockFlow's inventory assistant. Answer the user's question using ONLY the "
    "inventory data provided below -- never invent numbers that aren't there. If the data "
    "doesn't contain what's needed to answer, say so plainly instead of guessing. Keep "
    "answers short (2-4 sentences) and concrete, referencing actual product names and "
    "numbers from the data."
)


def _gather_inventory_context():
    """A compact text summary of current inventory state to ground the LLM's answer."""
    products = Product.query.order_by(Product.name).all()
    low_stock = [p for p in products if p.stock_quantity <= p.low_stock_threshold]

    units_sold = func.coalesce(func.sum(OrderItem.quantity), 0)
    top_sellers = (
        db.session.query(Product.name, units_sold.label("units_sold"))
        .join(OrderItem, OrderItem.product_id == Product.id)
        .join(Order, Order.id == OrderItem.order_id)
        .filter(Order.status != "cancelled")
        .group_by(Product.id, Product.name)
        .order_by(units_sold.desc())
        .limit(5)
        .all()
    )

    lines = ["Current product catalog (name: stock in units, reorder threshold):"]
    for p in products:
        lines.append(f"- {p.name}: {p.stock_quantity} in stock (reorder threshold {p.low_stock_threshold})")

    lines.append("\nProducts currently at or below their reorder threshold:")
    if low_stock:
        for p in low_stock:
            lines.append(f"- {p.name}: {p.stock_quantity} left (threshold {p.low_stock_threshold})")
    else:
        lines.append("- None currently.")

    lines.append("\nTop-selling products (all-time units sold, cancelled orders excluded):")
    if top_sellers:
        for name, units in top_sellers:
            lines.append(f"- {name}: {units} units sold")
    else:
        lines.append("- No completed sales yet.")

    return "\n".join(lines)


def ask_assistant(question, history=None):
    """A natural-language answer grounded in real inventory data.

    Degrades gracefully (never raises) if no API key is configured or the
    call fails -- callers always get a string back, never an exception.
    """
    api_key = current_app.config.get("GROQ_API_KEY")
    if not api_key:
        return "The AI assistant isn't configured yet — set GROQ_API_KEY to enable it."

    try:
        from groq import Groq

        client = Groq(api_key=api_key)

        # Keep the last few turns only -- enough for follow-up questions
        # without letting the prompt grow unbounded over a long session.
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for turn in (history or [])[-6:]:
            role = "user" if turn.get("role") == "user" else "assistant"
            messages.append({"role": role, "content": turn.get("content", "")})
        messages.append(
            {
                "role": "user",
                "content": f"Inventory data:\n{_gather_inventory_context()}\n\nQuestion: {question}",
            }
        )

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile", messages=messages, temperature=0.3
        )
        return response.choices[0].message.content.strip()
    except Exception as exc:
        current_app.logger.warning("Groq assistant call failed: %s", exc)
        return "I couldn't reach the AI service just now. Please try again in a moment."
