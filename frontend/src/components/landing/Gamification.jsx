import { Star, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { ThreeDCard } from './LandingUI';

export const Gamification = () => (
  <section id="intelligence" className="py-15 px-6 relative z-20">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
        <div>
          <h2 className="text-[20px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-6">Neural Feedback</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-[var(--text-primary)] font-display">Gamify Your<br />Wealth Journey.</h3>
        </div>
        <p className="max-w-md text-[var(--text-secondary)] font-medium text-lg leading-relaxed opacity-80">
          Earn XP for every optimized decision and unlock elite status tiers as you build your empire.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Star, level: 1, name: "Novice Saver", xp: 1500, max: 1500, perks: ["Basic Budgeting", "Standard Analytics"], color: "emerald", unlocked: true },
          { icon: TrendingUp, level: 4, name: "Budget Master", xp: 8400, max: 10000, perks: ["Advanced Insights", "Export Protocols"], color: "emerald", unlocked: true },
          { icon: Award, level: 10, name: "Wealth Architect", xp: 0, max: 50000, perks: ["AI Advisor", "Custom Modules"], color: "emerald", unlocked: false }
        ].map((tier, i) => (
          <ThreeDCard key={i}>
            <div className="flex justify-between items-start mb-10">
              <div className="p-4 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <tier.icon className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] border border-[var(--card-border)] px-3 py-1.5 rounded-lg bg-[var(--card-bg)]">
                {tier.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>

            <h4 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-2 font-display">{tier.name}</h4>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Lvl {tier.level}</span>
              <div className="flex-1 h-1.5 bg-[var(--card-bg)] rounded-full overflow-hidden border border-[var(--card-border)]">
                <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000" style={{ width: `${(tier.xp / tier.max) * 100}%` }} />
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-[var(--card-border)]">
              {tier.perks.map(perk => (
                <div key={perk} className="flex items-center gap-3">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-70">{perk}</span>
                </div>
              ))}
            </div>
          </ThreeDCard>
        ))}
      </div>
    </div>
  </section>
);
