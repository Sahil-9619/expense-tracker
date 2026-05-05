from expenses.models import User
from expenses.utils import hash_password, verify_password, generate_token


def register_user(data):
    #hash password
    data['password'] = hash_password(data['password'])

    user = User.objects.create(**data)
    return user


def login_user(email, password):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return None, "User not found"

    #verify password
    if not verify_password(password, user.password):
        return None, "Invalid password"
    #generate token
    token = generate_token(user)

    return token, user