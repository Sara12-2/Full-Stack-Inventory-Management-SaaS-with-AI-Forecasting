from marshmallow import Schema, fields, validate


class CategorySchema(Schema):
    name = fields.String(required=True, validate=validate.Length(min=1, max=120))
    description = fields.String(required=False, allow_none=True, load_default="")
