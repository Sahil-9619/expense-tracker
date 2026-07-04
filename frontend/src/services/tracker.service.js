import apiService from './api.service';

const jsonRequest = (method, data) => ({
    method,
    body: JSON.stringify(data),
});



export const getBudgets = () => apiService('/tracker/budgets/');
export const createBudget = (data) => apiService('/tracker/budgets/', jsonRequest('POST', data));
export const updateBudget = (id, data) => apiService(`/tracker/budgets/${id}/`, jsonRequest('PUT', data));
export const deleteBudget = (id) => apiService(`/tracker/budgets/${id}/`, { method: 'DELETE' });

export const getGoals = () => apiService('/tracker/goals/');
export const createGoal = (data) => apiService('/tracker/goals/', jsonRequest('POST', data));
export const updateGoal = (id, data) => apiService(`/tracker/goals/${id}/`, jsonRequest('PUT', data));
export const deleteGoal = (id) => apiService(`/tracker/goals/${id}/`, { method: 'DELETE' });

export const getReportFolders = () => apiService('/tracker/report-folders/');
export const getReports = () => apiService('/tracker/reports/');
export const createReport = (data = {}) => apiService('/tracker/reports/', jsonRequest('POST', data));
export const deleteReport = (id) => apiService(`/tracker/reports/${id}/`, { method: 'DELETE' });
