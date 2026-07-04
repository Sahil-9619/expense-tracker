import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Transactions from './Transactions';
import Budgets from './Budgets';
import Goals from './Goals';
import Reports from './Reports';
import Help from './Help';
import TransactionDialog from '../../components/tracker/TransactionDialog';
import { getExpenses, createExpense } from '../../services/expense.service';
import {
  createBudget,
  createGoal,
  getBudgets,
  getGoals,
  getReportFolders,
  getReports
} from '../../services/tracker.service';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { 
  ShoppingBag, Utensils, Car, Heart, 
  Gamepad2, Lightbulb, User, MoreHorizontal,
  Home, BookOpen, Coffee, Dumbbell, Gift, Briefcase
} from 'lucide-react';

const iconMap = {
  Utensils,
  ShoppingBag,
  Car,
  Heart,
  Gamepad2,
  Lightbulb,
  User,
  MoreHorizontal,
  Home,
  BookOpen,
  Coffee,
  Dumbbell,
  Gift,
  Briefcase
};

export default function Tracker() {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('custom_categories');
    const initial = {
      'Food': { icon: 'Utensils', accent: 'emerald' },
      'Shopping': { icon: 'ShoppingBag', accent: 'indigo' },
      'Transport': { icon: 'Car', accent: 'rose' },
      'Health': { icon: 'Heart', accent: 'rose' },
      'Entertainment': { icon: 'Gamepad2', accent: 'indigo' },
      'Bills': { icon: 'Lightbulb', accent: 'emerald' },
      'Personal': { icon: 'User', accent: 'indigo' },
      'Other': { icon: 'MoreHorizontal', accent: 'slate' }
    };
    return saved ? JSON.parse(saved) : initial;
  });

  const categoryConfig = useMemo(() => {
    const config = {};
    Object.keys(categories).forEach(key => {
      const cat = categories[key];
      config[key] = {
        icon: iconMap[cat.icon] || MoreHorizontal,
        accent: cat.accent || 'slate'
      };
    });
    return config;
  }, [categories]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [reportFolders, setReportFolders] = useState([]);
  const [reports, setReports] = useState([]);
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
  const fetchTrackerData = useCallback(async () => {
    try {
      const expenses = await getExpenses().catch(err => { console.error('Expenses error:', err); return []; });
      const budgets = await getBudgets().catch(err => { console.error('Budgets error:', err); return []; });
      const goals = await getGoals().catch(err => { console.error('Goals error:', err); return []; });
      const folders = await getReportFolders().catch(err => { console.error('Folders error:', err); return []; });
      const reports = await getReports().catch(err => { console.error('Reports error:', err); return []; });

      console.log('--- DEBUG INFO ---');
      console.log('Fetched expenses:', expenses);
      console.log('Fetched budgets:', budgets);
      console.log('Fetched goals:', goals);
      console.log('Fetched folders:', folders);
      console.log('Fetched reports:', reports);

      setTransactions(expenses);
      setBudgets(budgets);
      setGoals(goals);
      setReportFolders(folders);
      setReports(reports);
    } catch (err) {
      console.error('Tracker data error:', err);
      toast.error('Unable to load tracker data');
    }
  }, []);

  useEffect(() => {
    fetchTrackerData();
  }, [fetchTrackerData]);

  const handleAddTransaction = async (txData) => {
    try {
      await createExpense({
        ...txData,
        title: txData.description,
      });
      toast.success('Transaction Synchronized Successfully');
      fetchTrackerData();
    } catch (err) {
      toast.error(err.message || 'Protocol Synchronization Failed');
    }
  };



  const handleAddBudget = async (budgetData) => {
    try {
      await createBudget(budgetData);
      toast.success('Capital Threshold Initialized');
      fetchTrackerData();
    } catch (err) {
      toast.error(err.message || 'Unable to initialize budget');
    }
  };

  const handleAddGoal = async (goalData) => {
    try {
      await createGoal(goalData);
      toast.success('Capital Phase Initialized');
      fetchTrackerData();
    } catch (err) {
      toast.error(err.message || 'Unable to initialize goal');
    }
  };

  const handleCreateReport = async () => {
    try {
      await createReport();
      toast.success('Financial audit generated');
      fetchTrackerData();
    } catch (err) {
      toast.error(err.message || 'Unable to generate report');
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
                budgets={budgets}
                goals={goals}
                categoryConfig={categoryConfig}
                onAddClick={() => setIsTxModalOpen(true)} 
              />
            } />
            <Route path="transactions" element={
              <Transactions 
                transactions={transactions} 
                onAddClick={() => setIsTxModalOpen(true)}
              />
            } />
            <Route path="analytics" element={
              <Analytics 
                transactions={transactions} 
                budgets={budgets}
                goals={goals}
                categoryConfig={categoryConfig} 
              />
            } />
            <Route path="reports" element={<Reports folders={reportFolders} reports={reports} onCreateReport={handleCreateReport} />} />
            <Route path="budgets" element={<Budgets budgets={budgets} transactions={transactions} onAddBudget={handleAddBudget} />} />
            <Route path="goals" element={<Goals goals={goals} onAddGoal={handleAddGoal} />} />
            <Route path="settings" element={
              <Settings 
                categories={categories} 
                onAddCategory={(name, icon, accent) => {
                  const updated = {
                    ...categories,
                    [name]: { icon, accent }
                  };
                  setCategories(updated);
                  localStorage.setItem('custom_categories', JSON.stringify(updated));
                }}
                onDeleteCategory={(name) => {
                  const updated = { ...categories };
                  delete updated[name];
                  setCategories(updated);
                  localStorage.setItem('custom_categories', JSON.stringify(updated));
                }}
              />
            } />
            <Route path="help" element={<Help />} />
            
            {/* Fallback routes */}
            <Route path="*" element={<Dashboard transactions={transactions} budgets={budgets} goals={goals} categoryConfig={categoryConfig} onAddClick={() => setIsTxModalOpen(true)} />} />
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
