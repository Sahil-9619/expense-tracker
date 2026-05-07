const BASE_URL = import.meta.env.VITE_API_URL;

const apiService = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('access_token');
    const isPublicEndpoint = endpoint.includes('/auth/signup/') || endpoint.includes('/auth/login/') || endpoint.includes('/auth/token/refresh/');
    
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
        let data = await response.json();

        // 🔄 Handle Token Expiration
        if (response.status === 401 && data.code === 'token_not_valid' && !isPublicEndpoint) {
            const refreshToken = localStorage.getItem('refresh_token');
            
            if (refreshToken) {
                try {
                    const refreshRes = await fetch(`${BASE_URL}/auth/token/refresh/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh: refreshToken }),
                    });

                    if (refreshRes.ok) {
                        const refreshData = await refreshRes.json();
                        localStorage.setItem('access_token', refreshData.access);
                        
                        // Retry the original request with the new token
                        config.headers['Authorization'] = `Bearer ${refreshData.access}`;
                        response = await fetch(url, config);
                        data = await response.json();
                    } else {
                        // Refresh token also invalid/expired
                        handleLogout();
                    }
                } catch (refreshErr) {
                    handleLogout();
                }
            } else {
                handleLogout();
            }
        }

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

const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/auth'; // Hard redirect to login
};

export default apiService;
