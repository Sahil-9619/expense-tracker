import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowRightLeft, 
  PieChart, 
  Settings,
  LogOut
} from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, path: '/dashboard', label: 'Dashboard' },
    { id: 'wallets', icon: Wallet, path: '/dashboard/wallets', label: 'Wallets' },
    { id: 'transactions', icon: ArrowRightLeft, path: '/dashboard/transactions', label: 'Transactions' },
    { id: 'analytics', icon: PieChart, path: '/dashboard/analytics', label: 'Analytics' },
  ];

  return (
    <nav className="w-14 flex flex-col items-center py-4 border-r border-[var(--card-border)] bg-[var(--card-bg)] h-screen sticky top-0 shrink-0 z-50">
      {/* Brand Logo / Initials */}
      <div className="w-8 h-8 rounded bg-gradient-to-tr from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xs mb-8 shadow-lg shadow-emerald-500/20">
        SS
      </div>

      <div className="flex flex-col gap-4 flex-1 w-full items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `
              p-2 rounded-lg transition-all relative group
              ${isActive 
                ? 'bg-[var(--bg-color)] text-emerald-500 border border-[var(--card-border)] shadow-sm' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-color)] hover:text-[var(--text-primary)]'}
            `}
          >
            <item.icon size={16} strokeWidth={2} />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10 shadow-xl">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full items-center mt-auto">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) => `
            p-2 rounded-lg transition-all relative group
            ${isActive 
              ? 'bg-[var(--bg-color)] text-emerald-500 border border-[var(--card-border)]' 
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-color)] hover:text-[var(--text-primary)]'}
          `}
        >
          <Settings size={16} strokeWidth={2} />
          <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10">
            Settings
          </span>
        </NavLink>

        <button 
          onClick={onLogout}
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-rose-500 hover:bg-rose-500/5 transition-all group relative"
        >
          <LogOut size={16} strokeWidth={2} />
          <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-[100] border border-white/10">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
}
