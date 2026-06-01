import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Zap, Target, DollarSign, Calendar, Trophy } from 'lucide-react';

export default function GoalDialog({ isOpen, onOpenChange, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    target: '',
    deadline: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.target) return;
    onAdd(formData);
    onOpenChange(false);
    setFormData({ title: '', target: '', deadline: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--bg-color)] border-[var(--card-border)] sm:max-w-[420px] rounded-sm p-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,1)]" />
        
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Trophy size={20} strokeWidth={3} />
            </div>
            <div className="text-left">
              <DialogTitle className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">Create Goal</DialogTitle>
              <DialogDescription className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Protocol Layer: Accumulation</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Objective Identity</Label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-secondary)] opacity-40" />
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. New Workspace..." 
                  className="pl-9 h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Capital Target</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500">â‚¹</span>
                  <Input 
                    type="number"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    placeholder="0.00" 
                    className="pl-8 h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Epoch Deadline</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-secondary)] opacity-40" />
                  <Input 
                    placeholder="Dec 2026"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="pl-9 h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-emerald-500/20 group transition-all"
          >
            Authorize Phase <Zap size={14} className="ml-2 group-hover:animate-pulse" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

