import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/auth/Auth';
import Tracker from './pages/tracker/Tracker';
import { Toaster } from './components/ui/sonner';

const App = () => {
    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 antialiased font-sans">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth onLogin={() => window.location.href = '/dashboard'} />} />
                <Route path="/dashboard/*" element={<Tracker />} />
            </Routes>
            <Toaster position="top-right" />
        </div>
    );
};

export default App;
