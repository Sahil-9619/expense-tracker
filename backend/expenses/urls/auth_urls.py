from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from expenses.views.auth_views import (
    forgot_password,
    get_user_profile,
    login,
    reset_password,
    signup,
    verify_signup_otp,
    google_signup,
)

urlpatterns = [
    path('signup/', signup),
    path('signup/verify-otp/', verify_signup_otp),
    path('signup/google/', google_signup),
    path('login/', login),
    path('forgot-password/', forgot_password),
    path('reset-password/', reset_password),
    path('user/', get_user_profile),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
