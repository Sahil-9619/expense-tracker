from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from expenses.views.auth_views import signup, login, get_user_profile

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('user/', get_user_profile),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]