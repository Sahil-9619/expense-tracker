import React, { useMemo } from 'react';
import {
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Filter,
  Plus,
  Download,
  PieChart,
  Wallet,
  ArrowRightLeft,
  ChevronDown
} from 'lucide-react';

export defau PS D:\expense-tracker\backend> python manage.py runserver
Watching for file changes with StatReloader
Exception in thread django-main-thread:
Traceback (most recent call last):
  File "C:\Program Files\WindowsApps\PythonSoftwareFoundation.Python.3.11_3.11.2544.0_x64__qbz5n2kfra8p0\Lib\threading.py", line 1045, in _bootstrap_inner    
    self.run()
  File "C:\Program Files\WindowsApps\PythonSoftwareFoundation.Python.3.11_3.11.2544.0_x64__qbz5n2kfra8p0\Lib\threading.py", line 982, in run
    self._target(*self._args, **self._kwargs)
  File "D:\expense-tracker\backend\env\Lib\site-packages\django\utils\autoreload.py", line 64, in wrapper
    fn(*args, **kwargs)
  File "D:\expense-tracker\backend\env\Lib\site-packages\django\core\management\commands\runserver.py", line 124, in inner_run
    autoreload.raise_last_exception()
  File "D:\expense-tracker\backend\env\Lib\site-packages\django\utils\autoreload.py", line 86, in raise_last_exception
    raise _exception[1]
  File "D:\expense-tracker\backend\env\Lib\site-packages\django\core\management\__init__.py", line 394, in execute
    autoreload.check_errors(django.setup)()
  File "D:\expense-tracker\backend\env\Lib\site-packages\django\utils\autoreload.py", line 64, in wrapper
    fn(*args, **kwargs)
  File "D:\expense-tracker\backend\env\Lib\site-packages\django\__init__.py", line 24, in setup
    apps.populate(settings.INSTALLED_APPS)
  File "D:\expense-tracker\backend\env\Lib\site-packages\django\apps\registry.py", line 116, in populate
    app_config.import_models()
  File "D:\expense-tracker\backend\env\Lib\site-packages\django\apps\config.py", line 269, in import_models
    self.models_module = import_module(models_module_name)
                         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Program Files\WindowsApps\PythonSoftwareFoundation.Python.3.11_3.11.2544.0_x64__qbz5n2kfra8p0\Lib\importlib\__init__.py", line 126, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "<frozen importlib._bootstrap>", line 1204, in _gcd_import
  File "<frozen importlib._bootstrap>", line 1176, in _find_and_load
  File "<frozen importlib._bootstrap>", line 1147, in _find_and_load_unlocked  
  File "<frozen importlib._bootstrap>", line 690, in _load_unlocked
  File "<frozen importlib._bootstrap_external>", line 940, in exec_module      
  File "<frozen importlib._bootstrap>", line 241, in _call_with_frames_removed 
  File "D:\expense-tracker\backend\expenses\models\__init__.py", line 2, in <module>
    from .expense_model import Budget, Expense, Goal, Report, ReportFolder, Wallet
ImportError: cannot import name 'Wallet' from 'expenses.models.expense_model' (D:\expense-tracker\backend\expenses\models\expense_model.py)
lt function Dashboard({ transactions = [], budgets = [], goals = [], categoryConfig = {}, onAddClick }) {
  const { balance, totalIncome, totalExpense } = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      const amount = parseFloat(curr.amount);
      if (curr.type === 'income') {
        acc.totalIncome += amount;
        acc.balance += amount;
      } else {
        acc.totalExpense += amount;
        acc.balance -= amount;
      }
      return acc;
    }, { balance: 0, totalIncome: 0, totalExpense: 0 });
  }, [transactions]);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  }, [transactions]);

  const savingsRate = totalIncome > 0 ? Math.max(((totalIncome - totalExpense) / totalIncome) * 100, 0) : 0;
  const targetGoal = goals.find((goal) => !goal.completed) || goals[0];
  const assetDistribution = useMemo(() => {
    return [
      ...goals.map((goal) => ({
        label: goal.title,
        amount: Number(goal.current || 0),
        color: `bg-${goal.color || 'indigo'}-500`,
      })),
    ].filter((asset) => asset.amount !== 0);
  }, [goals]);
  const assetTotal = assetDistribution.reduce((sum, asset) => sum + Math.abs(asset.amount), 0);

  const cardBase = "relative rounded-sm border border-[var(--card-border)] p-4 flex flex-col bg-[var(--card-bg)] transition-all duration-200 hover:shadow-lg hover:shadow-black/20";

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-hide space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">

        {/* Top Header & Actions */}
        <div className="flex items-end justify-between px-2">
          <div>
            <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Financial Overview</h1>
            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Real-time financial overview</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:bg-[var(--bg-color)] transition-all">
              <Download size={12} /> Export CSV
            </button>
            <button 
              onClick={onAddClick}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-500/20"
            >
              <Plus size={12} /> Add Entry
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-3">

          {/* --- ROW 1: Key Metrics --- */}
          <KPICard
            title="Total Net Worth"
            value={balance}
            trend="+2.4%"
            isUp={true}
            cardBase={cardBase}
          />
          <KPICard
            title="Monthly Spend"
            value={totalExpense}
            trend="-1.2%"
            isUp={false}
            cardBase={cardBase}
          />
          <div className={`${cardBase} col-span-12 sm:col-span-6 lg:col-span-3 group`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Total Income</span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-secondary)]"><MoreVertical size={12} /></button>
            </div>
            <div className="text-xl font-black font-mono tracking-tighter text-[var(--text-primary)]">
              ₹{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            {/* Micro Sparkline */}
            <div className="h-6 mt-auto pt-2 w-full flex items-end gap-[2px]">
              {[3, 5, 4, 7, 6, 9, 8].map((h, i) => (
                <div key={i} className="w-full rounded-t-sm bg-emerald-500/80" style={{ height: `${h * 10}%` }}></div>
              ))}
            </div>
          </div>

          <div className={`${cardBase} col-span-12 sm:col-span-6 lg:col-span-3 group`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">Savings Rate</span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-secondary)]"><MoreVertical size={12} /></button>
            </div>
            <div className="text-xl font-black font-mono tracking-tighter text-[var(--text-primary)]">{savingsRate.toFixed(1)}%</div>
            <div className="w-full h-1.5 bg-[var(--bg-color)] rounded-full mt-auto mb-1 overflow-hidden border border-[var(--card-border)]">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${Math.min(savingsRate, 100)}%` }}></div>
            </div>
            <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">{budgets.length} budgets active</span>
          </div>

          {/* --- ROW 2: Advanced Main Chart & Quick Actions --- */}
          <div className={`${cardBase} col-span-12 lg:col-span-12 min-h-[220px]`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Cash Flow Analysis</h2>
              <div className="flex gap-1 bg-[var(--bg-color)] p-0.5 rounded-sm border border-[var(--card-border)]">
                {['1W', '1M', '3M', '1Y', 'ALL'].map(range => (
                  <button key={range} className={`text-[9px] px-2 py-1 rounded-sm font-black uppercase tracking-widest ${range === '1M' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex-1 w-full h-full pt-4 min-h-[150px]">
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <path d="M0,30 L15,25 L30,28 L45,15 L60,20 L75,10 L90,15 L100,5 L100,40 L0,40 Z" fill="url(#colorEmerald)" />
                <path d="M0,30 L15,25 L30,28 L45,15 L60,20 L75,10 L90,15 L100,5" fill="none" stroke="#10b981" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>



          {/* --- ROW 3: Dense Transaction Table --- */}
          <div className={`${cardBase} col-span-12 lg:col-span-8`}>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Recent Transactions</h2>
              <button className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-emerald-500 transition-all">
                <Filter size={10} /> Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--card-border)] text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-black">
                    <th className="pb-3">Transaction</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-center">Protocol</th>
                  </tr>
                </thead>
                <tbody className="text-[10px]">
                  {sortedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-40">No transactions found.</td>
                    </tr>
                  ) : (
                    sortedTransactions.map((tx) => {
                      const config = categoryConfig[tx.category] || categoryConfig['Other'] || { accent: 'slate' };
                      return (
                        <tr key={tx.id} className="border-b border-[var(--card-border)]/50 last:border-0 group transition-colors hover:bg-[var(--bg-color)]/50">
                          <td className="py-2.5">
                            <div className="flex flex-col">
                              <span className="font-black text-[var(--text-primary)] uppercase tracking-tighter">{tx.merchant || tx.description}</span>
                              <span className="text-[9px] text-[var(--text-secondary)] opacity-60 font-medium">{new Date(tx.date).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="py-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-${config.accent}-500/20 bg-${config.accent}-500/5 text-${config.accent}-400`}>
                              {tx.category}
                            </span>
                          </td>
                          <td className={`py-2.5 text-right font-mono font-black tracking-tighter ${tx.type === 'income' ? 'text-emerald-500' : 'text-[var(--text-primary)]'}`}>
                            {tx.type === 'income' ? '+' : ''}₹{parseFloat(tx.amount).toLocaleString()}
                          </td>
                          <td className="py-2.5 text-center">
                            <div className={`w-1.5 h-1.5 rounded-full mx-auto ${tx.type === 'income' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-500'}`}></div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className={`${cardBase} col-span-12 lg:col-span-4`}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] mb-6">Asset Distribution</h2>

            <div className="flex flex-col gap-5">
              {assetDistribution.length === 0 ? (
                <div className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40 text-center py-6">
                  No goals found
                </div>
              ) : assetDistribution.map((asset, i) => {
                const value = assetTotal ? (Math.abs(asset.amount) / assetTotal) * 100 : 0;
                return (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${asset.color}`}></div>
                      <span className="font-black uppercase tracking-widest text-[var(--text-secondary)]">{asset.label}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[var(--text-secondary)] font-bold opacity-40">{value.toFixed(1)}%</span>
                      <span className="font-mono font-black text-[var(--text-primary)] tracking-tighter">₹{asset.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-[var(--bg-color)] rounded-full overflow-hidden border border-[var(--card-border)]">
                    <div className={`h-full ${asset.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              )})}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, isUp, cardBase }) {
  return (
    <div className={`${cardBase} col-span-12 sm:col-span-6 lg:col-span-3 group`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">{title}</span>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-secondary)]"><MoreVertical size={12} /></button>
      </div>
      <div className="text-xl font-black font-mono tracking-tighter text-[var(--text-primary)]">
        ₹{Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
      <div className="flex items-center gap-1 mt-auto pt-3">
        {isUp ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-rose-500" />}
        <span className={`text-[9px] font-black uppercase tracking-widest ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>{trend} vs last month</span>
      </div>
    </div>
  );
}

