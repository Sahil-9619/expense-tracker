import React, { useMemo, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Sparkles,
  Clock,
  Zap,
  Activity,
  Wallet,
  PiggyBank,
  ReceiptText,
  CalendarDays
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'motion/react';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Analytics({ transactions = [], budgets = [], goals = [], categoryConfig = {} }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const monthlyTotals = useMemo(() => {
    const buckets = Array.from({ length: 12 }, () => ({ income: 0, expense: 0, total: 0 }));
    transactions.forEach((tx) => {
      const month = new Date(tx.date).getMonth();
      const amt = Number(tx.amount || 0);
      if (tx.type === 'income') { buckets[month].income += amt; }
      else { buckets[month].expense += amt; }
      buckets[month].total += amt;
    });
    return buckets;
  }, [transactions]);

  const categoryTotals = useMemo(() => {
    const totals = transactions.reduce((acc, tx) => {
      if (tx.type !== 'expense') return acc;
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount || 0);
      return acc;
    }, {});
    const total = Object.values(totals).reduce((s, v) => s + v, 0);
    const list = Object.entries(totals)
      .map(([name, spent]) => {
        const config = categoryConfig[name] || { accent: 'slate' };
        return { name, spent, percentage: total ? (spent / total) * 100 : 0, accent: config.accent };
      })
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);
    return { list, total };
  }, [transactions, categoryConfig]);

  const topExpenses = useMemo(() =>
    [...transactions]
      .filter(t => t.type !== 'income')
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .slice(0, 8),
  [transactions]);

  const { balance, income, expense, incomeCount, expenseCount } = useMemo(() =>
    transactions.reduce((acc, curr) => {
      const amount = Number(curr.amount || 0);
      if (curr.type === 'income') {
        acc.income += amount; acc.balance += amount; acc.incomeCount += 1;
      } else {
        acc.expense += amount; acc.balance -= amount; acc.expenseCount += 1;
      }
      return acc;
    }, { balance: 0, income: 0, expense: 0, incomeCount: 0, expenseCount: 0 }),
  [transactions]);

  const { avgMonthlySpend, dailyBurnRate, runwayMonths } = useMemo(() => {
    const expenseTx = transactions.filter(t => t.type !== 'income');
    if (!expenseTx.length) return { avgMonthlySpend: 0, dailyBurnRate: 0, runwayMonths: 999 };
    const uniqueMonths = new Set(expenseTx.map(t => {
      const d = new Date(t.date);
      return `${d.getFullYear()}-${d.getMonth()}`;
    }));
    const monthsCount = Math.max(uniqueMonths.size, 1);
    const avgSpend = expense / monthsCount;
    const burn = avgSpend / 30.4;
    const runway = avgSpend > 0 ? Math.max(balance / avgSpend, 0) : 999;
    return { avgMonthlySpend: avgSpend, dailyBurnRate: burn, runwayMonths: runway };
  }, [transactions, expense, balance]);

  const savingsRate = income > 0 ? (((income - expense) / income) * 100) : 0;
  const maxMonthVal = Math.max(...monthlyTotals.map(m => Math.max(m.income, m.expense)), 1);
  const currentMonth = new Date().getMonth();

  return (
    <div className="p-4 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-1 border-b border-[var(--card-border)]/50 pb-3">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Your Money Report</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">A clear picture of where your money goes</p>
        </div>
        <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-3 py-1.5 rounded-sm self-start md:self-auto">
          <CalendarDays size={11} /> {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* ROW 1: Quick stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] p-4 rounded-sm flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em]">Money Left</span>
            <div className="p-1 rounded-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><Wallet size={11} /></div>
          </div>
          <div>
            <div className={`text-xl font-black font-mono tracking-tighter ${runwayMonths < 1 ? 'text-rose-400' : 'text-[var(--text-primary)]'}`}>
              {runwayMonths === 999 ? '∞ months' : `${runwayMonths.toFixed(1)} mo`}
            </div>
            <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">At current spending</span>
          </div>
        </Card>

        <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] p-4 rounded-sm flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em]">Monthly Spend</span>
            <div className="p-1 rounded-sm bg-rose-500/10 text-rose-500 border border-rose-500/20"><TrendingDown size={11} /></div>
          </div>
          <div>
            <div className="text-xl font-black font-mono tracking-tighter text-[var(--text-primary)]">
              ₹{avgMonthlySpend.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Average per month</span>
          </div>
        </Card>

        <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] p-4 rounded-sm flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em]">Daily Spending</span>
            <div className="p-1 rounded-sm bg-amber-500/10 text-amber-500 border border-amber-500/20"><Zap size={11} /></div>
          </div>
          <div>
            <div className="text-xl font-black font-mono tracking-tighter text-[var(--text-primary)]">
              ₹{dailyBurnRate.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Per day on average</span>
          </div>
        </Card>

        <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] p-4 rounded-sm flex flex-col justify-between h-[100px]">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em]">Saved So Far</span>
            <div className="p-1 rounded-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"><PiggyBank size={11} /></div>
          </div>
          <div>
            <div className={`text-xl font-black font-mono tracking-tighter ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {balance >= 0 ? '+' : ''}₹{Math.abs(balance).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Income minus spending</span>
          </div>
        </Card>

      </div>

      {/* ROW 2: Category rings + Biggest purchases */}
      <div className="grid grid-cols-12 gap-3">

        {/* Category Rings */}
        <Card className="col-span-12 lg:col-span-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-5 flex flex-col justify-between min-h-[340px]">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Where Money Goes</h2>
            </div>
            <p className="text-[8px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Top 5 spending categories</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {categoryTotals.list.map((item, idx) => {
                  const radius = 40 - idx * 7;
                  const circumference = 2 * Math.PI * radius;
                  const strokeOffset = circumference - (item.percentage / 100) * circumference;
                  return (
                    <g key={item.name}>
                      <circle cx="50" cy="50" r={radius} fill="transparent" stroke="var(--card-border)" strokeWidth="3" opacity="0.1" />
                      <motion.circle
                        cx="50" cy="50" r={radius} fill="transparent"
                        stroke={`var(--color-${item.accent || 'slate'}-500, #10b981)`}
                        strokeWidth="3.8"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: strokeOffset }}
                        transition={{ duration: 1, delay: idx * 0.08 }}
                        strokeLinecap="round"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredCategory(item)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      />
                    </g>
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <AnimatePresence mode="wait">
                  {hoveredCategory ? (
                    <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                      <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-[0.1em]">{hoveredCategory.name}</span>
                      <span className="text-xs font-black font-mono text-[var(--text-primary)]">₹{hoveredCategory.spent.toLocaleString('en-IN')}</span>
                    </motion.div>
                  ) : (
                    <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                      <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-[0.1em]">Total Spent</span>
                      <span className="text-sm font-black font-mono text-[var(--text-primary)]">₹{categoryTotals.total.toLocaleString('en-IN')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              {categoryTotals.list.map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between gap-4 px-2 py-1 rounded-sm border border-transparent transition-all duration-300 ${hoveredCategory?.name === item.name ? 'bg-[var(--bg-color)] border-emerald-500/10' : ''}`}
                  onMouseEnter={() => setHoveredCategory(item)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(--color-${item.accent || 'slate'}-500, #10b981)` }} />
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)]">{item.name}</span>
                  </div>
                  <span className="text-[9px] font-black font-mono text-[var(--text-primary)]">{item.percentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[8px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] text-center opacity-40">
            Hover a ring to see the amount
          </div>
        </Card>

        {/* Biggest Purchases */}
        <Card className="col-span-12 lg:col-span-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-5 flex flex-col min-h-[340px]">
          <div className="flex items-center justify-between border-b border-[var(--card-border)]/50 pb-2.5 mb-4">
            <div className="flex items-center gap-1.5">
              <ReceiptText className="w-3.5 h-3.5 text-rose-500" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Biggest Purchases</h2>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 text-rose-500 px-2 py-0.5 rounded-sm">Highest Spent</span>
          </div>

          <div className="space-y-2.5 overflow-y-auto scrollbar-hide flex-1">
            {topExpenses.length === 0 ? (
              <div className="flex items-center justify-center h-full text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">
                No spending recorded yet
              </div>
            ) : (
              topExpenses.map((tx, idx) => {
                const barPct = topExpenses[0] && Number(topExpenses[0].amount) > 0
                  ? (Number(tx.amount) / Number(topExpenses[0].amount)) * 100 : 0;
                const config = categoryConfig[tx.category] || { accent: 'slate' };
                return (
                  <div key={tx.id || idx} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[8px] font-black text-[var(--text-secondary)] opacity-50 w-4 shrink-0">#{idx + 1}</span>
                        <span className="text-[9px] font-black text-[var(--text-primary)] tracking-tight truncate capitalize">{tx.title || tx.description}</span>
                        <span className={`shrink-0 px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border border-${config.accent}-500/20 bg-${config.accent}-500/5 text-${config.accent}-400`}>
                          {tx.category}
                        </span>
                      </div>
                      <span className="text-[9px] font-black font-mono text-rose-400 ml-2 shrink-0">₹{Number(tx.amount).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full h-1 bg-[var(--bg-color)] rounded-full overflow-hidden border border-[var(--card-border)]/40">
                      <div
                        className="h-full bg-rose-500/50 rounded-full group-hover:bg-rose-500 transition-all duration-300"
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-3 border-t border-[var(--card-border)]/50 flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-55">
            <span>Total spent: ₹{expense.toLocaleString('en-IN')}</span>
            <span>{topExpenses.length} purchases</span>
          </div>
        </Card>

      </div>

      {/* ROW 3: Month by Month Income vs Spending */}
      <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <CalendarDays className="w-3.5 h-3.5 text-emerald-500" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--text-primary)]">Month by Month</h2>
            </div>
            <p className="text-[8px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Income vs spending each month</p>
          </div>
          <div className="flex items-center gap-4 text-[8px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Money In</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />Money Out</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-1.5 pb-6 relative border-b border-[var(--card-border)]/30" style={{ height: '200px' }}>
          {monthlyTotals.map((data, idx) => {
            const incomeH = (data.income / maxMonthVal) * 100;
            const expenseH = (data.expense / maxMonthVal) * 100;
            const isCurrentMonth = idx === currentMonth;
            const hasData = data.income > 0 || data.expense > 0;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
                title={`${MONTH_NAMES[idx]}: In ₹${data.income.toLocaleString('en-IN')} | Out ₹${data.expense.toLocaleString('en-IN')}`}
              >
                <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: '160px' }}>
                  <motion.div
                    className={`rounded-t-sm transition-all duration-300 ${hasData ? 'bg-emerald-500/50 group-hover:bg-emerald-500' : 'bg-emerald-500/10'}`}
                    style={{ width: '42%', minHeight: data.income > 0 ? '3px' : '2px' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${incomeH}%` }}
                    transition={{ duration: 0.7, delay: idx * 0.04 }}
                  />
                  <motion.div
                    className={`rounded-t-sm transition-all duration-300 ${hasData ? 'bg-rose-500/50 group-hover:bg-rose-500' : 'bg-rose-500/10'}`}
                    style={{ width: '42%', minHeight: data.expense > 0 ? '3px' : '2px' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${expenseH}%` }}
                    transition={{ duration: 0.7, delay: idx * 0.04 + 0.02 }}
                  />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wide ${isCurrentMonth ? 'text-emerald-500' : 'text-[var(--text-secondary)] opacity-70 group-hover:opacity-100'} transition-all duration-200`}>
                  {MONTH_NAMES[idx]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Per-month detail cards — only show months with data */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {monthlyTotals.map((data, idx) => {
            if (data.income === 0 && data.expense === 0) return null;
            const net = data.income - data.expense;
            return (
              <div key={idx} className="bg-[var(--bg-color)]/50 border border-[var(--card-border)]/60 rounded-sm p-4 hover:border-emerald-500/25 transition-all duration-200 group">
                {/* Month name + net */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">{MONTH_NAMES[idx]}</span>
                  <span className={`text-xs font-black font-mono px-1.5 py-0.5 rounded-sm ${net >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                    {net >= 0 ? '+' : ''}₹{Math.abs(net).toLocaleString('en-IN')}
                  </span>
                </div>
                {/* Money In row */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> In
                  </span>
                  <span className="text-sm font-black font-mono text-emerald-400">₹{data.income.toLocaleString('en-IN')}</span>
                </div>
                {/* Money Out row */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" /> Out
                  </span>
                  <span className="text-sm font-black font-mono text-rose-400">₹{data.expense.toLocaleString('en-IN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

    </div>
  );
}
