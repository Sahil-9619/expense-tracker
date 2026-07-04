import React, { useState } from 'react';
import { X, Plus, Wallet, Tag, Calendar, DollarSign, Zap } from 'lucide-react';

export default function AddTransactionModal({ onClose, onAdd, categoryConfig }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = Object.keys(categoryConfig);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-xl relative animate-in zoom-in-95 slide-in-from-bottom-12 duration-700">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="bento-card p-1">
          <div className="bg-slate-950 rounded-[1.9rem] overflow-hidden">
            {/* Header */}
            <div className="px-10 pt-10 pb-8 flex items-center justify-between border-b border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="flex items-center gap-5">
                <div className="bg-indigo-600 p-3 rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Initialize Entry</h2>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mt-1">Transaction Protocol Layer</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card-bg)] rounded-2xl transition-all border border-transparent hover:border-[var(--card-border)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'expense'})}
                  className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${formData.type === 'expense' ? 'bg-[var(--text-primary)] text-[var(--bg-color)] border-[var(--text-primary)]' : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  Expense
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'income'})}
                  className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${formData.type === 'income' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  Inflow
                </button>
              </div>

              <div className="space-y-6">
                <AuthInput 
                  icon={Wallet} 
                  label="Transaction Label" 
                  placeholder="System description..." 
                  value={formData.title}
                  onChange={(val) => setFormData({...formData, title: val})}
                />

                <div className="grid grid-cols-2 gap-6">
                  <AuthInput 
                    icon={DollarSign} 
                    label="Amount" 
                    placeholder="0.00" 
                    type="number"
                    value={formData.amount}
                    onChange={(val) => setFormData({...formData, amount: val})}
                  />
                  <AuthInput 
                    icon={Calendar} 
                    label="Temporal Point" 
                    type="date"
                    value={formData.date}
                    onChange={(val) => setFormData({...formData, date: val})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Classification Hub</label>
                  <div className="relative group">
                    <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                    <select 
                      className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl px-14 py-4 text-sm font-bold text-[var(--text-primary)] focus:bg-[var(--card-bg)] focus:border-indigo-500/50 transition-all outline-none appearance-none cursor-pointer"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3 group"
              >
                Execute Transaction <Zap className="w-4 h-4 group-hover:animate-pulse" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthInput({ icon: Icon, label, placeholder, type = "text", value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
        <input 
          type={type} 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onWheel={(e) => { if(type === 'number') e.target.blur(); }}
          className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl px-14 py-4 text-sm font-bold text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:bg-[var(--card-bg)] focus:border-indigo-500/50 transition-all outline-none"
        />
      </div>
    </div>
  );
}
