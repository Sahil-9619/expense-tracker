import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/auth/Auth';
import Tracker from './pages/tracker/Tracker';
import { Toaster } from './components/ui/sonner';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-color)]">
                <div className="w-8 h-8 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    
    if (!user) {
        return <Navigate to="/auth" replace />;
    }
    
    return children;
};

const App = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] antialiased font-sans">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth onLogin={() => window.location.href = '/dashboard'} />} />
                <Route 
                    path="/dashboard/*" 
                    element={
                        <ProtectedRoute>
                            <Tracker />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
            <Toaster position="top-right" />
        </div>
    );
};

export default App;
