def first_error(messages):
    """Flatten a marshmallow ValidationError.messages dict into one readable string."""
    for field_errors in messages.values():
        if isinstance(field_errors, list) and field_errors:
            return field_errors[0]
        if isinstance(field_errors, dict):
            nested = first_error(field_errors)
            if nested:
                return nested
    return "Invalid input."
