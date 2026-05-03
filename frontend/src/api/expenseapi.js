const BASE_URL = import.meta.env.VITE_API_URL


export const getExpenses = async () => {
    try {
        const res = await fetch(`${BASE_URL}/expenses/`);
        if (!res.ok) throw new Error("Failed to fetch expenses");
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
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Failed to create expense");
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};