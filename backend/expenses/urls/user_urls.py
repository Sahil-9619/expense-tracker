from django.urls import path
from expenses.views.user_views import user_list, user_detail

urlpatterns = [
    path('', user_list),           
    path('<int:id>/', user_detail), 
]