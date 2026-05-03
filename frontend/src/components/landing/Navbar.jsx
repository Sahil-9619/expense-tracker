import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { BRAND_NAME } from '../../lib/constants';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 h-20 z-[100] px-4 md:px-6 flex items-center justify-center transition-all duration-500 ${scrolled ? 'translate-y-2' : ''}`}>
      <div className={`w-full max-w-7xl flex items-center justify-between px-6 md:px-10 py-3 md:py-4 rounded-full border transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-[#0a0f1e]/80 backdrop-blur-md border-emerald-500/10 shadow-2xl' : 'bg-transparent border-transparent'}`}>
        <div className="flex items-center gap-3 group cursor-pointer relative z-[110]">
          <div className="bg-emerald-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase text-white font-display">{BRAND_NAME}</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {['Protocol', 'Intelligence', 'Security'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-emerald-500 hover:underline hover:decoration-emerald-500 underline-offset-8 decoration-1 transition-all">{link}</a>
          ))}
          <Link to="/login" className="px-6 py-2.5 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Log in
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-[110] p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-3xl transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          {['Protocol', 'Intelligence', 'Security'].map(link => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-[0.4em] text-white hover:text-emerald-500 transition-colors"
            >
              {link}
            </a>
          ))}
          <Link 
            to="/login" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-12 py-4 bg-emerald-600 text-white rounded-full text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          >
            Access Platform
          </Link>
        </div>
      </div>
    </nav>
  );
};
