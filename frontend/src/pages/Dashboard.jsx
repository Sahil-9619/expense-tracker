import React, { useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, Wallet, 
  ArrowUpRight, ArrowDownRight, Clock,
  Activity, Zap, Target
} from 'lucide-react';

export default function Dashboard({ transactions, onAddClick, categoryConfig }) {
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

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Liquid Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard title="System Liquidity" value={balance} icon={Wallet} trend="+2.4%" color="indigo" />
        <MetricCard title="Protocol Inflow" value={totalIncome} icon={TrendingUp} trend="+12%" color="emerald" />
        <MetricCard title="Circuit Outflow" value={totalExpense} icon={TrendingDown} trend="-4%" color="rose" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Real-time Ledger */}
        <div className="xl:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-2">Real-time Stream</h3>
              <h4 className="text-3xl font-black text-white tracking-tighter">Transaction Ledger</h4>
            </div>
            <button 
              onClick={onAddClick}
              className="px-8 py-4 bg-indigo-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all active:scale-95 group"
            >
              Add Entry <Zap className="w-3.5 h-3.5 inline ml-2 group-hover:animate-pulse" />
            </button>
          </div>

          <div className="bento-card bg-slate-900/40 border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Transaction Metadata</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Classification</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] text-right">Magnitude</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sortedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-10 py-32 text-center">
                        <Activity className="w-12 h-12 text-slate-800 mx-auto mb-6 animate-pulse" />
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Awaiting system input...</p>
                      </td>
                    </tr>
                  ) : (
                    sortedTransactions.map((tx) => {
                      const config = categoryConfig[tx.category] || categoryConfig['Other'];
                      const Icon = config.icon;
                      return (
                        <tr key={tx.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-6">
                              <div className={`w-12 h-12 rounded-2xl bg-${config.accent}-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-${config.accent}-500/20 transition-all`}>
                                <Icon className={`w-5 h-5 text-${config.accent}-400`} />
                              </div>
                              <div>
                                <p className="text-sm font-black text-white tracking-tight">{tx.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Clock className="w-3 h-3 text-slate-600" />
                                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{tx.date}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <span className={`px-4 py-1.5 rounded-full bg-${config.accent}-500/10 text-${config.accent}-400 text-[9px] font-black uppercase tracking-[0.2em] border border-${config.accent}-500/20`}>
                              {tx.category}
                            </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <p className={`text-lg font-black tracking-tighter ${tx.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                              {tx.type === 'income' ? '+' : '-'}₹{Math.abs(tx.amount).toFixed(2)}
                            </p>
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

        {/* Intelligence Bento Section */}
        <div className="xl:col-span-4 space-y-8">
          <div>
            <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-2">Heuristic Hub</h3>
            <h4 className="text-3xl font-black text-white tracking-tighter">System Intel</h4>
          </div>
          
          <div className="bento-card p-10 space-y-10">
            <div className="flex items-center justify-between pb-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <Target className="w-5 h-5 text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Efficiency Goal</span>
              </div>
              <span className="text-xl font-black text-indigo-400 tracking-tighter">84%</span>
            </div>

            <div className="space-y-8">
              {Object.entries(categoryConfig).slice(0, 5).map(([name, config]) => {
                const Icon = config.icon;
                const percent = Math.floor(Math.random() * 60 + 20);
                return (
                  <div key={name} className="space-y-4 group cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl bg-${config.accent}-500/10 flex items-center justify-center group-hover:bg-${config.accent}-500/20 transition-all`}>
                          <Icon className={`w-4 h-4 text-${config.accent}-400`} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{name}</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-600 tracking-widest">{percent}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${config.accent}-500 shadow-[0_0_15px_-2px_currentColor] transition-all duration-1000`} 
                        style={{ width: `${percent}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bento-card p-8 bg-indigo-600/10 border-indigo-500/20">
            <div className="flex items-center gap-4 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h5 className="text-[10px] font-black uppercase tracking-widest">Protocol Insight</h5>
            </div>
            <p className="text-xs font-medium text-slate-400 leading-relaxed">
              Your spending in <span className="text-white font-bold">Shopping</span> is 12% lower than last epoch. Optimizing liquidity...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, trend, color }) {
  const colorMap = {
    indigo: 'from-indigo-600 to-indigo-900 shadow-indigo-500/10',
    emerald: 'from-emerald-600 to-emerald-900 shadow-emerald-500/10',
    rose: 'from-rose-600 to-rose-900 shadow-rose-500/10'
  };

  return (
    <div className={`relative p-10 rounded-[3rem] bg-gradient-to-br ${colorMap[color]} text-white border border-white/5 shadow-2xl group hover:-translate-y-2 transition-all duration-700 overflow-hidden`}>
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/5">
            {trend.startsWith('+') ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" /> : <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />}
            <span className="text-[10px] font-black tracking-widest">{trend}</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-2">{title}</h4>
          <p className="text-4xl font-black tracking-tighter">₹{value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      </div>
    </div>
  );
}
