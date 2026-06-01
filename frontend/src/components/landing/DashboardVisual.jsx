import { CheckCircle2, Zap, BarChart3, Users2 } from 'lucide-react';

export const DashboardVisual = () => (
  <section className="py-10 md:pt-20 px-6  relative z-20 overflow-hidden ">
    {/* Subtle Theme Glow */}
    <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--brand-primary)]/5 blur-[150px] pointer-events-none transform-gpu will-change-transform" />

    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left Side: 3D Visual */}
        <div className="relative group perspective-1000 order-2 lg:order-1">
          <div className="absolute inset-0 bg-[var(--brand-primary)]/20 blur-[120px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none transform-gpu will-change-transform" />
          <div className="relative z-10 aspect-[4/3] md:aspect-[16/10] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_0_100px_-20px_var(--brand-primary)] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] [transform:rotateY(10deg)_rotateX(5deg)_translateZ(0)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_translateZ(0)] will-change-transform">
            <img
              src="/happy_people.png"
              alt="Users enjoying financial management"
              className="w-full h-full object-cover opacity-100 scale-110 group-hover:scale-100 transition-transform duration-1000 rounded-[2.5rem] md:rounded-[3.5rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)]/60 via-transparent to-transparent opacity-90" />
          </div>


        </div>

        {/* Right Side: Content & Benefits */}
        <div className="order-1 lg:order-2">
          <h2 className="text-[20px] font-black uppercase tracking-[0.5em] text-[var(--brand-primary)] mb-6">Software Intelligence</h2>
          <h3 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-8 font-display leading-tight">
            Transcend Your <br />
            <span className="text-[var(--brand-primary)]">Calculations.</span>
          </h3>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl font-medium leading-relaxed mb-12">
            Why manually track when you can architect your wealth? Our protocol automates the complexity so you can focus on growth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: Zap, title: "Instant Sync", desc: "Real-time updates across all nodes." },
              { icon: CheckCircle2, title: "Auto-Sort", desc: "AI categorizes every micro-transaction." },
              { icon: BarChart3, title: "Deep Insights", desc: "Predictive analytics for your future." },
              { icon: Users2, title: "Family Access", desc: "Collaborative wealth management." },
            ].map((benefit, i) => (
              <div key={i} className="group flex flex-col gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] group-hover:border-[var(--brand-primary)]/50 group-hover:bg-[var(--brand-primary)]/10 transition-all duration-500">
                  <benefit.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-1">{benefit.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);
