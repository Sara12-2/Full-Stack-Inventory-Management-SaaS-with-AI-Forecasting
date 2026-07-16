from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import Schema, ValidationError, fields, validate

from app.ai.assistant import ask_assistant
from app.utils.errors import first_error

ai_bp = Blueprint("ai", __name__)


class ChatMessageSchema(Schema):
    role = fields.String(required=True, validate=validate.OneOf(["user", "assistant"]))
    content = fields.String(required=True)


class ChatRequestSchema(Schema):
    message = fields.String(required=True, validate=validate.Length(min=1, max=2000))
    history = fields.List(fields.Nested(ChatMessageSchema), required=False, load_default=[])


chat_schema = ChatRequestSchema()


@ai_bp.post("/chat")
@jwt_required()
def chat():
    try:
        payload = chat_schema.load(request.get_json(silent=True) or {})
    except ValidationError as err:
        return jsonify(error=first_error(err.messages)), 400

    reply = ask_assistant(payload["message"], payload.get("history"))
    return jsonify(reply=reply), 200
