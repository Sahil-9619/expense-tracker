import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Wallets from './Wallets';
import Transactions from './Transactions';
import Budgets from './Budgets';
import Goals from './Goals';
import Reports from './Reports';
import Help from './Help';
import TransactionDialog from '../../components/tracker/TransactionDialog';
import { getExpenses, createExpense } from '../../services/expense.service';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleAddTransaction = async (txData) => {
    try {
      await createExpense(txData);
      toast.success('Transaction Synchronized Successfully');
      fetchTransactions();
    } catch (err) {
      toast.error('Protocol Synchronization Failed');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-[var(--bg-color)] overflow-hidden transition-colors duration-500 relative">
      <Sidebar 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <main className="flex-1 relative overflow-y-auto no-scrollbar">
          <Routes>
            <Route index element={
              <Dashboard 
                transactions={transactions} 
                categoryConfig={categoryConfig}
                onAddClick={() => setIsTxModalOpen(true)} 
              />
            } />
            <Route path="wallets" element={<Wallets />} />
            <Route path="transactions" element={
              <Transactions 
                transactions={transactions} 
                onAddClick={() => setIsTxModalOpen(true)}
              />
            } />
            <Route path="analytics" element={
              <Analytics 
                transactions={transactions} 
                categoryConfig={categoryConfig} 
              />
            } />
            <Route path="reports" element={<Reports />} />
            <Route path="budgets" element={<Budgets />} />
            <Route path="goals" element={<Goals />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            
            {/* Fallback routes */}
            <Route path="*" element={<Dashboard transactions={transactions} categoryConfig={categoryConfig} onAddClick={() => setIsTxModalOpen(true)} />} />
          </Routes>
        </main>
      </div>

      <TransactionDialog 
        isOpen={isTxModalOpen} 
        onOpenChange={setIsTxModalOpen}
        onAdd={handleAddTransaction}
        categoryConfig={categoryConfig}
      />
    </div>
  );
}
