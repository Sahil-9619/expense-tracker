import os
import django
import sys

# Setup django environment
sys.path.append('d:/expense-tracker/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.test import RequestFactory
from django.contrib.auth import get_user_model
from expenses.views.expense_views import expense_list
from expenses.views.tracker_views import budget_list, goal_list, report_folder_list, report_list

User = get_user_model()

def test_views():
    # Create or get a test user
    user, created = User.objects.get_or_create(email='testuser@example.com', name='Test User')
    if created:
        user.set_password('password123')
        user.save()

    factory = RequestFactory()
    
    endpoints = [
        ('/api/expenses/', expense_list),
        ('/api/tracker/budgets/', budget_list),
        ('/api/tracker/goals/', goal_list),
        ('/api/tracker/report-folders/', report_folder_list),
        ('/api/tracker/reports/', report_list),
    ]
    
    for path, view_func in endpoints:
        print(f"Testing {path}...")
        request = factory.get(path)
        request.user = user
        try:
            response = view_func(request)
            print(f"Response Status: {response.status_code}")
            if response.status_code != 200:
                print(f"Error data: {response.data}")
        except Exception as e:
            import traceback
            print(f"FAILED with exception:")
            traceback.print_exc()
            print("-" * 50)

if __name__ == '__main__':
    test_views()
