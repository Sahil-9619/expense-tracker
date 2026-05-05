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
    user.delete()