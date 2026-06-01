import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

export function Toast({ message, type = 'success' }) {
  const icons = {
    success: <CheckCircle className="w-4 h-4 text-emerald-400" />,
    error: <XCircle className="w-4 h-4 text-rose-400" />,
    info: <Info className="w-4 h-4 text-indigo-400" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400" />
  };

  const glowStyles = {
    success: 'shadow-[0_0_20px_rgba(52,211,153,0.3)] border-emerald-500/20',
    error: 'shadow-[0_0_20px_rgba(251,113,133,0.3)] border-rose-500/20',
    info: 'shadow-[0_0_20px_rgba(99,102,241,0.3)] border-indigo-500/20',
    warning: 'shadow-[0_0_20px_rgba(251,191,36,0.3)] border-amber-500/20'
  };

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-12 duration-700 pointer-events-none">
      <div className={`flex items-center gap-4 px-8 py-4 rounded-2xl bg-slate-900/80 backdrop-blur-3xl border ${glowStyles[type]}`}>
        {icons[type]}
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">{message}</span>
      </div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      
      <div className="flex flex-col items-center gap-10 relative z-10">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-[var(--card-border)] border-t-[var(--brand-primary)] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_30px_rgba(79,70,229,0.5)]"></div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">Initialize Module</h2>
          <p className="text-slate-500 font-black uppercase tracking-[0.4em] animate-pulse text-[9px]">Decrypting Secure Channels...</p>
        </div>
      </div>
    </div>
  );
}
