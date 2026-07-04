import uuid

from expenses.models import User


def get_all_users():
    return User.objects.all()


def get_user_by_id(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None


def update_user(user, data):
    for key, value in data.items():
        setattr(user, key, value)

    user.save()
    return user


def delete_user(user):
    anonymized_email = f"deleted-{user.id}-{uuid.uuid4().hex[:8]}@deleted.expense"
    user.email = anonymized_email
    user.google_id = None
    user.is_active = False
    user.save(update_fields=['email', 'google_id', 'is_active'])