import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

import { Toaster } from './components/ui/sonner';

const App = () => {
    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 antialiased font-sans">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth onLogin={() => window.location.href = '/dashboard'} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
            <Toaster position="top-right" />
        </div>
    );
};

export default App;
