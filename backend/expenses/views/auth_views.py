import random

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password, make_password
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from expenses.serializers.user_serializer import UserSerializer, UserListSerializer
from expenses.models import User, AuthOTP
from expenses.services.google_oauth_service import verify_google_token, get_or_create_google_user


def generate_otp():
    return f'{random.SystemRandom().randint(100000, 999999)}'


def send_otp_email(email, otp, purpose):
    subject = 'Verify your Expense Tracker account'
    message = f'Your Expense Tracker signup verification code is {otp}. It expires in 10 minutes.'

    if purpose == AuthOTP.PASSWORD_RESET:
        subject = 'Reset your Expense Tracker password'
        message = f'Your Expense Tracker password reset code is {otp}. It expires in 10 minutes.'

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )


def create_and_send_otp(email, purpose):
    otp = generate_otp()
    AuthOTP.objects.filter(email=email, purpose=purpose, is_used=False).update(is_used=True)
    AuthOTP.objects.create(
        email=email,
        purpose=purpose,
        otp_hash=make_password(otp),
        expires_at=AuthOTP.expiry_time(),
    )
    send_otp_email(email, otp, purpose)


def get_valid_otp(email, purpose, otp):
    auth_otp = AuthOTP.objects.filter(email=email, purpose=purpose, is_used=False).first()

    if not auth_otp:
        return None, 'OTP not found or already used'

    if auth_otp.is_expired():
        auth_otp.is_used = True
        auth_otp.save(update_fields=['is_used'])
        return None, 'OTP expired. Please request a new code'

    if auth_otp.attempts >= 5:
        auth_otp.is_used = True
        auth_otp.save(update_fields=['is_used'])
        return None, 'Too many attempts. Please request a new code'

    if not check_password(otp, auth_otp.otp_hash):
        auth_otp.attempts += 1
        auth_otp.save(update_fields=['attempts'])
        return None, 'Invalid OTP'

    return auth_otp, None



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
    email = (request.data.get('email') or '').strip().lower()
    existing_user = User.objects.filter(email=email).first()

    if existing_user and existing_user.is_active:
        return Response({"email": ["Email already exists"]}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(existing_user, data=request.data) if existing_user else UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.is_active = False
        user.save(update_fields=['is_active'])
        create_and_send_otp(user.email, AuthOTP.SIGNUP)

        return Response(
            {
                "message": "Verification OTP sent to your email",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "is_active": user.is_active,
                }
            },
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_signup_otp(request):
    email = (request.data.get('email') or '').strip().lower()
    otp = (request.data.get('otp') or '').strip()

    if not email:
        return Response({"error": "Email required"}, status=400)

    if not otp:
        return Response({"error": "OTP required"}, status=400)

    auth_otp, error = get_valid_otp(email, AuthOTP.SIGNUP, otp)
    if error:
        return Response({"error": error}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    user.is_active = True
    user.save(update_fields=['is_active'])
    auth_otp.is_used = True
    auth_otp.save(update_fields=['is_used'])

    return Response({"message": "Email verified successfully. You can now login."})


@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = (request.data.get('email') or '').strip().lower()

    if not email:
        return Response({"error": "Email required"}, status=400)

    try:
        user = User.objects.get(email=email, is_active=True)
    except User.DoesNotExist:
        return Response({"error": "No active account found with this email"}, status=404)

    create_and_send_otp(user.email, AuthOTP.PASSWORD_RESET)
    return Response({"message": "Password reset OTP sent to your email"})


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    email = (request.data.get('email') or '').strip().lower()
    otp = (request.data.get('otp') or '').strip()
    password = request.data.get('password') or ''

    if not email:
        return Response({"error": "Email required"}, status=400)

    if not otp:
        return Response({"error": "OTP required"}, status=400)

    if len(password) < 6:
        return Response({"error": "Password must be at least 6 characters"}, status=400)

    auth_otp, error = get_valid_otp(email, AuthOTP.PASSWORD_RESET, otp)
    if error:
        return Response({"error": error}, status=400)

    try:
        user = User.objects.get(email=email, is_active=True)
    except User.DoesNotExist:
        return Response({"error": "No active account found with this email"}, status=404)

    user.set_password(password)
    user.save(update_fields=['password'])
    auth_otp.is_used = True
    auth_otp.save(update_fields=['is_used'])

    return Response({"message": "Password reset successful. You can now login."})

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

    inactive_user = User.objects.filter(email=email, is_active=False).first()
    if inactive_user and inactive_user.check_password(password):
        return Response({"error": "Please verify your email before logging in"}, status=400)

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


# GOOGLE SIGNUP/LOGIN ENDPOINT
google_signup_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    required=['token'],
    properties={
        'token': openapi.Schema(type=openapi.TYPE_STRING, description='Google ID Token'),
    }
)


@swagger_auto_schema(
    method='post',
    request_body=google_signup_schema,
    responses={
        200: openapi.Response("Google signup/login successful"),
        400: "Invalid token or error"
    }
)
@api_view(['POST'])
@permission_classes([AllowAny])
def google_signup(request):
    """
    Handle Google OAuth signup and login
    """
    token = request.data.get('token', '').strip()
    
    if not token:
        return Response({"error": "Google token is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if not settings.GOOGLE_CLIENT_ID:
        return Response(
            {"error": "Google OAuth is not configured on the server"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Verify the Google token
    idinfo, error = verify_google_token(token)
    if error:
        return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
    
    # Get or create user from Google token
    user, error = get_or_create_google_user(idinfo)
    if error:
        return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)
    
    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    
    return Response({
        "message": "Google authentication successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "is_active": user.is_active
        }
    }, status=status.HTTP_200_OK)
