import React from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Command 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';

  return (
    <header className="h-12 border-b border-[var(--card-border)] flex items-center justify-between px-4 shrink-0 bg-[var(--bg-color)]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-2 w-64">
        <div className="flex items-center gap-2 px-2 py-1 rounded-md text-xs w-full bg-[var(--input-bg)] border border-[var(--card-border)] text-[var(--text-secondary)]">
          <Search size={12} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="bg-transparent border-none outline-none w-full placeholder-inherit text-[var(--text-primary)]"
          />
          <div className="flex items-center gap-0.5 opacity-50 font-mono">
            <Command size={10} /> <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme} 
          className="p-1.5 rounded-md hover:bg-[var(--card-border)] transition-colors text-[var(--text-secondary)]"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button className="p-1.5 rounded-md hover:bg-[var(--card-border)] transition-colors relative text-[var(--text-secondary)]">
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
        </button>
        
        <div className="h-4 w-px bg-[var(--card-border)] mx-1"></div>
        
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-black leading-none text-[var(--text-primary)] uppercase tracking-tighter">
              {user?.name || 'Authorized User'}
            </p>
            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Pro Plan</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 border border-[var(--card-border)] flex items-center justify-center text-[10px] font-black text-white">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
