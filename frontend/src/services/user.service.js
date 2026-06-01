import apiService from './api.service';

export const updateUserProfile = (id, data) => {
    return apiService(`/users/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};
