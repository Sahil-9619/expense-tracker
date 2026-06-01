from django.contrib import admin
from django.urls import path, include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="Expense Tracker API",
        default_version='v1',
        description="API documentation for Expense Tracker",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/auth/', include('expenses.urls.auth_urls')),
    path('api/users/', include('expenses.urls.user_urls')),
    path('api/expenses/', include('expenses.urls.expense_urls')),
    path('api/tracker/', include('expenses.urls.tracker_urls')),

    #Swagger routes
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0)),
]
