import math

from flask import current_app

from app.ai.forecasting import get_weekly_sales
from app.models import Product

# How many weeks of stock coverage to target: time to receive a new order,
# plus a safety margin in case demand ticks up before it arrives.
LEAD_TIME_WEEKS = 2
SAFETY_STOCK_WEEKS = 1
COVERAGE_WEEKS = LEAD_TIME_WEEKS + SAFETY_STOCK_WEEKS


def _average_weekly_sales(product_id, weeks=8):
    history = get_weekly_sales(product_id, weeks=weeks)
    if not history:
        return 0.0
    return sum(h["units_sold"] for h in history) / len(history)


def compute_recommendation(product):
    """None if the product doesn't need reordering right now, else a dict
    with the recommended quantity and the numbers behind it.

    Demand-driven, not just threshold-based: a product only shows up here
    if its actual recent sales velocity suggests it will run out within the
    coverage window -- a product with zero sales history never triggers a
    false-positive recommendation just for sitting below low_stock_threshold
    (that's what the existing low-stock badge is for).
    """
    avg_weekly_sales = _average_weekly_sales(product.id)
    projected_need = avg_weekly_sales * COVERAGE_WEEKS

    if product.stock_quantity >= projected_need:
        return None

    recommended_qty = math.ceil(projected_need - product.stock_quantity)
    if recommended_qty <= 0:
        return None

    return {
        "product_id": product.id,
        "product_name": product.name,
        "current_stock": product.stock_quantity,
        "avg_weekly_sales": round(avg_weekly_sales, 1),
        "coverage_weeks": COVERAGE_WEEKS,
        "recommended_quantity": recommended_qty,
    }


def get_all_recommendations():
    products = Product.query.order_by(Product.name).all()
    recommendations = [compute_recommendation(p) for p in products]
    return [r for r in recommendations if r is not None]


def generate_summary(recommendations):
    """A short Groq-generated prioritization across the whole list -- one
    call regardless of list size, not one per product. Degrades gracefully
    (never raises) if no API key is configured or the call fails.
    """
    if not recommendations:
        return "No products currently need reordering based on recent sales velocity."

    api_key = current_app.config.get("GROQ_API_KEY")
    if not api_key:
        return "AI summary unavailable — set GROQ_API_KEY to enable prioritized recommendations."

    try:
        from groq import Groq

        client = Groq(api_key=api_key)

        lines = [
            f"{r['product_name']}: {r['current_stock']} in stock, selling ~{r['avg_weekly_sales']}/week, "
            f"recommend reordering {r['recommended_quantity']} units"
            for r in recommendations
        ]
        prompt = (
            "You are an inventory analyst. Given this list of products at risk of stocking out:\n"
            + "\n".join(lines)
            + "\n\nIn 2-3 sentences, summarize the overall situation and call out the single "
            "highest-priority item to reorder first, with a concrete reason from the numbers."
        )
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )
        return response.choices[0].message.content.strip()
    except Exception as exc:
        current_app.logger.warning("Groq restock summary failed: %s", exc)
        return "AI summary temporarily unavailable. Recommended quantities above are still accurate."
