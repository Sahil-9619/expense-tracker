import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { HiMenu } from 'react-icons/hi';
import { cn } from '../lib/utils';
import { menuItems } from './Sidebar';
import { AnimatedThemeToggler } from './UI/animated-theme-toggler';
import { fetchUserProfile } from '../redux/slices/authSlice';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function Header({ isSidebarOpen, onToggleSidebar }) {
  const location = useLocation();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const pathname = location.pathname;

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const currentItem = menuItems.find(item => item.path === pathname);
  const currentTitle = currentItem?.label || 'Dashboard';

  return (
    <header className="bg-[var(--bg-color)] border-b border-[var(--card-border)] px-6 py-2.5 flex items-center justify-between sticky top-0 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className={cn(
            "p-2 hover:bg-emerald-500/10 rounded-xl text-emerald-500 transition-all duration-300 md:hidden flex"
          )}
        >
          <HiMenu size={24} />
        </button>
        <div>
          <h1 className="font-serif text-xl text-[var(--text-primary)] leading-tight">{currentTitle}</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] mt-0.5 font-bold">
            {loading ? 'Updating profile...' : `Welcome back, ${user?.name || 'Authorized User'}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-emerald-500 hover:bg-emerald-500/5 transition-all cursor-pointer flex items-center justify-center"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <AnimatedThemeToggler
            variant="circle"
            duration={500}
            className="p-1.5 border-none bg-transparent hover:bg-emerald-500/5"
          />
        </div>

        <div className="flex items-center gap-4 border-l border-[var(--card-border)] pl-6">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-tight">
              {user?.name || 'User'}
            </span>
            <span className="text-[10px] text-emerald-500 font-black tracking-widest opacity-80">
              {user?.email || 'email'}
            </span>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-xl bg-[var(--brand-primary)] border border-[var(--card-border)] shadow-lg flex items-center justify-center text-white font-black cursor-pointer overflow-hidden"
          >
            {user?.profile_pic ? (
              <img src={user.profile_pic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user?.name?.[0]?.toUpperCase() || 'U'
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
}
