from django.urls import path
from expenses.views.expense_views import expense_list, expense_detail

urlpatterns = [
    path('', expense_list),            
    path('<int:id>/', expense_detail), 
]