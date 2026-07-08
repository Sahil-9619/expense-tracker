# Expense Tracker

A modern, full-stack personal finance and expense tracking application built with **React (Vite)** on the frontend and **Django** on the backend. It helps users manage their income, expenses, budgets, savings goals, and generate financial reports.

---

## 🚀 Features

- **Authentication & Security:** Secure user login with OTP verification and Google OAuth integration.
- **Transaction Management:** Log, categorize, and filter income and expenses. Track payment modes (Cash, UPI, Debit/Credit Card).
- **Budgeting:** Set category-specific budget limits with visual progress indicators.
- **Savings Goals:** Create and monitor goals with custom deadlines and progress tracking.
- **Interactive Analytics:** Visual insights and dashboards showing spending patterns and category distributions.
- **Report Management:** Organize generated financial reports into custom folders.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React with Vite
- **Styling:** Tailwind CSS (configured with a modern design theme)
- **State & Routing:** React Router DOM

### Backend
- **Framework:** Django & Django REST Framework (DRF)
- **Database:** SQLite (default/development) / PostgreSQL (production-ready)
- **Authentication:** Custom OTP and OAuth 2.0 (Google)

---

## 📁 Project Structure

```text
expense-tracker/
├── backend/               # Django backend application
│   ├── config/            # Django configuration settings, URLs, WSGI/ASGI
│   ├── expenses/          # Core Django app (models, views, serializers, urls)
│   └── manage.py          # Django management script
├── frontend/              # React frontend application
│   ├── src/               # React source files (components, pages, styles)
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies and scripts
│   └── vite.config.js     # Vite configuration
└── GOOGLE_OAUTH_SETUP.md  # Detailed setup guide for Google Authentication
```

---

## ⚙️ Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm

---

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   # Windows
   python -m venv env
   .\env\Scripts\activate

   # macOS/Linux
   python3 -m venv env
   source env/bin/activate
   ```

3. **Install dependencies:**
   *(Ensure you install django, djangorestframework, django-cors-headers, and any other packages listed in the project config.)*
   ```bash
   pip install django djangorestframework django-cors-headers django-allauth
   ```

4. **Environment Variables:**
   Create a `.env` file in the `backend` folder based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in the database configuration, secret key, and Google OAuth credentials.

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```
   The backend will be running at `http://127.0.0.1:8000/`.

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `frontend` folder based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Configure the API base URL (e.g., `VITE_API_URL=http://127.0.0.1:8000`).

4. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   The frontend will be running at `http://localhost:5173/`.

---

## 🔐 Google OAuth Configuration

For detailed instructions on configuring Google Authentication for this application, refer to the [Google OAuth Setup Guide](GOOGLE_OAUTH_SETUP.md).
