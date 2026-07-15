from marshmallow import Schema, fields, validate


class SupplierSchema(Schema):
    name = fields.String(required=True, validate=validate.Length(min=1, max=120))
    email = fields.Email(required=False, allow_none=True, load_default=None)
    phone = fields.String(required=False, allow_none=True, load_default="")
