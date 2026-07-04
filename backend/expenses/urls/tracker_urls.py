from django.urls import path
from expenses.views.tracker_views import (
    budget_detail,
    budget_list,
    goal_detail,
    goal_list,
    report_detail,
    report_folder_list,
    report_list,
)

urlpatterns = [
    path('budgets/', budget_list),
    path('budgets/<int:id>/', budget_detail),
    path('goals/', goal_list),
    path('goals/<int:id>/', goal_detail),
    path('report-folders/', report_folder_list),
    path('reports/', report_list),
    path('reports/<int:id>/', report_detail),
]
