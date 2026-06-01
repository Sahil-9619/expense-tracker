const BASE_URL = import.meta.env.VITE_API_URL;
const NETWORK_ERROR_MESSAGE = 'Network error';

const parseResponse = async (response) => {
    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch {
        return { detail: text };
    }
};

const isNetworkError = (error) => {
    return error instanceof TypeError && error.message === 'Failed to fetch';
};

const isAuthError = (response, data) => {
    return response.status === 401 && (
        data?.code === 'token_not_valid'
        || data?.code === 'not_authenticated'
        || data?.detail === 'Authentication credentials were not provided.'
        || data?.detail === 'Given token not valid for any token type'
    );
};

const apiService = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('access_token');
    const isPublicEndpoint = endpoint.startsWith('/auth/') && !endpoint.includes('/auth/user/');

    if (token && !isPublicEndpoint) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        let response = await fetch(url, config);
        let data = await parseResponse(response);

        // 🔄 Handle Token Expiration
        if (isAuthError(response, data) && !isPublicEndpoint) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    const refreshRes = await fetch(`${BASE_URL}/auth/token/refresh/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh: refreshToken }),
                    });

                    if (refreshRes.ok) {
                        const refreshData = await parseResponse(refreshRes);
                        localStorage.setItem('access_token', refreshData.access);

                        // Retry the original request with the new token
                        config.headers['Authorization'] = `Bearer ${refreshData.access}`;
                        response = await fetch(url, config);
                        data = await parseResponse(response);
                    } else {
                        // Refresh token also invalid/expired
                        handleLogout();
                    }
                } catch {
                    handleLogout();
                }
            } else {
                handleLogout();
            }
        }

        if (!response.ok) {
            let errorMsg = 'Something went wrong';
            
            if (response.status >= 500) {
                errorMsg = 'An unexpected server error occurred. Please try again later.';
            } else {
                errorMsg = data?.error || data?.detail || (data?.email ? data.email[0] : null) || (data?.password ? data.password[0] : null) || 'Something went wrong';
                
                // Final safety check to prevent rendering HTML tracebacks or huge technical strings
                if (typeof errorMsg === 'string' && (errorMsg.includes('<html') || errorMsg.includes('<!DOCTYPE') || errorMsg.length > 200)) {
                    errorMsg = 'A technical error occurred. Please try again.';
                }
            }
            throw new Error(errorMsg);
        }

        return data;
    } catch (error) {
        if (isNetworkError(error)) {
            throw new Error(NETWORK_ERROR_MESSAGE);
        }

        throw error;
    }
};

const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/auth'; // Hard redirect to login
};

export default apiService;
