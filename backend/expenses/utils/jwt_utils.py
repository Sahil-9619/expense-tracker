import jwt
from datetime import datetime, timedelta
from django.conf import settings


SECRET_KEY = settings.SECRET_KEY


def generate_token(user):
    payload = {
        "id": user.id,
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def decode_token(token):
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])