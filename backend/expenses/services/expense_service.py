from expenses.models import Expense


def get_all_expenses():
    return Expense.objects.all()


def get_expense_by_id(expense_id):
    try:
        return Expense.objects.get(id=expense_id)
    except Expense.DoesNotExist:
        return None


def create_expense(data):
    return Expense.objects.create(**data)


def update_expense(expense, data):
    for key, value in data.items():
        setattr(expense, key, value)

    expense.save()
    return expense


def delete_expense(expense):
    expense.delete()