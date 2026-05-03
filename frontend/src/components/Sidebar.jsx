import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, PieChart, Settings, 
  ChevronLeft, ChevronRight, LogOut, Wallet, Plus 
} from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar, onLogout }) {
  const navItems = [
    { icon: Home, label: 'Feed', path: '/dashboard' },
    { icon: PieChart, label: 'Stats', path: '/analytics' },
    { icon: Settings, label: 'Prefs', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container - Floating Bento Design */}
      <aside 
        className={`fixed md:relative top-0 left-0 h-full z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? 'w-28 translate-x-0' : 'w-0 -translate-x-full md:w-24 md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full py-6 bg-slate-950/80 rounded-[3rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
          
          {/* Logo / Top Toggle */}
          <div className="flex flex-col items-center gap-10 mb-12 pt-4">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.3)] group-hover:rotate-12 transition-transform duration-500">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            
            <button 
              onClick={toggleSidebar}
              className="p-3 text-slate-600 hover:text-white transition-all bg-white/5 rounded-2xl border border-white/5"
            >
              {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation - Icon Focused */}
          <nav className="flex-1 flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  group relative flex flex-col items-center justify-center w-14 h-14 rounded-[1.5rem] transition-all duration-500
                  ${isActive 
                    ? 'bg-white/10 text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] border border-white/10' 
                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="absolute left-full ml-6 px-4 py-2 bg-slate-900 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 backdrop-blur-2xl">
                  {item.label}
                </span>
                
                {/* Active Indicator Dot */}
                <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(99,102,241,0.8)] ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
              </NavLink>
            ))}

            <div className="w-8 h-[1px] bg-white/5 my-4" />

            <button 
              className="w-14 h-14 flex items-center justify-center bg-indigo-600 text-white rounded-[1.5rem] shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:scale-110 active:scale-95 transition-all group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500 relative z-10" />
            </button>
          </nav>

          {/* Bottom Action */}
          <div className="flex flex-col items-center gap-6 pb-4">
            <button 
              onClick={onLogout}
              className="w-14 h-14 flex items-center justify-center text-slate-600 hover:text-rose-400 hover:bg-rose-400/5 border border-transparent hover:border-rose-400/20 rounded-[1.5rem] transition-all group"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
