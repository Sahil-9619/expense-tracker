import React, { useState } from 'react';
import { 
  User, Shield, Bell, CreditCard, 
  Globe, Zap, ChevronRight, Camera, Terminal
} from 'lucide-react';

export default function Settings({ user, setUser, showToast }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
    showToast("System Identity Updated", "success");
  };

  return (
    <div className="max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      <div>
        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] mb-2">Module: System Interface</h3>
        <h4 className="text-4xl font-black text-white tracking-tighter">Global Preferences</h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Rail */}
        <div className="lg:col-span-3 space-y-3">
          <SettingsNav icon={User} label="Identity" active />
          <SettingsNav icon={Shield} label="Security" />
          <SettingsNav icon={Bell} label="Protocol" />
          <SettingsNav icon={CreditCard} label="Ledger" />
          <SettingsNav icon={Globe} label="Region" />
          <SettingsNav icon={Terminal} label="API Core" />
        </div>

        {/* Configuration Hub */}
        <div className="lg:col-span-9 space-y-8">
          <div className="bento-card p-12 bg-slate-950/40 border-white/5 space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Zap className="w-32 h-32 text-indigo-500" />
            </div>

            {/* Identity Profile Section */}
            <div className="flex items-center gap-10 relative z-10">
              <div className="relative group">
                <div className="w-28 h-28 rounded-[2.5rem] bg-slate-900 overflow-hidden border-4 border-white/5 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] transition-transform duration-500 group-hover:scale-105">
                  <img src={user?.avatar} alt="Identity" className="w-full h-full object-cover" />
                </div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border border-white/10">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h5 className="text-2xl font-black text-white tracking-tighter uppercase">Authorized Identity</h5>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">Initialized Epoch: May 2026</p>
              </div>
            </div>

            {/* Form Protocol */}
            <form onSubmit={handleUpdate} className="space-y-8 relative z-10 max-w-xl">
              <div className="space-y-6">
                <SettingsInput label="Protocol Identity" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                <SettingsInput label="Communication Node" type="email" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
              </div>

              <button 
                type="submit"
                className="px-12 py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] group"
              >
                Sync Changes <Zap className="w-4 h-4 inline ml-2 group-hover:animate-pulse" />
              </button>
            </form>
          </div>

          {/* Danger Zone: High Risk Operations */}
          <div className="bento-card p-10 bg-rose-500/5 border-rose-500/10 flex flex-col md:flex-row items-center justify-between gap-6 group">
            <div>
              <h5 className="text-sm font-black text-rose-400 uppercase tracking-tight group-hover:text-rose-300 transition-colors">Terminus Operation</h5>
              <p className="text-[10px] font-bold text-rose-500/60 uppercase tracking-widest mt-1">Permanently purge all protocol data</p>
            </div>
            <button className="px-8 py-4 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-xl shadow-rose-900/5 active:scale-95">
              Execute Purge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsNav({ icon: Icon, label, active = false }) {
  return (
    <button className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] transition-all duration-500 group ${active ? 'bg-white/10 border border-white/10 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] text-white' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent hover:border-white/5'}`}>
      <div className="flex items-center gap-4">
        <Icon className={`w-4 h-4 transition-colors ${active ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <ChevronRight className={`w-4 h-4 transition-all ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
    </button>
  );
}

function SettingsInput({ label, value, onChange, type = "text" }) {
  return (
    <div className="space-y-3">
      <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">{label}</label>
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-sm font-bold text-white focus:bg-white/[0.05] focus:border-indigo-500/50 focus:ring-8 focus:ring-indigo-500/5 transition-all outline-none"
      />
    </div>
  );
}
