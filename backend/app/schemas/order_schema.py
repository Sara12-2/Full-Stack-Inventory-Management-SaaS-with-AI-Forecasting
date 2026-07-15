from marshmallow import Schema, fields, validate

from app.models.order import ORDER_STATUSES


class OrderItemInputSchema(Schema):
    product_id = fields.Integer(required=True)
    quantity = fields.Integer(required=True, validate=validate.Range(min=1))


class OrderCreateSchema(Schema):
    customer_name = fields.String(required=True, validate=validate.Length(min=1, max=120))
    customer_email = fields.Email(required=False, allow_none=True, load_default=None)
    customer_phone = fields.String(required=False, allow_none=True, load_default="")
    items = fields.List(fields.Nested(OrderItemInputSchema), required=True, validate=validate.Length(min=1))


class OrderStatusSchema(Schema):
    status = fields.String(required=True, validate=validate.OneOf(ORDER_STATUSES))
