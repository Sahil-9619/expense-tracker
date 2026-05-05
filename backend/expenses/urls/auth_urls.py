from django.urls import path
from expenses.views.auth_views import signup, login

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
]