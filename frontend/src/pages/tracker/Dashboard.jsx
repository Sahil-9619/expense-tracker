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

export default function Dashboard({ transactions = [], categoryConfig = {}, onAddClick }) {
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

  const cardBase = "relative rounded-sm border border-[var(--card-border)] p-4 flex flex-col bg-[var(--card-bg)] transition-all duration-200 hover:shadow-lg hover:shadow-black/20";

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-hide space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">

        {/* Top Header & Actions */}
        <div className="flex items-end justify-between px-2">
          <div>
            <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Financial Overview</h1>
            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Real-time liquidity monitoring</p>
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

          {/* --- ROW 1: Micro KPIs --- */}
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
            <div className="text-xl font-black font-mono tracking-tighter text-[var(--text-primary)]">67.2%</div>
            <div className="w-full h-1.5 bg-[var(--bg-color)] rounded-full mt-auto mb-1 overflow-hidden border border-[var(--card-border)]">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 w-[67.2%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Target: 70%</span>
          </div>

          {/* --- ROW 2: Advanced Main Chart & Quick Actions --- */}
          <div className={`${cardBase} col-span-12 lg:col-span-8 min-h-[220px]`}>
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

          {/* Quick Transfer Panel */}
          <div className={`${cardBase} col-span-12 lg:col-span-4 min-h-[220px] flex flex-col`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Protocol Bridge</h2>
            </div>

            <div className="p-3 rounded-sm border border-[var(--card-border)] bg-[var(--bg-color)]/40 flex flex-col gap-2 mb-2">
              <span className="text-[9px] text-[var(--text-secondary)] font-black uppercase tracking-widest">From Liquidity Node</span>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center"><Wallet size={12} /></div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--text-primary)]">Main Checking</span>
                </div>
                <span className="text-[10px] font-black font-mono text-[var(--text-primary)]">₹{balance.toLocaleString()}</span>
              </div>
            </div>

            <div className="relative h-6 flex items-center justify-center -my-2 z-10">
              <button className="w-6 h-6 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center transition-transform hover:rotate-180 text-emerald-500">
                <ArrowRightLeft size={10} className="rotate-90" />
              </button>
            </div>

            <div className="p-3 rounded-sm border border-[var(--card-border)] bg-[var(--bg-color)]/40 flex flex-col gap-2 mt-2">
              <span className="text-[9px] text-[var(--text-secondary)] font-black uppercase tracking-widest">To Capital Hub</span>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-500 flex items-center justify-center"><PieChart size={12} /></div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--text-primary)]">S&P 500 Index</span>
                </div>
                <ChevronDown size={14} className="text-[var(--text-secondary)]" />
              </div>
            </div>

            <div className="mt-auto flex gap-2 pt-4">
              <div className="flex-1 flex items-center px-3 py-1.5 rounded-sm border border-[var(--card-border)] bg-[var(--bg-color)]/20">
                <span className="text-[var(--text-secondary)] text-xs">₹</span>
                <input type="text" placeholder="0.00" className="bg-transparent border-none outline-none w-full text-xs font-mono ml-1 placeholder-[var(--text-secondary)] text-[var(--text-primary)]" />
              </div>
              <button className="px-4 py-1.5 bg-emerald-600 text-white font-black uppercase tracking-widest text-[9px] rounded-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/10">
                Execute
              </button>
            </div>
          </div>

          {/* --- ROW 3: Dense Transaction Table --- */}
          <div className={`${cardBase} col-span-12 lg:col-span-8`}>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Recent Ledger Entries</h2>
              <button className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-emerald-500 transition-all">
                <Filter size={10} /> Filter Protocols
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
                      <td colSpan="4" className="py-10 text-center text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-40">Awaiting system input...</td>
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
              {[
                { label: 'Fiat Currency', value: '45.2%', amount: '₹56,302', color: 'bg-emerald-500' },
                { label: 'Equities', value: '32.8%', amount: '₹40,856', color: 'bg-indigo-500' },
                { label: 'Real Estate', value: '15.0%', amount: '₹18,684', color: 'bg-rose-500' },
                { label: 'Crypto', value: '7.0%', amount: '₹8,720', color: 'bg-amber-500' },
              ].map((asset, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${asset.color}`}></div>
                      <span className="font-black uppercase tracking-widest text-[var(--text-secondary)]">{asset.label}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[var(--text-secondary)] font-bold opacity-40">{asset.value}</span>
                      <span className="font-mono font-black text-[var(--text-primary)] tracking-tighter">{asset.amount}</span>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-[var(--bg-color)] rounded-full overflow-hidden border border-[var(--card-border)]">
                    <div className={`h-full ${asset.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: asset.value }}></div>
                  </div>
                </div>
              ))}
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
        <span className={`text-[9px] font-black uppercase tracking-widest ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>{trend} vs last epoch</span>
      </div>
    </div>
  );
}
