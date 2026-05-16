import apiService from './api.service';

export const loginUser = async (credentials) => {
    return apiService('/auth/login/', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

export const registerUser = async (userData) => {
    return apiService('/auth/signup/', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

export const verifySignupOtp = async (data) => {
    return apiService('/auth/signup/verify-otp/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const requestPasswordReset = async (data) => {
    return apiService('/auth/forgot-password/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const resetPassword = async (data) => {
    return apiService('/auth/reset-password/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const getUserProfile = async () => {
    return apiService('/auth/user/', {
        method: 'GET',
    });
};

export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
};
