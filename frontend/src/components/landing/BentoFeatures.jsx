import React from 'react';
import { PieChart, Activity, ShieldCheck, Zap } from 'lucide-react';


export const BentoFeatures = () => (
  <section id="protocol" className="py-15 px-6 relative z-20 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-6xl font-black tracking-tighter uppercase text-[var(--text-primary)] mb-6">Engineered for<br />Precision.</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto font-medium">Absolute financial visibility through superior digital architecture.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 md:row-span-2 bento-card p-12 flex flex-col justify-between group overflow-hidden border border-[var(--card-border)]">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <PieChart className="w-64 h-64 text-[var(--brand-primary)]" />
          </div>
          <div>
            <div className="bg-[var(--brand-primary)]/20 p-4 rounded-2xl w-fit mb-10 border border-[var(--brand-primary)]/20">
              <Activity className="w-8 h-8 text-[var(--brand-primary)]" />
            </div>
            <h4 className="text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-6">Deep Intelligence</h4>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed max-w-md text-lg">
              Visualize spending patterns across dozens of categories with neural-mapped interactive charts.
            </p>
          </div>
          <div className="pt-10 border-t border-[var(--card-border)] flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-primary)] font-bold">System ready</span>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />)}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bento-card p-10 flex items-center gap-10 border border-[var(--card-border)]">
          <div className="p-6 bg-[var(--brand-primary)]/10 rounded-[2rem] border border-[var(--brand-primary)]/20">
            <ShieldCheck className="w-12 h-12 text-[var(--brand-primary)]" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-2">Protocol Security</h4>
            <p className="text-[var(--text-secondary)] text-sm font-black uppercase tracking-widest">AES-256 Bit Encryption</p>
          </div>
        </div>

        <div className="bento-card p-10 flex flex-col justify-center text-center group hover:bg-[var(--brand-primary)]/10 transition-all border border-[var(--card-border)]">
          <Zap className="w-12 h-12 text-[var(--brand-primary)] mx-auto mb-8" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">Instant Sync</h4>
        </div>

        <div className="bento-card p-10 flex flex-col justify-center text-center border border-[var(--card-border)]">
          <div className="text-4xl font-black text-[var(--text-primary)] tracking-tighter mb-2">100K+</div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Global Nodes</h4>
        </div>
      </div>
    </div>
  </section>
);
