import React, { useMemo } from 'react';
import {
  TrendingUp, Download,
  Calendar,
  Zap, Globe, Cpu, Radio
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'motion/react';

export default function Analytics({ transactions = [], wallets = [], budgets = [], goals = [], categoryConfig }) {
  const monthlyBars = useMemo(() => {
    const buckets = Array.from({ length: 12 }, () => 0);
    transactions.forEach((tx) => {
      const month = new Date(tx.date).getMonth();
      buckets[month] += Number(tx.amount || 0);
    });
    const max = Math.max(...buckets, 1);
    return buckets.map((value) => ({ value, height: Math.max((value / max) * 100, value > 0 ? 10 : 0) }));
  }, [transactions]);

  const categoryTotals = useMemo(() => {
    const totals = transactions.reduce((acc, tx) => {
      if (tx.type !== 'expense') return acc;
      acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount || 0);
      return acc;
    }, {});
    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
    return { totals, total };
  }, [transactions]);

  const income = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  const expense = transactions.filter(tx => tx.type !== 'income').reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  const growth = expense ? ((income - expense) / expense) * 100 : income > 0 ? 100 : 0;
  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Analytics</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Detailed financial insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widest rounded-sm border-[var(--card-border)] px-4">
            <Calendar className="mr-2 h-3 w-3" /> Select Date Range
          </Button>
          <Button className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-sm px-4">
            <Download className="mr-2 h-3 w-3" /> Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Real-time Flux Monitor */}
        <Card className="col-span-12 lg:col-span-8 bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-6 overflow-hidden relative group">
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Live Data Feed</span>
          </div>

          <div className="mb-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] mb-1">Spending Trends</h2>
            <p className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tighter">Cash Flow Chart</p>
          </div>

          <div className="h-[280px] flex items-end gap-3 px-2 relative z-10">
            {monthlyBars.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col gap-3 group/bar relative h-full justify-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.height}%` }}
                  transition={{ delay: i * 0.02, duration: 1 }}
                  className={`
                    w-full rounded-t-sm transition-all duration-500 relative
                    ${i % 3 === 0 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-[var(--card-border)] opacity-20 group-hover/bar:opacity-40'}
                  `}
                >
                  {i % 3 === 0 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-[var(--bg-color)] border border-emerald-500/30 px-2 py-0.5 rounded text-[8px] font-black text-emerald-500">
                      ₹{bar.value.toLocaleString()}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-6 pt-4 border-t border-[var(--card-border)]">
            {['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'].map(q => (
              <span key={q} className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">{q}</span>
            ))}
          </div>
        </Card>

        {/* System Vitals & Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-5 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Key Metrics</h2>
            <div className="space-y-4">
              <VitalItem icon={TrendingUp} label="Growth Rate" value={`${growth.toFixed(1)}%`} color={growth >= 0 ? "text-emerald-500" : "text-rose-500"} />
              <VitalItem icon={Globe} label="Wallets" value={wallets.length} color="text-indigo-500" />
              <VitalItem icon={Cpu} label="Budget Rules" value={budgets.length} color="text-amber-500" />
              <VitalItem icon={Radio} label="Active Goals" value={goals.filter(goal => !goal.completed).length} color="text-emerald-500" />
            </div>
          </Card>

          <Card className="bg-emerald-600 border border-emerald-500/20 rounded-sm p-6 text-white overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Zap size={100} strokeWidth={3} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">PRO Performance</h3>
              <p className="text-xl font-black uppercase tracking-tighter mb-4">Premium Active</p>
              <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-black uppercase tracking-widest text-[9px] h-9 rounded-sm">
                View Recommendations
              </Button>
            </div>
          </Card>
        </div>

        {/* Category Resource Distribution */}
        <Card className="col-span-12 bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] mb-8">Spending by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {Object.entries(categoryConfig).map(([name, config]) => {
              const percentage = categoryTotals.total ? ((categoryTotals.totals[name] || 0) / categoryTotals.total) * 100 : 0;
              return (
              <div key={name} className="flex flex-col items-center text-center group">
                <div className={`w-12 h-12 rounded-lg bg-${config.accent}-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform group-hover:bg-${config.accent}-500/20`}>
                  <config.icon className={`w-6 h-6 text-${config.accent}-500`} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-1">{name}</span>
                <span className="text-[11px] font-black font-mono text-[var(--text-primary)]">{percentage.toFixed(1)}%</span>
              </div>
            )})}
          </div>
        </Card>
      </div>
    </div>
  );
}

function VitalItem({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--card-border)]/50 pb-3 last:border-0 last:pb-0">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded bg-[var(--bg-color)]/50 border border-[var(--card-border)] flex items-center justify-center text-[var(--text-secondary)]">
          <Icon size={14} />
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">{label}</span>
      </div>
      <span className={`text-[10px] font-black font-mono ${color}`}>{value}</span>
    </div>
  );
}

