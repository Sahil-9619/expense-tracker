import React, { useState, useMemo, useEffect } from 'react';
import {
  Wallet, ArrowUpRight, ArrowDownRight, Plus, Home,
  PieChart, Settings, Coffee, Briefcase, Tv, Car,
  CreditCard, ShoppingBag, Bell, X, Search, Check,
  User, Shield, Smartphone, LogOut, Download, Filter, Eye, EyeOff
} from 'lucide-react';

// ==========================================
// 1. MOCK BACKEND DATA & CONFIGURATION
// ==========================================
const MOCK_USER = { name: 'Sahil Kumar', email: 'sahil@example.com', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sahil&backgroundColor=e2e8f0' };

const MOCK_TRANSACTIONS = [
  { id: 1, title: 'Freelance Project', amount: 2400, type: 'income', category: 'Work', date: '2026-05-01' },
  { id: 2, title: 'Groceries', amount: 150, type: 'expense', category: 'Food', date: '2026-05-02' },
  { id: 3, title: 'Netflix Subscription', amount: 15, type: 'expense', category: 'Entertainment', date: '2026-05-02' },
  { id: 4, title: 'Gas Station', amount: 45, type: 'expense', category: 'Transport', date: '2026-05-03' },
  { id: 5, title: 'New Sneakers', amount: 120, type: 'expense', category: 'Shopping', date: '2026-05-03' },
];

const MOCK_CARDS = [
  { id: 1, type: 'Visa', last4: '4242', balance: 5400, color: 'from-indigo-600 to-purple-700', frozen: false },
  { id: 2, type: 'Mastercard', last4: '8810', balance: 1250, color: 'from-slate-800 to-slate-900', frozen: false }
];

const CATEGORY_CONFIG = {
  Food: { icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-100' },
  Work: { icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  Entertainment: { icon: Tv, color: 'text-purple-500', bg: 'bg-purple-100' },
  Transport: { icon: Car, color: 'text-blue-500', bg: 'bg-blue-100' },
  Shopping: { icon: ShoppingBag, color: 'text-pink-500', bg: 'bg-pink-100' },
  Other: { icon: CreditCard, color: 'text-gray-500', bg: 'bg-gray-100' }
};

// ==========================================
// 2. API SIMULATION LAYER (Connect Backend Here)
// ==========================================
const api = {
  // --- TRANSACTIONS API ---
  getTransactions: async () => {
    // BACKEND: const res = await fetch('/api/transactions'); return res.json();
    return new Promise(resolve => setTimeout(() => resolve([...MOCK_TRANSACTIONS]), 600));
  },
  createTransaction: async (tx) => {
    // BACKEND: await fetch('/api/transactions', { method: 'POST', body: JSON.stringify(tx) });
    return new Promise(resolve => setTimeout(() => resolve({ ...tx, id: Date.now() }), 400));
  },

  // --- CARDS API ---
  getCards: async () => {
    // BACKEND: const res = await fetch('/api/cards'); return res.json();
    return new Promise(resolve => setTimeout(() => resolve([...MOCK_CARDS]), 500));
  },
  toggleCardFreeze: async (id, status) => {
    // BACKEND: await fetch(`/api/cards/${id}/freeze`, { method: 'PATCH', body: JSON.stringify({ frozen: status }) });
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
  },

  // --- USER API ---
  getUser: async () => {
    // BACKEND: const res = await fetch('/api/user/profile'); return res.json();
    return new Promise(resolve => setTimeout(() => resolve({ ...MOCK_USER }), 400));
  },
  updateUser: async (userData) => {
    // BACKEND: await fetch('/api/user/profile', { method: 'PUT', body: JSON.stringify(userData) });
    return new Promise(resolve => setTimeout(() => resolve(true), 600));
  }
};

// ==========================================
// 3. MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  // --- GLOBAL STATE ---
  const [activeTab, setActiveTab] = useState('home');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // --- DATA STATE ---
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Parallel API fetching
        const [txData, cardsData, userData] = await Promise.all([
          api.getTransactions(),
          api.getCards(),
          api.getUser()
        ]);
        setTransactions(txData);
        setCards(cardsData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to load application data:", error);
        showToast("Error loading data from server.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // --- GLOBAL HELPERS ---
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddTransaction = async (newTx) => {
    try {
      const savedTx = await api.createTransaction(newTx);
      setTransactions([savedTx, ...transactions]);
      setIsAddModalOpen(false);
      showToast("Transaction added successfully!");
    } catch (error) {
      showToast("Failed to save transaction.");
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Connecting to server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 relative">

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-10 fade-in duration-300">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 px-6 py-8 shadow-sm z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-md shadow-indigo-200">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">SpendSync</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={Home} label="Dashboard" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={PieChart} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <NavItem icon={CreditCard} label="Cards" active={activeTab === 'cards'} onClick={() => setActiveTab('cards')} />
          <NavItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="mt-auto bg-indigo-50 rounded-2xl p-5 text-center relative overflow-hidden group hover:bg-indigo-100 transition-colors cursor-pointer">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-200 rounded-bl-full opacity-50 -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h4 className="font-semibold text-indigo-900 mb-2 relative z-10">Go Premium</h4>
          <p className="text-xs text-indigo-700 mb-4 relative z-10">Unlock unlimited API access and exports.</p>
          <button className="w-full bg-indigo-600 text-white text-sm font-medium py-2 rounded-xl shadow-md hover:bg-indigo-700 transition-colors relative z-10">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col max-h-screen overflow-y-auto pb-24 md:pb-0 scroll-smooth">

        {/* HEADER */}
        <header className="flex items-center justify-between px-6 md:px-10 py-6 md:py-8 bg-slate-50 sticky top-0 z-10 bg-opacity-90 backdrop-blur-md border-b border-transparent">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {activeTab === 'home' && `Hello, ${user.name.split(' ')[0]}! 👋`}
              {activeTab === 'analytics' && 'Financial Analytics'}
              {activeTab === 'cards' && 'My Cards'}
              {activeTab === 'settings' && 'Account Settings'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {activeTab === 'home' && "Here's your financial overview"}
              {activeTab === 'analytics' && 'Detailed breakdown of your spending habits'}
              {activeTab === 'cards' && 'Manage your payment methods securely'}
              {activeTab === 'settings' && 'Update your profile and preferences'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 md:p-3 bg-white border border-slate-200 rounded-full text-slate-500 hover:bg-slate-100 transition-colors relative focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-indigo-500 transition-all focus:outline-none"
            >
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </header>

        {/* DYNAMIC VIEWS ROUTER */}
        <div className="px-6 md:px-10 max-w-6xl mx-auto w-full space-y-8 pb-10">
          {activeTab === 'home' && <DashboardView transactions={transactions} />}
          {activeTab === 'analytics' && <AnalyticsView transactions={transactions} />}
          {activeTab === 'cards' && <CardsView cards={cards} setCards={setCards} showToast={showToast} />}
          {activeTab === 'settings' && <SettingsView user={user} setUser={setUser} showToast={showToast} />}
        </div>
      </main>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 pb-safe-area shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-40">
        <MobileNavItem icon={Home} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <MobileNavItem icon={PieChart} active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />

        {/* Floating Add Button in Nav */}
        <div className="relative -top-8">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-300 hover:bg-indigo-700 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>

        <MobileNavItem icon={CreditCard} active={activeTab === 'cards'} onClick={() => setActiveTab('cards')} />
        <MobileNavItem icon={Settings} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </nav>

      {/* --- DESKTOP FLOATING ADD BUTTON --- */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="hidden md:flex fixed bottom-10 right-10 w-16 h-16 bg-indigo-600 text-white rounded-2xl items-center justify-center shadow-xl shadow-indigo-300 hover:bg-indigo-700 hover:shadow-2xl hover:-translate-y-1 transition-all z-40 focus:outline-none focus:ring-4 focus:ring-indigo-200"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* --- ADD TRANSACTION MODAL --- */}
      {isAddModalOpen && (
        <AddTransactionModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </div>
  );
}

// ==========================================
// 4. VIEW COMPONENTS
// ==========================================

function DashboardView({ transactions }) {
  // Derived state for Dashboard
  const { balance, totalIncome, totalExpense } = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.type === 'income') {
        acc.totalIncome += curr.amount;
        acc.balance += curr.amount;
      } else {
        acc.totalExpense += curr.amount;
        acc.balance -= curr.amount;
      }
      return acc;
    }, { balance: 0, totalIncome: 0, totalExpense: 0 });
  }, [transactions]);

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <>
      {/* BALANCE CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
        <div className="md:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400 opacity-20 rounded-full -ml-8 -mb-8 blur-xl"></div>

          <div className="relative z-10">
            <p className="text-indigo-100 font-medium text-sm mb-1 flex items-center gap-2">
              Total Balance <Eye className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100" />
            </p>
            <h3 className="text-4xl font-bold tracking-tight mb-6">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700 z-20">S</div>
                <div className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 z-10">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 border border-white/10">
                Transfer
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <p className="text-slate-500 font-medium">Total Income</p>
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-slate-800">${totalIncome.toLocaleString('en-US')}</h4>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <p className="text-slate-500 font-medium">Total Expense</p>
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-slate-800">${totalExpense.toLocaleString('en-US')}</h4>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS & OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Filter className="w-4 h-4" /></button>
              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="divide-y divide-slate-50 flex-1 overflow-y-auto">
            {sortedTransactions.length === 0 ? (
              <div className="p-12 flex flex-col items-center justify-center text-slate-400">
                <Search className="w-12 h-12 mb-3 opacity-20" />
                <p>No transactions yet.</p>
              </div>
            ) : (
              sortedTransactions.map((tx) => {
                const config = CATEGORY_CONFIG[tx.category] || CATEGORY_CONFIG['Other'];
                const Icon = config.icon;
                const isIncome = tx.type === 'income';

                return (
                  <div key={tx.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${config.bg} ${config.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{tx.title}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{tx.category} • {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${isIncome ? 'text-emerald-500' : 'text-slate-800'}`}>
                      {isIncome ? '+' : '-'}${tx.amount.toLocaleString()}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* MINI ANALYTICS */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Cash Flow</h3>
          <div className="relative flex-1 flex flex-col justify-center mb-6">
            <div className="flex justify-between items-end h-32 gap-3 mb-2">
              {/* Mock Bar Chart */}
              {[40, 70, 45, 90, 65, 80].map((h, i) => (
                <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group">
                  <div
                    className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all duration-1000 group-hover:bg-indigo-400"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-600">Income Limit</span>
                <span className="font-bold text-slate-800">{(totalIncome / (totalIncome + totalExpense || 1) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(totalIncome / (totalIncome + totalExpense || 1)) * 100}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-600">Expense Limit</span>
                <span className="font-bold text-slate-800">{(totalExpense / (totalIncome + totalExpense || 1) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: `${(totalExpense / (totalIncome + totalExpense || 1)) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AnalyticsView({ transactions }) {
  // Aggregate expenses by category
  const expensesByCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);

    const aggregated = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.entries(aggregated)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: ((amount / total) * 100) || 0
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 fade-in">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-800">Expense Breakdown</h3>
          <select className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>

        {expensesByCategory.length === 0 ? (
          <div className="text-center py-10 text-slate-500">Not enough data to analyze yet.</div>
        ) : (
          <div className="space-y-6">
            {expensesByCategory.map((item) => {
              const config = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG['Other'];
              const Icon = config.icon;
              return (
                <div key={item.category}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.bg} ${config.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-700">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">${item.amount.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 font-medium">{item.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${config.bg.replace('bg-', 'bg-').replace('100', '500')}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Placeholder for complex charts if integrated with a library later */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[250px] text-center">
          <PieChart className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">Detailed Charts module ready for integration</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[250px] text-center">
          <Download className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">Export Reports module ready for integration</p>
          <button className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold">Download CSV</button>
        </div>
      </div>
    </div>
  );
}

function CardsView({ cards, setCards, showToast }) {
  const handleFreeze = async (id, currentStatus) => {
    try {
      await api.toggleCardFreeze(id, !currentStatus);
      setCards(cards.map(c => c.id === id ? { ...c, frozen: !currentStatus } : c));
      showToast(`Card ${!currentStatus ? 'frozen' : 'unfrozen'} successfully`);
    } catch (e) {
      showToast("Action failed.");
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800">Linked Cards</h3>
        <button className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors">
          <Plus className="w-4 h-4" /> Add Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(card => (
          <div key={card.id} className={`p-6 rounded-3xl shadow-xl relative overflow-hidden transition-all duration-300 ${card.frozen ? 'bg-slate-300 opacity-70 grayscale' : `bg-gradient-to-br ${card.color} text-white`}`}>
            {/* Card Background Decals */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-5 rounded-full blur-lg"></div>

            <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
              <div className="flex justify-between items-start">
                <div className="font-bold text-lg tracking-widest opacity-90">{card.type}</div>
                <div className="w-10 h-8 bg-white/20 rounded backdrop-blur-sm border border-white/20"></div> {/* Chip mock */}
              </div>

              <div>
                <p className="text-sm opacity-80 mb-1">Available Balance</p>
                <h2 className="text-3xl font-bold mb-4">${card.balance.toLocaleString()}</h2>

                <div className="flex items-center justify-between">
                  <p className="font-mono tracking-widest">**** **** **** {card.last4}</p>
                  <button
                    onClick={() => handleFreeze(card.id, card.frozen)}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-xs font-bold transition-colors"
                  >
                    {card.frozen ? 'Unfreeze' : 'Freeze Card'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State / Add Action */}
        <div className="p-6 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-500 transition-colors cursor-pointer min-h-[228px]">
          <Plus className="w-8 h-8 mb-2" />
          <p className="font-bold">Apply for new Card</p>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ user, setUser, showToast }) {
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.updateUser(formData);
      setUser({ ...user, ...formData });
      showToast("Profile updated successfully");
    } catch (e) {
      showToast("Failed to update profile", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6 animate-in slide-in-from-right-4 duration-300 fade-in">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
          <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden relative group">
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white text-xs font-bold">Edit</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /> {/* Mail icon placeholder */}
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-70 flex items-center gap-2"
            >
              {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 divide-y divide-slate-100">
        <SettingsRow icon={Shield} title="Security" description="Password, 2FA, linked accounts" />
        <SettingsRow icon={Smartphone} title="Devices" description="Manage active sessions" />
        <SettingsRow icon={Bell} title="Notifications" description="Email and push alert preferences" />
        <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 rounded-2xl transition-colors group">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-100 transition-colors">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-rose-600">Log Out</h4>
            <p className="text-sm text-slate-500">Sign out of this device securely</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsRow({ icon: Icon, title, description }) {
  return (
    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded-2xl transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{title}</h4>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
    </div>
  );
}

// ==========================================
// 5. SHARED / UI COMPONENTS
// ==========================================

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all outline-none ${active
        ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-semibold'
        }`}
    >
      <Icon className={`w-5 h-5 transition-transform ${active ? 'text-indigo-600 scale-110' : 'text-slate-400'}`} />
      {label}
    </button>
  );
}

function MobileNavItem({ icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition-all outline-none ${active ? 'text-indigo-600 bg-indigo-50 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
    >
      <Icon className={`w-6 h-6 ${active ? 'scale-110' : ''} transition-transform`} />
    </button>
  );
}

function AddTransactionModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = Object.keys(CATEGORY_CONFIG);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    setIsSubmitting(true);
    await onAdd({
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0]
    });
    // Modal closes via parent state
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-md rounded-[2rem] p-6 md:p-8 shadow-2xl transform transition-all animate-in slide-in-from-bottom-8 md:zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">New Transaction</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors focus:outline-none">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all outline-none ${type === 'expense' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setType('expense')}
          >
            Expense
          </button>
          <button
            type="button"
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all outline-none ${type === 'income' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setType('income')}
          >
            Income
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Amount</label>
            <div className="relative group">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg transition-colors ${type === 'expense' ? 'text-rose-500' : 'text-emerald-500'}`}>$</span>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-2xl pl-10 pr-4 py-3.5 focus:outline-none focus:bg-white transition-all text-xl font-bold placeholder:font-medium placeholder:text-slate-400 placeholder:text-lg
                  ${type === 'expense' ? 'focus:border-rose-300 focus:ring-4 focus:ring-rose-50' : 'focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50'}
                `}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
              placeholder="e.g. Groceries, Salary..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map(cat => {
                const Icon = CATEGORY_CONFIG[cat].icon;
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all outline-none ${isSelected
                      ? `border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm`
                      : `border-slate-100 bg-slate-50 text-slate-500 hover:border-indigo-200 hover:bg-white`
                      }`}
                  >
                    <Icon className={`w-6 h-6 mb-1.5 ${isSelected ? 'text-indigo-600 scale-110' : 'text-slate-400'} transition-transform`} />
                    <span className="text-xs font-bold">{cat}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white font-bold text-lg py-4 rounded-2xl shadow-lg transition-all mt-6 flex justify-center items-center gap-2
              ${type === 'expense' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'}
              ${isSubmitting ? 'opacity-80 scale-[0.98]' : 'hover:-translate-y-0.5'}
            `}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              `Save ${type === 'expense' ? 'Expense' : 'Income'}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}