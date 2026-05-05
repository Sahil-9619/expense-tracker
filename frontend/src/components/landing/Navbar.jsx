import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HiMenu, HiX, HiSparkles } from 'react-icons/hi';
import { BRAND_NAME } from '../../lib/constants';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Protocol', 'Intelligence', 'Security'];

  return (
    <nav className="fixed top-0 inset-x-0 h-20 z-[100] px-4 md:px-6 flex items-center justify-center pointer-events-none">
      <div className={`w-full max-w-7xl flex items-center justify-between px-6 md:px-10 py-3 border transition-all duration-500 pointer-events-auto ${scrolled
          ? 'bg-[var(--bg-color)]/90 backdrop-blur-xl border-[var(--accent-color)]/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] translate-y-2'
          : 'bg-[var(--card-bg)] backdrop-blur-md border-[var(--card-border)] rounded-full'
        }`}>
        <Link to="/" className="flex items-center gap-3 group cursor-pointer relative z-[110]">
          <div className="bg-emerald-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <HiSparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase text-[var(--text-primary)] font-display">{BRAND_NAME}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="relative text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] hover:text-emerald-500 transition-all group/link"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-emerald-500 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-center" />
            </a>
          ))}
          <Link to="/auth" className="px-6 py-2 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Login
          </Link>
        </div>

        {/* Global Actions (Always Visible) */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto md:ml-0 relative z-[110]">
          <AnimatedThemeToggler variant="circle" />
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-primary)] hover:bg-[var(--card-bg)] rounded-xl transition-all active:scale-90 cursor-pointer"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay - Floating Half-Height UI */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Dim Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 md:hidden z-[102]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="fixed top-24 left-4 right-4 max-w-lg mx-auto bg-[var(--bg-color)] backdrop-blur-3xl border border-[var(--card-border)] rounded-[2rem] p-6 z-[105] shadow-[0_40px_100px_rgba(0,0,0,0.2)] md:hidden overflow-hidden"
              >
                {/* Subtle Decorative Glow */}
                <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-600/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-2">
                  {/* Small Left Aligned Links with Separators */}
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={`#${link.toLowerCase()}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block w-full py-4 text-sm font-bold text-[var(--text-secondary)] hover:text-emerald-500 transition-colors ${i !== navLinks.length - 1 ? 'border-b border-[var(--card-border)]' : ''}`}
                      >
                        {link}
                      </a>
                    </motion.div>
                  ))}

                  <div className="pt-4 flex flex-col gap-4">
                    <Link
                      to="/auth"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-4 bg-emerald-600 text-white rounded-xl text-center text-[10px] font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(16,185,129,0.3)] hover:bg-emerald-500 transition-all"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
