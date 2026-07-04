import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function Dashboard({ transactions = [], budgets = [], goals = [], categoryConfig = {}, onAddClick }) {
  const [timeRange, setTimeRange] = useState('1M');

  const chartData = useMemo(() => {
    if (!transactions.length) {
      return { points: [], path: '', areaPath: '', labels: [] };
    }

    const now = new Date();
    let startDate = new Date();
    let isDaily = true;

    if (timeRange === '1W') {
      startDate.setDate(now.getDate() - 7);
    } else if (timeRange === '1M') {
      startDate.setDate(now.getDate() - 30);
    } else if (timeRange === '3M') {
      startDate.setDate(now.getDate() - 90);
    } else if (timeRange === '1Y') {
      startDate.setFullYear(now.getFullYear() - 1);
      isDaily = false;
    } else {
      const dates = transactions.map(t => new Date(t.date));
      startDate = dates.length ? new Date(Math.min(...dates)) : new Date();
      const diffTime = Math.abs(now - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      isDaily = diffDays <= 90;
    }

    const inRangeTx = transactions.filter(t => new Date(t.date) >= startDate);
    const outOfRangeTx = transactions.filter(t => new Date(t.date) < startDate);

    let runningBalance = outOfRangeTx.reduce((acc, curr) => {
      const amt = parseFloat(curr.amount) || 0;
      return curr.type === 'income' ? acc + amt : acc - amt;
    }, 0);

    const formatDateKey = (date) => {
      if (isDaily) {
        return date.toISOString().split('T')[0];
      } else {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      }
    };

    const datePoints = [];
    let current = new Date(startDate);
    while (current <= now) {
      datePoints.push(new Date(current));
      if (isDaily) {
        current.setDate(current.getDate() + 1);
      } else {
        current.setMonth(current.getMonth() + 1);
      }
    }

    const flows = {};
    inRangeTx.forEach(t => {
      const key = formatDateKey(new Date(t.date));
      const amt = parseFloat(t.amount) || 0;
      const net = t.type === 'income' ? amt : -amt;
      flows[key] = (flows[key] || 0) + net;
    });

    const points = datePoints.map(date => {
      const key = formatDateKey(date);
      const flow = flows[key] || 0;
      runningBalance += flow;
      
      let label = '';
      if (isDaily) {
        label = date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
      } else {
        label = date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
      }

      return {
        date,
        balance: runningBalance,
        label
      };
    });

    const balances = points.map(p => p.balance);
    const minVal = Math.min(...balances, 0);
    const maxVal = Math.max(...balances, 100);
    const valRange = maxVal - minVal || 1;

    const svgPoints = points.map((p, index) => {
      const x = points.length > 1 ? (index / (points.length - 1)) * 100 : 50;
      const y = 35 - ((p.balance - minVal) / valRange) * 30;
      return { x, y, balance: p.balance, label: p.label };
    });

    let path = '';
    let areaPath = '';
    if (svgPoints.length > 0) {
      path = `M ${svgPoints[0].x} ${svgPoints[0].y} ` + svgPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
      areaPath = `${path} L ${svgPoints[svgPoints.length - 1].x} 40 L ${svgPoints[0].x} 40 Z`;
    }

    const labelStep = Math.max(Math.floor(points.length / 5), 1);
    const labels = svgPoints.filter((_, idx) => idx % labelStep === 0 || idx === points.length - 1);

    return { points: svgPoints, path, areaPath, labels };
  }, [transactions, timeRange]);

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
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
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

          {/* --- ROW 2: Advanced Main Chart & Recent Transactions --- */}
          <div className={`${cardBase} col-span-12 lg:col-span-6 min-h-[380px] flex flex-col`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Cash Flow Analysis</h2>
              <div className="flex gap-1 bg-[var(--bg-color)] p-0.5 rounded-sm border border-[var(--card-border)]">
                {['1W', '1M', '3M', '1Y', 'ALL'].map(range => (
                  <button 
                    key={range} 
                    onClick={() => setTimeRange(range)}
                    className={`text-[9px] px-2 py-1 rounded-sm font-black uppercase tracking-widest ${range === timeRange ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex-1 w-full h-full pt-4 min-h-[250px] flex flex-col justify-between">
              {chartData.path ? (
                <div className="relative flex-1 w-full h-full min-h-[200px]">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <path d={chartData.areaPath} fill="url(#colorEmerald)" />
                    <path d={chartData.path} fill="none" stroke="#10b981" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] opacity-40">
                  No data points in this timeframe
                </div>
              )}
              
              {/* X Axis Labels */}
              {chartData.labels.length > 0 && (
                <div className="flex justify-between mt-2 pt-2 border-t border-[var(--card-border)]/30">
                  {chartData.labels.map((lbl, idx) => (
                    <span key={idx} className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-wider">
                      {lbl.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>



          <div className={`${cardBase} col-span-12 lg:col-span-6`}>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Recent Transactions</h2>
              <Link to="/dashboard/transactions" className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-emerald-500 transition-all">
                View All
              </Link>
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

