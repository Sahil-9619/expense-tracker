const BASE_URL = import.meta.env.VITE_API_URL

const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const getExpenses = async () => {
    try {
        const res = await fetch(`${BASE_URL}/expenses/`, {
            headers: getAuthHeaders(),
        });
        if (!res.ok) {
            if (res.status === 401) {
                // Handle unauthorized (e.g., redirect to login)
                localStorage.removeItem('access_token');
                window.location.href = '/auth';
            }
            throw new Error("Failed to fetch expenses");
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createExpense = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/expenses/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Failed to create expense");
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};