from google.auth.transport import requests
from google.oauth2 import id_token
from django.conf import settings
from expenses.models import User
from expenses.services.user_service import delete_user
import logging

logger = logging.getLogger(__name__)


def verify_google_token(token):
    """
    Verify Google ID token and return decoded token payload
    """
    try:
        # Verify the token
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=60
        )
        
        # Check if token is for the correct app
        if idinfo['aud'] != settings.GOOGLE_CLIENT_ID:
            logger.warning(f"Invalid audience: {idinfo['aud']}")
            return None, "Invalid token audience"
        
        return idinfo, None
    except Exception as e:
        logger.error(f"Token verification failed: {str(e)}")
        return None, "Google authentication failed. Please try again or check your connection."


def get_or_create_google_user(idinfo, action='login'):
    """
    Get or create a user from Google token info
    Returns user object or error message
    """
    try:
        email = idinfo.get('email', '').lower()
        google_id = str(idinfo.get('sub', ''))  # Google's unique user ID
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        picture_url = idinfo.get('picture', '')
        
        if not email:
            return None, "Email not provided by Google"
        
        if not google_id:
            return None, "Google ID not provided"
        
        # Try to get existing user by email or google_id
        user = User.objects.filter(email=email).first()
        
        if user:
            if action == 'signup':
                if user.is_active:
                    return None, "User already exists. Please log in."
                delete_user(user)
                user = None

            else:
                if not user.is_active:
                    return None, "Account inactive. Please sign up again."
                # Update google_id if not set
                if not user.google_id:
                    user.google_id = google_id
                user.save(update_fields=['google_id', 'is_active'])
                return user, None
        
        if action == 'login':
            return None, "User does not exist. Please sign up first."
        
        # Create new user
        full_name = f"{first_name} {last_name}".strip() or email.split('@')[0]
        
        user = User(
            email=email,
            name=full_name,
            google_id=google_id,
            is_active=True  # Google users are immediately active
        )
        # Google users don't have password
        user.set_unusable_password()
        user.save()
        
        logger.info(f"New Google user created: {email}")
        return user, None
        
    except Exception as e:
        logger.error(f"Error creating/retrieving user: {str(e)}")
        return None, "An error occurred while setting up your account. Please try again."
