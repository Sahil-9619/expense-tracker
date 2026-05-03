import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

export default function Toast({ message, type = 'success' }) {
  const icons = {
    success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    error: <XCircle className="w-4 h-4 text-rose-500" />,
    info: <Info className="w-4 h-4 text-indigo-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500" />
  };

  const styles = {
    success: 'border-emerald-100 bg-emerald-50/50',
    error: 'border-rose-100 bg-rose-50/50',
    info: 'border-indigo-100 bg-indigo-50/50',
    warning: 'border-amber-100 bg-amber-50/50'
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-8 duration-500 pointer-events-none">
      <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl ${styles[type]}`}>
        {icons[type]}
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{message}</span>
      </div>
    </div>
  );
}
