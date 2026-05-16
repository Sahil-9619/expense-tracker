from django.http import JsonResponse
from expenses.utils import decode_token
from expenses.models import User
from jwt import ExpiredSignatureError, InvalidTokenError


class JWTAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        #Public routes
        public_paths = [
            '/api/auth/signup/',
            '/api/auth/signup/verify-otp/',
            '/api/auth/login/',
            '/api/auth/forgot-password/',
            '/api/auth/reset-password/',
            '/api/auth/token/refresh/',
        ]

        # Normalize path (remove trailing slash issues)
        path = request.path.rstrip('/')

        if path in [p.rstrip('/') for p in public_paths]:
            return self.get_response(request)

        #Protect API routes
        if request.path.startswith('/api/'):

            auth_header = request.headers.get('Authorization')

            if not auth_header:
                return JsonResponse(
                    {"error": "Authorization token required"},
                    status=401
                )

            #Validate Bearer format
            parts = auth_header.split()

            if len(parts) != 2 or parts[0] != "Bearer":
                return JsonResponse(
                    {"error": "Invalid Authorization header format"},
                    status=401
                )

            token = parts[1]

            try:
                payload = decode_token(token)

                user = User.objects.get(id=payload['id'])

                # Attach user to request
                request.user = user

            except ExpiredSignatureError:
                return JsonResponse(
                    {"error": "Token expired"},
                    status=401
                )

            except InvalidTokenError:
                return JsonResponse(
                    {"error": "Invalid token"},
                    status=401
                )

            except User.DoesNotExist:
                return JsonResponse(
                    {"error": "User not found"},
                    status=404
                )

        return self.get_response(request)
