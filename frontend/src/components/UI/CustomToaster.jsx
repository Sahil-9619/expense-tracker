import React, { useState, useEffect } from 'react';
import { CircleCheck, XOctagon } from 'lucide-react';

let toastListeners = [];
let nextId = 0;

export const toast = {
  success: (message, options = {}) => {
    toastListeners.forEach(listener => listener({ id: nextId++, type: 'success', message, ...options }));
  },
  error: (message, options = {}) => {
    toastListeners.forEach(listener => listener({ id: nextId++, type: 'error', message, ...options }));
  }
};

export function CustomToaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const addToast = (newToast) => {
      setToasts(prev => [...prev, newToast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, newToast.duration || 4000);
    };

    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter(listener => listener !== addToast);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`
            flex items-center gap-3 min-w-[300px] max-w-sm px-4 py-3 rounded-lg border shadow-lg backdrop-blur-md pointer-events-auto
            animate-in slide-in-from-top-2 duration-300
            ${t.type === 'success' 
              ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400 shadow-emerald-500/5' 
              : 'bg-red-950/80 border-red-500/30 text-red-400 shadow-red-500/5'}
          `}
        >
          {t.type === 'success' ? (
            <CircleCheck className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <XOctagon className="w-4 h-4 shrink-0 text-red-400" />
          )}
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-wider">{t.type === 'success' ? 'Success' : 'Error'}</span>
            <span className="text-[10px] font-bold opacity-80 mt-0.5 leading-tight">{t.message}</span>
          </div>
          <button 
            type="button"
            onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
            className="ml-auto text-[10px] opacity-40 hover:opacity-100 transition-opacity self-start mt-0.5"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
