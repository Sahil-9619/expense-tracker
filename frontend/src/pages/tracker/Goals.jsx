import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Trophy, Clock, Plus, Flag, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import GoalDialog from '../../components/tracker/GoalDialog';

export default function Goals({ goals = [], onAddGoal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const completedCount = goals.filter(g => g.completed).length;

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Financial Goals</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Track your savings goals</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm text-[9px] font-black uppercase tracking-widest h-8 px-4">
          <Plus className="mr-2 h-3 w-3" /> Create Goal
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-5 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Goal Progress</h2>
            <div className="space-y-6 relative">
              <div className="absolute left-3.5 top-0 bottom-0 w-px bg-[var(--card-border)] border-dashed border-l" />
              {goals.length === 0 ? (
                <PhaseItem status="Empty" label="No Goals" />
              ) : goals.slice(0, 4).map((goal) => (
                <PhaseItem key={goal.id} status={goal.completed ? 'Complete' : 'In Progress'} label={goal.title} active={!goal.completed} />
              ))}
            </div>
          </Card>

          <Card className="bg-emerald-500/5 border border-emerald-500/10 rounded-sm p-4 flex items-center gap-4 group hover:bg-emerald-500/10 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-sm bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Trophy size={18} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-tight text-emerald-500">Completed Goals</span>
              <p className="text-[8px] text-emerald-500/60 font-bold uppercase tracking-widest">{completedCount} Goals Completed</p>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-9 space-y-4">
          {goals.length === 0 ? (
            <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-10 text-center text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-40">
              No goals found
            </Card>
          ) : goals.map((goal, i) => {
            const current = Number(goal.current || 0);
            const target = Number(goal.target || 0);
            const percentage = target ? (current / target) * 100 : 0;
            const Icon = goal.completed ? Trophy : Target;
            return (
              <motion.div key={goal.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className={`bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-5 relative overflow-hidden group hover:border-emerald-500/30 transition-all ${goal.completed ? 'opacity-60' : ''}`}>
                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-sm bg-${goal.color}-500/10 text-${goal.color}-500 flex items-center justify-center shrink-0 border border-${goal.color}-500/20`}>
                        <Icon size={22} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tight truncate">{goal.title}</h3>
                        <div className="flex items-center gap-2">
                          <Clock size={10} className="text-[var(--text-secondary)] opacity-40" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">{goal.deadline || 'No deadline'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Progress</span>
                        <span className="text-[10px] font-black font-mono text-emerald-500">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[var(--bg-color)] rounded-full overflow-hidden border border-[var(--card-border)]">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(percentage, 100)}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-3 text-right">
                      <div className="flex flex-col">
                        <span className="text-lg font-black font-mono tracking-tighter text-[var(--text-primary)]">₹{current.toLocaleString()}</span>
                        <span className="text-[9px] font-bold text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">Target: ₹{target.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {goal.completed && (
                    <div className="absolute top-0 right-0 p-2">
                      <div className="bg-emerald-600 text-white border-none rounded-sm px-2 py-0.5 flex items-center gap-1">
                        <ShieldCheck size={10} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Completed</span>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}

          <button onClick={() => setIsModalOpen(true)} className="w-full py-10 border border-dashed border-[var(--card-border)] rounded-sm flex flex-col items-center justify-center gap-3 group hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all">
            <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-secondary)] group-hover:scale-110 transition-transform">
              <Plus size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Create New Goal</span>
          </button>
        </div>
      </div>

      <GoalDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} onAdd={onAddGoal} />
    </div>
  );
}

function PhaseItem({ status, label, active = false }) {
  return (
    <div className="flex items-center gap-4 relative z-10 group cursor-pointer">
      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${active ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-[var(--bg-color)] border-[var(--card-border)] text-[var(--text-secondary)]'}`}>
        {active ? <Flag size={12} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-[var(--card-border)]" />}
      </div>
      <div className="flex flex-col min-w-0">
        <span className={`text-[10px] font-black uppercase tracking-tight ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] opacity-40'}`}>{label}</span>
        <span className="text-[8px] font-bold text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">{status}</span>
      </div>
    </div>
  );
}

