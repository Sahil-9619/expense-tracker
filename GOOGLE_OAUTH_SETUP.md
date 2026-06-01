# Google OAuth Setup Guide

## Overview
This guide explains how to set up Google OAuth for the Expense Tracker application.

## Backend Setup

### 1. Environment Configuration
Create a `.env` file in the `backend/` directory (or update the existing one) with the following:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

### 2. Database Migration
Run the migration to add the `google_id` field to the User model:

```bash
cd backend
.\env\Scripts\python.exe manage.py migrate
```

### 3. API Endpoint
The Google OAuth endpoint is available at:
- **Endpoint**: `POST /api/auth/signup/google/`
- **Body**: `{ "token": "google_id_token" }`
- **Response**: 
  ```json
  {
    "message": "Google authentication successful",
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "User Name",
      "is_active": true
    }
  }
  ```

## Frontend Setup

### 1. Environment Configuration
Create a `.env` file in the `frontend/` directory with:

```bash
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

### 2. Dependencies
The following packages have been installed:
- `@react-oauth/google`: React component for Google OAuth

### 3. Features
- **Google Login Button**: Added to the Auth form (alongside GitHub button)
- **Automatic User Creation**: Users are automatically created on first Google login
- **Email Verification**: Google users skip email verification (auto-verified)
- **JWT Token**: Users receive JWT tokens for authentication

## Getting Your Google OAuth Credentials

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown and select "New Project"
3. Enter a project name (e.g., "Expense Tracker")
4. Click "Create"

### Step 2: Enable OAuth 2.0
1. Navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen first:
   - User Type: External
   - Fill in required fields (App name, User support email, etc.)
   - Add scopes: `email`, `profile`, `openid`

### Step 3: Create OAuth 2.0 Credentials
1. Choose "Web application"
2. Add Authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - `http://localhost:3000` (if using different port)
   - Your production domain
3. Add Authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - Your production domain
4. Click "Create"
5. Copy the **Client ID** from the popup

### Step 4: Configure Application
1. Copy the Client ID to your `.env` files:
   - Backend: `GOOGLE_CLIENT_ID=your_client_id`
   - Frontend: `VITE_GOOGLE_CLIENT_ID=your_client_id`

## How It Works

### Login Flow
1. User clicks the "Google" button on the login/signup page
2. Google OAuth popup appears
3. User selects or logs in with their Google account
4. Google returns an ID token to the frontend
5. Frontend sends the token to the backend: `POST /api/auth/signup/google/`
6. Backend verifies the token and creates/retrieves the user
7. Backend returns JWT tokens
8. Frontend stores tokens and redirects to dashboard

### Backend Validation
The backend:
1. Verifies the Google token signature and expiration
2. Validates the token audience matches the Client ID
3. Extracts user information (email, name, profile picture)
4. Creates a new user if they don't exist
5. Marks Google users as immediately active (no email verification needed)
6. Returns JWT tokens for session management

## Troubleshooting

### "Invalid token audience" error
- Ensure `GOOGLE_CLIENT_ID` in backend `.env` matches your actual Client ID
- Check that the frontend is using the same Client ID

### Google button not appearing
- Check that `VITE_GOOGLE_CLIENT_ID` is set in frontend `.env`
- Verify the Vite dev server has restarted after adding the env variable
- Check browser console for any errors

### "Google login failed" on frontend
- Check backend is running and accessible
- Verify the `/api/auth/signup/google/` endpoint is accessible
- Check CORS configuration in Django settings

### Token verification failed
- Ensure all dependencies are installed: `pip install google-auth-oauthlib google-auth-httplib2`
- Check that the `google_id` migration has been applied to the database
- Verify the Google Client ID is correct

## Security Notes
- Never commit `.env` files to version control
- Always use HTTPS in production
- Store Google Client Secret securely (only used server-side)
- Google users have `is_active=True` automatically (they've been verified by Google)
- Use secure cookies and HTTPS-only for production

## Additional Resources
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Library Documentation](https://github.com/react-oauth/react-oauth.google)
- [Django Google Auth Guide](https://developers.google.com/identity/gsi/web)
