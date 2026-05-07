import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Target, AlertCircle, CheckCircle2, ShieldAlert, Zap, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import BudgetDialog from '../../components/tracker/BudgetDialog';
import { toast } from 'sonner';

const initialBudgets = [
  { category: 'Food & Dining', spent: 12450, limit: 15000, color: 'emerald' },
  { category: 'Entertainment', spent: 8900, limit: 5000, color: 'rose' },
  { category: 'Shopping', spent: 15600, limit: 20000, color: 'indigo' },
  { category: 'Transport', spent: 3200, limit: 4000, color: 'amber' },
];

export default function Budgets() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBudget = (data) => {
    const newBudget = {
      category: data.category,
      spent: 0,
      limit: parseFloat(data.limit),
      color: 'emerald'
    };
    setBudgets([...budgets, newBudget]);
    toast.success('Capital Threshold Initialized');
  };

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Capital Thresholds</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Real-time expenditure containment</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm text-[9px] font-black uppercase tracking-widest h-8 px-4"
        >
          <Plus className="mr-2 h-3 w-3" /> Initialize Limit
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Active Alerts Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card className="bg-rose-500/5 border border-rose-500/20 rounded-sm p-5 space-y-6">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-500" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Threshold Breaches</h2>
            </div>
            
            <div className="space-y-4">
              <AlertItem category="Entertainment" overAmount="3,900" percentage="178%" />
              <AlertItem category="Transport" overAmount="0" percentage="80%" isWarning />
            </div>

            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white text-[9px] font-black uppercase tracking-widest h-8 rounded-sm">
              Adjust Containment Protocols
            </Button>
          </Card>

          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-5 space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Saving Momentum</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center">
                <Zap size={16} className="text-emerald-500" />
              </div>
              <div>
                <span className="text-xl font-black font-mono text-[var(--text-primary)]">₹45,203</span>
                <p className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Saved this epoch</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Dense Budget Meters */}
        <Card className="col-span-12 lg:col-span-8 bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-6 overflow-hidden">
          <Tabs defaultValue="active" className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">Expenditure Meters</h2>
              <TabsList className="bg-[var(--bg-color)]/50 border border-[var(--card-border)] rounded-sm p-1 h-8">
                <TabsTrigger value="active" className="text-[9px] font-black uppercase tracking-widest px-4 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-sm h-full">Active</TabsTrigger>
                <TabsTrigger value="recurring" className="text-[9px] font-black uppercase tracking-widest px-4 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-sm h-full">Recurring</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="active" className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mt-0">
              {budgets.map((budget, i) => {
                const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
                const isOver = budget.spent > budget.limit;

                return (
                  <div key={i} className="space-y-4 group">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-40">Protocol Classification</span>
                        <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tight group-hover:text-emerald-500 transition-colors">{budget.category}</h3>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-black font-mono tracking-tighter ${isOver ? 'text-rose-500' : 'text-[var(--text-primary)]'}`}>₹{budget.spent.toLocaleString()}</span>
                        <span className="text-[8px] font-bold text-[var(--text-secondary)] opacity-30 ml-1">/ ₹{budget.limit.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="relative h-1 w-full bg-[var(--bg-color)] rounded-full overflow-hidden border border-[var(--card-border)]">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${isOver ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} 
                      />
                    </div>

                    <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1 h-1 rounded-full ${isOver ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                          {isOver ? 'CONTAINMENT BREACHED' : 'NOMINAL RANGE'}
                        </span>
                      </div>
                      <span className="text-[9px] font-black font-mono text-[var(--text-secondary)]">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <BudgetDialog 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onAdd={handleAddBudget}
      />
    </div>
  );
}

function AlertItem({ category, overAmount, percentage, isWarning = false }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-sm border ${isWarning ? 'bg-amber-500/5 border-amber-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
      <div className="flex flex-col">
        <span className={`text-[9px] font-black uppercase tracking-tight ${isWarning ? 'text-amber-500' : 'text-rose-500'}`}>{category}</span>
        <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">{isWarning ? 'Approaching Limit' : `+₹${overAmount} Over Limit`}</span>
      </div>
      <span className={`text-[10px] font-black font-mono ${isWarning ? 'text-amber-500' : 'text-rose-500'}`}>{percentage}</span>
    </div>
  );
}
