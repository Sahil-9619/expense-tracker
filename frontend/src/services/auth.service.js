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

export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
};
