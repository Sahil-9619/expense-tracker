import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, 
  Wallet, 
  ArrowRightLeft, 
  PieChart, 
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  Target,
  TrendingUp,
  FileText,
  LifeBuoy,
  UserCircle
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { BRAND_NAME } from '../lib/constants';

const BRAND_INITIALS = BRAND_NAME
  .split(' ')
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

export const menuItems = [
  // Overview
  { id: 'dashboard', icon: LayoutDashboard, path: '/dashboard', label: 'Dashboard', section: 'Overview' },
  { id: 'wallets', icon: Wallet, path: '/dashboard/wallets', label: 'Wallets', section: 'Overview' },
  { id: 'transactions', icon: ArrowRightLeft, path: '/dashboard/transactions', label: 'Transactions', section: 'Overview' },
  
  // Analysis
  { id: 'analytics', icon: PieChart, path: '/dashboard/analytics', label: 'Analytics', section: 'Analysis' },
  { id: 'reports', icon: FileText, path: '/dashboard/reports', label: 'Reports', section: 'Analysis' },
  
  // Planning
  { id: 'budgets', icon: TrendingUp, path: '/dashboard/budgets', label: 'Budgets', section: 'Planning' },
  { id: 'goals', icon: Target, path: '/dashboard/goals', label: 'Goals', section: 'Planning' },
  
  // System
  { id: 'settings', icon: Settings, path: '/dashboard/settings', label: 'Settings', section: 'System' },
  { id: 'help', icon: LifeBuoy, path: '/dashboard/help', label: 'Help & Support', section: 'System' },
];

export default function Sidebar({ onLogout, isOpen, setIsOpen }) {
  const { user } = useSelector((state) => state.auth);

  const sections = ['Overview', 'Analysis', 'Planning', 'System'];

  return (
    <>
      {/* Mobile Toggle Button (Floating) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-3 left-4 z-[60] p-2 rounded-md bg-[var(--bg-color)] border border-emerald-500/50 backdrop-blur-xl text-emerald-500 md:hidden transition-all shadow-lg active:scale-95"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[45] md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav className={`
        fixed inset-y-0 left-0 z-50 flex flex-col py-4 border-r border-[var(--card-border)] bg-[var(--bg-color)] h-screen transition-all duration-300 ease-in-out
        ${isOpen ? 'w-60 translate-x-0 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.5)]' : 'w-16 -translate-x-full md:translate-x-0'}
        md:relative md:shadow-[4px_0_24px_-12px_rgba(0,0,0,0.3)]
      `}>
        {/* Desktop Collapse Toggle (On Border) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            absolute -right-3 top-12 z-[100] w-6 h-6 rounded-sm 
            bg-[var(--bg-color)] border border-emerald-500 
            flex items-center justify-center text-emerald-500 
            hover:bg-emerald-500 hover:text-white
            transition-all duration-300 
            shadow-[0_4px_15px_-3px_rgba(16,185,129,0.4)] group hidden md:flex
          `}
        >
          {isOpen ? (
            <ChevronLeft size={14} className="transition-transform" />
          ) : (
            <ChevronRight size={14} className="transition-transform" />
          )}
        </button>

        {/* Header/Logo Section */}
        <div className={`flex items-center px-4 mb-8 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-500/20 shrink-0">
              {BRAND_INITIALS}
            </div>
            {isOpen && (
              <span className="font-black text-sm tracking-tight text-[var(--text-primary)] uppercase">
                {BRAND_NAME}
              </span>
            )}
          </div>
        </div>

        {/* Navigation Items grouped by sections */}
        <div className="flex flex-col gap-6 flex-1 px-3 overflow-y-auto custom-scrollbar no-scrollbar">
          {sections.map(section => {
            const items = menuItems.filter(item => item.section === section);
            if (items.length === 0) return null;

            return (
              <div key={section} className="flex flex-col gap-1">
                {isOpen && (
                  <span className="px-2.5 text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-30 mb-1">
                    {section}
                  </span>
                )}
                {items.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 p-2 rounded-sm transition-all relative group
                      ${isActive 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]' 
                        : 'text-[var(--text-secondary)] hover:bg-emerald-500/5 hover:text-emerald-500/80'}
                      ${!isOpen ? 'justify-center' : ''}
                    `}
                  >
                    <item.icon size={16} strokeWidth={2.5} className="shrink-0" />
                    
                    {isOpen && (
                      <span className="text-[10px] font-black uppercase tracking-widest overflow-hidden whitespace-nowrap">
                        {item.label}
                      </span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <span className="absolute left-full ml-4 px-2 py-1 bg-[var(--card-bg)] text-[var(--text-primary)] text-[9px] font-black uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-[100] border border-[var(--card-border)] shadow-xl">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </div>

        {/* Footer Section - Completed Bottom Section */}
        <div className="mt-auto px-2 pt-4 border-t border-[var(--card-border)] bg-[var(--bg-color)]/50 backdrop-blur-sm">
          {isOpen ? (
            <div className="flex flex-col gap-4 mb-2">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-[var(--brand-primary)] to-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-lg overflow-hidden shrink-0 border border-[var(--card-border)]">
                  {user?.profile_pic ? (
                    <img src={user.profile_pic} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black text-[var(--text-primary)] truncate uppercase tracking-tight">
                    {user?.name || 'Authorized User'}
                  </span>
                  <span className="text-[8px] text-emerald-500 font-bold truncate opacity-80 uppercase tracking-[0.2em]">
                    PRO MEMBER
                  </span>
                </div>
              </div>
              
              <button 
                onClick={onLogout}
                className="flex items-center justify-between w-full p-2 rounded-sm bg-rose-500/5 text-rose-500 hover:bg-rose-500/10 transition-all border border-rose-500/10 group"
              >
                <div className="flex items-center gap-2.5">
                  <LogOut size={14} strokeWidth={3} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Logout</span>
                </div>
                <ChevronRight size={12} className="opacity-40 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 pb-2">
              <div className="w-8 h-8 rounded-sm bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 cursor-pointer hover:bg-emerald-500 hover:text-white transition-all">
                <UserCircle size={18} />
              </div>
              <button 
                onClick={onLogout}
                className="p-2 rounded-sm text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
              >
                <LogOut size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

