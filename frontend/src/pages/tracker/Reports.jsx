import React, { useMemo, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowRight, BarChart3, PieChart as PieChartIcon, Folder, ShieldCheck, Search, Filter, Plus } from 'lucide-react';

const reportIconByType = {
  summary: FileText,
  audit: BarChart3,
  category: PieChartIcon,
};

export default function Reports({ folders = [], reports = [], onCreateReport }) {
  const [activeFolderId, setActiveFolderId] = useState(null);
  const activeFolder = folders.find((folder) => folder.id === activeFolderId) || folders[0];
  const visibleReports = useMemo(() => {
    if (!activeFolder) return reports;
    return reports.filter((report) => report.folder === activeFolder.id);
  }, [activeFolder, reports]);

  const totalSize = visibleReports.reduce((sum, report) => sum + Number.parseFloat(report.size_label || 0), 0);

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Intelligence Archive</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Database-backed financial audits</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widest rounded-sm border-[var(--card-border)] px-4">
            <Search size={14} className="mr-2 opacity-40" /> Query Archive
          </Button>
          <Button onClick={onCreateReport} className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-sm px-4">
            Initialize New Audit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1">
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4 px-2">Knowledge Base</h2>
          {folders.length === 0 ? (
            <div className="p-4 rounded-sm border border-dashed border-[var(--card-border)] text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40 text-center">
              No report folders stored
            </div>
          ) : folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setActiveFolderId(folder.id)}
              className={`w-full flex items-center justify-between p-3 rounded-sm border transition-all group ${
                activeFolder?.id === folder.id ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-lg shadow-emerald-500/5' : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-secondary)] hover:border-emerald-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <Folder size={14} className={activeFolder?.id === folder.id ? 'text-emerald-500' : 'text-[var(--text-secondary)] opacity-40'} />
                <span className="text-[10px] font-black uppercase tracking-widest">{folder.name}</span>
              </div>
              <span className="text-[9px] font-mono opacity-40">({folder.report_count})</span>
            </button>
          ))}

          <div className="pt-8 space-y-4">
            <Card className="bg-emerald-500/5 border border-emerald-500/10 rounded-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Audit Security</span>
              </div>
              <p className="text-[8px] text-emerald-500/60 font-bold uppercase leading-relaxed">
                Reports shown here are persisted per user and generated from the tracker database.
              </p>
            </Card>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[var(--card-border)] bg-[var(--bg-color)]/30 flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Contents of {activeFolder?.name || 'Archive'}</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-[var(--text-secondary)]"><Filter size={12} /></Button>
                <div className="w-px h-4 bg-[var(--card-border)]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">Size: {totalSize.toFixed(1)} MB</span>
              </div>
            </div>

            <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleReports.map((report) => {
                const Icon = reportIconByType[report.report_type] || FileText;
                return (
                  <Card key={report.id} className="bg-[var(--bg-color)]/40 border border-[var(--card-border)] rounded-sm p-4 group hover:border-emerald-500/30 transition-all flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                        <Icon size={20} />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">{report.size_label}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1 mt-auto">
                      <h3 className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-tight">{report.title}</h3>
                      <p className="text-[9px] text-[var(--text-secondary)] font-medium line-clamp-1">{report.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--card-border)]/50 flex justify-between items-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">{report.date}</span>
                      <ArrowRight size={12} className="text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                );
              })}

              <button onClick={onCreateReport} className="border border-dashed border-[var(--card-border)] rounded-sm p-8 flex flex-col items-center justify-center text-center space-y-3 group hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all">
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
