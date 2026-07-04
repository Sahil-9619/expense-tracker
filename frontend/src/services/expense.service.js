import apiService from './api.service';

export const getExpenses = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `/expenses/${query ? `?${query}` : ''}`;
    return apiService(url);
};

export const createExpense = async (data) => {
    return apiService('/expenses/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const deleteExpense = async (id) => {
    return apiService(`/expenses/${id}/`, {
        method: 'DELETE',
    });
};

export const updateExpense = async (id, data) => {
    return apiService(`/expenses/${id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};
