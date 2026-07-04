import apiService from './api.service';

export const updateUserProfile = (id, data) => {
    return apiService(`/users/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const changeUserPassword = (id, data) => {
    return apiService(`/users/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};

export const deactivateUser = (id) => {
    return apiService(`/users/${id}/`, {
        method: 'DELETE',
    });
};
