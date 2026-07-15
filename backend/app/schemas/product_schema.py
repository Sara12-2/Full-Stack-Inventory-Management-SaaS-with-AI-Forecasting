from marshmallow import Schema, fields, validate


class ProductSchema(Schema):
    name = fields.String(required=True, validate=validate.Length(min=1, max=200))
    sku = fields.String(required=True, validate=validate.Length(min=1, max=64))
    category_id = fields.Integer(required=False, allow_none=True, load_default=None)
    supplier_id = fields.Integer(required=False, allow_none=True, load_default=None)
    price = fields.Decimal(required=True, places=2, as_string=False)
    cost_price = fields.Decimal(required=True, places=2, as_string=False)
    stock_quantity = fields.Integer(required=False, load_default=0, validate=validate.Range(min=0))
    low_stock_threshold = fields.Integer(required=False, load_default=10, validate=validate.Range(min=0))
    image_url = fields.String(required=False, allow_none=True, load_default=None)
    status = fields.String(required=False, validate=validate.OneOf(["active", "inactive"]), load_default="active")
