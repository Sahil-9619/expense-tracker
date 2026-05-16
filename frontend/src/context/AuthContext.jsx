import React, { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    loginUser,
    registerUser,
    requestPasswordReset,
    resetPassword,
    verifySignupOtp,
} from '../services/auth.service';
import { setUser as setReduxUser, logout as logoutRedux } from '../redux/slices/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check for stored token on mount
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('access_token');
        if (storedUser && token) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            dispatch(setReduxUser(parsedUser));
        }
        setLoading(false);
    }, [dispatch]);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser({ email, password });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            setUser(data.user);
            dispatch(setReduxUser(data.user)); // Update Redux
            
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await registerUser({ name, email, password });
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifySignup = async (email, otp) => {
        setLoading(true);
        setError(null);
        try {
            return await verifySignupOtp({ email, otp });
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const sendPasswordResetOtp = async (email) => {
        setLoading(true);
        setError(null);
        try {
            return await requestPasswordReset({ email });
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const confirmPasswordReset = async (email, otp, password) => {
        setLoading(true);
        setError(null);
        try {
            return await resetPassword({ email, otp, password });
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        setUser(null);
        dispatch(logoutRedux()); // Update Redux
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            register,
            verifySignup,
            sendPasswordResetOtp,
            confirmPasswordReset,
            logout,
            setError,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
