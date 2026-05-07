import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, ArrowRight, BarChart3, PieChart as PieChartIcon, Folder, ShieldCheck, Search, Filter, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";

export default function Reports() {
  const folders = ['Fiscal 2024', 'Tax Audits', 'Quarterly Flux', 'Personal Dossier'];

  const reportTypes = [
    { title: 'Tax Summary 2024', desc: 'Full breakdown of deductible expenses', icon: FileText, date: 'Generated Oct 12', size: '1.2 MB' },
    { title: 'Quarterly Audit Q3', desc: 'Comprehensive financial health report', icon: BarChart3, date: 'Generated Sep 30', size: '4.8 MB' },
    { title: 'Category Heatmap', desc: 'Visual distribution of spending habits', icon: PieChartIcon, date: 'Generated Aug 15', size: '0.9 MB' },
  ];

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Intelligence Archive</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Cryptographically signed financial audits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widest rounded-sm border-[var(--card-border)] px-4">
            <Search size={14} className="mr-2 opacity-40" /> Query Archive
          </Button>
          <Button className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-sm px-4">
            Initialize New Audit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1">
        {/* Archive Folders */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4 px-2">Knowledge Base</h2>
          {folders.map((folder, i) => (
            <button
              key={folder}
              className={`
                w-full flex items-center justify-between p-3 rounded-sm border transition-all group
                ${i === 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-lg shadow-emerald-500/5' : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-secondary)] hover:border-emerald-500/20'}
              `}
            >
              <div className="flex items-center gap-3">
                <Folder size={14} className={i === 0 ? 'text-emerald-500' : 'text-[var(--text-secondary)] opacity-40'} />
                <span className="text-[10px] font-black uppercase tracking-widest">{folder}</span>
              </div>
              <span className="text-[9px] font-mono opacity-40">({i + 4})</span>
            </button>
          ))}

          <div className="pt-8 space-y-4">
            <Card className="bg-emerald-500/5 border border-emerald-500/10 rounded-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Audit Security</span>
              </div>
              <p className="text-[8px] text-emerald-500/60 font-bold uppercase leading-relaxed">
                All reports are generated with a unique SHA-256 hash to ensure document integrity for fiscal authorities.
              </p>
            </Card>
          </div>
        </div>

        {/* Intelligence Files */}
        <div className="col-span-12 lg:col-span-9">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[var(--card-border)] bg-[var(--bg-color)]/30 flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Contents of Fiscal 2024</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-[var(--text-secondary)]"><Filter size={12} /></Button>
                <div className="w-px h-4 bg-[var(--card-border)]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">Size: 12.4 MB</span>
              </div>
            </div>

            <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((report, i) => (
                <Card key={i} className="bg-[var(--bg-color)]/40 border border-[var(--card-border)] rounded-sm p-4 group hover:border-emerald-500/30 transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                      <report.icon size={20} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">{report.size}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1 mt-auto">
                    <h3 className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tight">{report.title}</h3>
                    <p className="text-[9px] text-[var(--text-secondary)] font-medium line-clamp-1">{report.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--card-border)]/50 flex justify-between items-center">
                    <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">{report.date}</span>
                    <ArrowRight size={12} className="text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              ))}

              <button className="border border-dashed border-[var(--card-border)] rounded-sm p-8 flex flex-col items-center justify-center text-center space-y-3 group hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-color)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-secondary)] group-hover:scale-110 transition-transform">
                  <Plus size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Custom Intelligence Audit</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
