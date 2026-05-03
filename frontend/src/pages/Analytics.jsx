import React from 'react';
import { 
  BarChart3, PieChart, TrendingUp, Download, 
  Calendar, Filter, ChevronRight, Activity
} from 'lucide-react';

export default function Analytics({ transactions, categoryConfig }) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Analytics Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-2">Protocol Analysis</h3>
          <h4 className="text-4xl font-black text-white tracking-tighter">System Performance</h4>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-xl">
            <Calendar className="w-4 h-4 text-indigo-400" /> Historical Epoch
          </button>
          <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all">
            <Download className="w-4 h-4" /> Export Ledger
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Chart Bento */}
        <div className="xl:col-span-8 bento-card p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity className="w-32 h-32 text-indigo-500" />
          </div>
          
          <div className="flex items-center justify-between mb-16 relative z-10">
            <div>
              <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Liquidity Flux</h5>
              <p className="text-2xl font-black text-white tracking-tight uppercase">Capital Movement</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Inflow</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-rose-500/10 rounded-xl border border-rose-500/20">
                <div className="w-2 h-2 bg-rose-400 rounded-full shadow-[0_0_10px_rgba(251,113,133,0.8)]" />
                <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Outflow</span>
              </div>
            </div>
          </div>
          
          {/* High-Fidelity Abstract Chart */}
          <div className="h-[350px] flex items-end gap-6 px-4 relative z-10">
            {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75, 40, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col gap-4 group/bar relative">
                <div className="flex-1 flex items-end gap-2">
                  <div 
                    className="flex-1 bg-white/5 rounded-t-xl group-hover/bar:bg-white/10 transition-all duration-500" 
                    style={{ height: `${h * 0.6}%` }} 
                  />
                  <div 
                    className="flex-1 bg-indigo-600/20 rounded-t-xl group-hover/bar:bg-indigo-500 transition-all duration-700 shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]" 
                    style={{ height: `${h}%` }} 
                  />
                </div>
                <span className="text-[9px] font-black text-slate-700 uppercase text-center group-hover/bar:text-indigo-400 transition-colors">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Allocation Bento */}
        <div className="xl:col-span-4 bento-card bg-slate-950 p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />
          
          <div className="mb-12">
            <h5 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-2">Resource Map</h5>
            <p className="text-xl font-black text-white tracking-tighter uppercase">Allocation Hub</p>
          </div>
          
          <div className="space-y-10 relative z-10">
            {Object.entries(categoryConfig).map(([name, config], i) => {
              const val = (35 - i * 4);
              return (
                <div key={name} className="space-y-4 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-xl bg-${config.accent}-500/10 flex items-center justify-center group-hover:bg-${config.accent}-500/20 transition-all`}>
                        <config.icon className={`w-4 h-4 text-${config.accent}-400`} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">{name}</span>
                    </div>
                    <span className="text-xs font-black text-white tracking-widest">{val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${config.accent}-500 shadow-[0_0_15px_-2px_currentColor] transition-all duration-1000`} 
                      style={{ width: `${val}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-16 py-5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] transition-all group backdrop-blur-xl">
            Execute Deep Analysis <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
