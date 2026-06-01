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
import {
  createBudget,
  createGoal,
  createReport,
  createWallet,
  getBudgets,
  getGoals,
  getReportFolders,
  getReports,
  getWallets
} from '../../services/tracker.service';
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
  const [wallets, setWallets] = useState([]);
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
      const [
        transactionData,
        walletData,
        budgetData,
        goalData,
        folderData,
        reportData
      ] = await Promise.all([
        getExpenses(),
        getWallets(),
        getBudgets(),
        getGoals(),
        getReportFolders(),
        getReports()
      ]);

      setTransactions(transactionData || []);
      setWallets(walletData || []);
      setBudgets(budgetData || []);
      setGoals(goalData || []);
      setReportFolders(folderData || []);
      setReports(reportData || []);
    } catch {
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

  const handleAddWallet = async (walletData) => {
    try {
      await createWallet(walletData);
      toast.success('Liquidity Node Connected Successfully');
      fetchTrackerData();
    } catch (err) {
      toast.error(err.message || 'Unable to connect wallet');
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
                wallets={wallets}
                budgets={budgets}
                goals={goals}
                categoryConfig={categoryConfig}
                onAddClick={() => setIsTxModalOpen(true)} 
              />
            } />
            <Route path="wallets" element={<Wallets wallets={wallets} onAddWallet={handleAddWallet} transactions={transactions} />} />
            <Route path="transactions" element={
              <Transactions 
                transactions={transactions} 
                onAddClick={() => setIsTxModalOpen(true)}
              />
            } />
            <Route path="analytics" element={
              <Analytics 
                transactions={transactions} 
                wallets={wallets}
                budgets={budgets}
                goals={goals}
                categoryConfig={categoryConfig} 
              />
            } />
            <Route path="reports" element={<Reports folders={reportFolders} reports={reports} onCreateReport={handleCreateReport} />} />
            <Route path="budgets" element={<Budgets budgets={budgets} transactions={transactions} onAddBudget={handleAddBudget} />} />
            <Route path="goals" element={<Goals goals={goals} onAddGoal={handleAddGoal} />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            
            {/* Fallback routes */}
            <Route path="*" element={<Dashboard transactions={transactions} wallets={wallets} budgets={budgets} goals={goals} categoryConfig={categoryConfig} onAddClick={() => setIsTxModalOpen(true)} />} />
          </Routes>
        </main>
      </div>

      <TransactionDialog 
        isOpen={isTxModalOpen} 
        onOpenChange={setIsTxModalOpen}
        onAdd={handleAddTransaction}
        categoryConfig={categoryConfig}
        wallets={wallets}
      />
    </div>
  );
}
