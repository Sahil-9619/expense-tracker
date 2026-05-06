const BASE_URL = import.meta.env.VITE_API_URL;

const apiService = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('access_token');
    // Don't send token for signup or login
    const isPublicEndpoint = endpoint.includes('/auth/signup/') || endpoint.includes('/auth/login/');
    
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
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.error || data.detail || (data.email ? data.email[0] : null) || (data.password ? data.password[0] : null) || 'Something went wrong';
            throw new Error(errorMsg);
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export default apiService;
