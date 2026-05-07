from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from expenses.serializers.user_serializer import UserSerializer, UserListSerializer
from expenses.services.auth_service import register_user, login_user



#SIGNUP SWAGGER SCHEMA
@swagger_auto_schema(
    method='post',
    request_body=UserSerializer,
    responses={
        201: openapi.Response("User created"),
        400: "Bad Request"
    }
)
#SIGNUP 
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        return Response(
            {
                "message": "User registered successfully",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name
                }
            },
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#LOGIN SWAGGER SCHEMA
login_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['email', 'password'],
    properties={
        'email': openapi.Schema(type=openapi.TYPE_STRING),
        'password': openapi.Schema(type=openapi.TYPE_STRING),
    }
)

@swagger_auto_schema(
    method='post',
    request_body=login_schema,
    responses={
        200: openapi.Response("Login success"),
        400: "Invalid credentials"
    }
)
#LOGIN
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email:
        return Response({"error": "Email required"}, status=400)

    if not password:
        return Response({"error": "Password required"}, status=400)

    # 🔐 Authenticate user
    user = authenticate(username=email, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)

    # 🔥 Generate JWT tokens
    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    })

# GET USER PROFILE
@swagger_auto_schema(
    method='get',
    responses={
        200: UserListSerializer,
        401: "Unauthorized"
    }
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    serializer = UserListSerializer(request.user)
    return Response(serializer.data)