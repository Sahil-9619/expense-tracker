import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import { getExpenses } from '../../services/expense.service';
import { useAuth } from '../../context/AuthContext';
import { 
  ShoppingBag, Utensils, Car, Heart, 
  Gamepad2, Lightbulb, User, MoreHorizontal 
} from 'lucide-react';

const categoryConfig = {
  'Food': { icon: Utensils, accent: 'emerald' },
  'Shopping': { icon: ShoppingBag, accent: 'indigo' },
  'Transport': { icon: Car, accent: 'rose' },
  'Health': { icon: Heart, accent: 'rose' },
  'Entertainment': { icon: Gamepad2, accent: 'indigo' },
  'Bills': { icon: Lightbulb, accent: 'emerald' },
  'Personal': { icon: User, accent: 'indigo' },
  'Other': { icon: MoreHorizontal, accent: 'slate' }
};

export default function Tracker() {
  const [transactions, setTransactions] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getExpenses();
      setTransactions(data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-[var(--bg-color)] overflow-hidden transition-colors duration-500">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 relative overflow-y-auto custom-scrollbar">
          <Routes>
            <Route index element={
              <Dashboard 
                transactions={transactions} 
                categoryConfig={categoryConfig}
                onAddClick={() => navigate('/dashboard')} 
              />
            } />
            <Route path="analytics" element={
              <Analytics 
                transactions={transactions} 
                categoryConfig={categoryConfig} 
              />
            } />
            <Route path="settings" element={<Settings />} />
            {/* Fallback routes */}
            <Route path="*" element={<Dashboard transactions={transactions} categoryConfig={categoryConfig} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
