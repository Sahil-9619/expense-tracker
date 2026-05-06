const BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle Django Rest Framework error responses
            const errorMsg = data.email?.[0] || data.name?.[0] || data.password?.[0] || data.error || 'Registration failed';
            throw new Error(errorMsg);
        }

        return data;
    } catch (error) {
        throw error;
    }
};
