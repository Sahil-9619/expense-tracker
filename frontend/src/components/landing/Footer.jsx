import { Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_NAME } from '../../lib/constants';
const BRAND_SLOGAN = "The Neural-Mapped Financial Operating System";

export const Footer = () => (
  <footer className="py-20 px-6 relative z-20 border-t border-[var(--card-border)] backdrop-blur-md pt-32 overflow-hidden">
    {/* Subtle Glow */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--brand-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[var(--brand-primary)] shadow-[0_0_20px_var(--brand-primary)]" />
            <span className="text-3xl font-black tracking-tighter uppercase text-[var(--text-primary)] font-display">{BRAND_NAME}</span>
          </div>
          <p className="text-[var(--text-secondary)] font-medium max-w-sm text-sm leading-relaxed">
            {BRAND_SLOGAN}. Empowering the next generation of wealth architects through precision engineering.
          </p>
          <div className="flex gap-6">
            {[MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/50 transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {[
          { title: "Platform", links: ["Intelligence", "Security", "Protocols", "Gamification"] },
          { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          { title: "Intelligence", links: ["Documentation", "API Subnet", "Audit Log", "Status"] }
        ].map((column, i) => (
          <div key={i} className="space-y-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--brand-primary)]">{column.title}</h5>
            <ul className="space-y-4">
              {column.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright Bar */}
      <div className="pt-12 border-t border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)]">
          2026@ <span className="text-[var(--brand-primary)]">{BRAND_NAME}</span> — ALL RIGHTS RESERVED
        </p>
        <div className="flex gap-10">
          {['Privacy Policy', 'Terms of Service', 'Cookie Protocol'].map(link => (
            <a key={link} href="#" className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
