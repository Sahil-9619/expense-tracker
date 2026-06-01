import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Book, MessageCircle, Mail, ExternalLink, HelpCircle, Terminal, Cpu, ChevronRight, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_NAME } from '../../lib/constants';

export default function Help() {
  const commands = [
    { cmd: 'help --start', desc: 'Get started with your account' },
    { cmd: 'audit --verify', desc: 'Verify your documents' },
    { cmd: 'sync --all', desc: 'Force data sync' },
    { cmd: 'identity --reset', desc: 'Reset your profile settings' },
  ];

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Help & Support</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Get help with your account</p>
        </div>
        <div className="flex gap-2">
          <Button className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-sm px-4 shadow-lg shadow-emerald-500/20">
            Open Support Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1">
        {/* Help Center */}
        <Card className="col-span-12 lg:col-span-7 bg-[var(--bg-color)] border border-[var(--card-border)] rounded-sm overflow-hidden flex flex-col group shadow-2xl">
          <div className="p-3 bg-[var(--card-bg)] border-b border-[var(--card-border)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <div className="w-px h-3 bg-[var(--card-border)] mx-2" />
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">{BRAND_NAME}_Kernel_v2.0.4</span>
              </div>
            </div>
            <span className="text-[8px] font-mono text-emerald-500/40">SESSION_ID: AX-294</span>
          </div>

          <div className="flex-1 p-6 font-mono space-y-8 overflow-y-auto custom-scrollbar no-scrollbar">
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-emerald-500 shrink-0">âžœ</span>
                <p className="text-[11px] text-[var(--text-primary)] font-bold leading-relaxed">
                  Welcome to the Help Center. Search for answers or browse our guides to learn more.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
                {commands.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-sm bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--brand-primary)] transition-all cursor-pointer group/cmd"
                  >
                    <span className="text-emerald-500 text-[10px] font-black">{c.cmd}</span>
                    <p className="text-[9px] text-[var(--text-secondary)] mt-1 opacity-60 group-hover/cmd:opacity-100 transition-opacity">{c.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-emerald-500 shrink-0">âžœ</span>
                <div className="flex-1 space-y-4">
                  <span className="text-[11px] text-[var(--text-primary)] font-bold">Frequently Asked Questions</span>
                  <div className="space-y-2">
                    {['Automated syncing', 'Document security', 'Data backup and safety'].map(q => (
                      <div key={q} className="flex items-center justify-between p-2 rounded-sm hover:bg-white/[0.03] transition-colors cursor-pointer group/link">
                        <span className="text-[10px] text-[var(--text-secondary)] group-hover/link:text-emerald-500 transition-colors">{q}</span>
                        <ChevronRight size={12} className="text-emerald-500 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[var(--bg-color)] border-t border-[var(--card-border)] relative">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-500" />
            <Input
              placeholder="Search for help..."
              className="bg-transparent border-none h-8 pl-10 text-[11px] font-mono text-emerald-500 placeholder:text-emerald-900 focus-visible:ring-0"
            />
          </div>
        </Card>

        {/* Support Channels */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <Card className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-6 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">System Support</h2>
            <div className="grid grid-cols-2 gap-4">
              <SupportNode icon={Cpu} label="System Core" desc="24/7 Operations" />
              <SupportNode icon={Globe} label="Servers" desc="Global Clusters" />
            </div>
          </Card>

          <Card className="bg-emerald-600/10 border border-emerald-500/30 rounded-sm p-8 flex flex-col items-center text-center space-y-4 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" />
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/20 mb-2">
              <MessageCircle size={32} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">Contact Support</h3>
              <p className="text-[10px] text-emerald-500/60 font-black uppercase tracking-[0.2em]">Get help from a real person</p>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest h-10 rounded-sm mt-4">
              Chat with Support <Zap size={14} className="ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SupportNode({ icon: Icon, label, desc }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-sm bg-[var(--bg-color)]/50 border border-[var(--card-border)] group hover:border-emerald-500/30 transition-all">
      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon size={16} />
      </div>
      <div className="space-y-0.5">
        <span className="text-[10px] font-black uppercase tracking-tight text-[var(--text-primary)]">{label}</span>
        <p className="text-[8px] font-bold text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">{desc}</p>
      </div>
    </div>
  );
}

