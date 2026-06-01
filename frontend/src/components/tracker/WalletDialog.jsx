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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Zap, Wallet, Landmark, CreditCard, ShieldCheck } from 'lucide-react';

export default function WalletDialog({ isOpen, onOpenChange, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Bank Account',
    balance: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.balance) return;
    onAdd(formData);
    onOpenChange(false);
    setFormData({ name: '', type: 'Bank Account', balance: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--bg-color)] border-[var(--card-border)] sm:max-w-[420px] rounded-sm p-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,1)]" />
        
        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Landmark size={20} strokeWidth={3} />
            </div>
            <div className="text-left">
              <DialogTitle className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">Add Wallet</DialogTitle>
              <DialogDescription className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Protocol Layer: Liquidity</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Node Identity</Label>
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-secondary)] opacity-40" />
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. HDFC Checking..." 
                  className="pl-9 h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Initial Magnitude</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500">â‚¹</span>
                <Input 
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  placeholder="0.00" 
                  className="pl-8 h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Node Classification</Label>
              <Select 
                value={formData.type} 
                onValueChange={(val) => setFormData({ ...formData, type: val })}
              >
                <SelectTrigger className="h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-emerald-500" />
                    <SelectValue placeholder="Select Node Type" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm">
                  {['Bank Account', 'Savings', 'Credit Card', 'Digital Assets', 'Cash'].map(type => (
                    <SelectItem key={type} value={type} className="text-xs font-bold uppercase tracking-tight text-[var(--text-primary)] hover:bg-emerald-500/10 hover:text-emerald-500">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-sm flex items-center gap-3">
            <ShieldCheck className="text-emerald-500" size={16} />
            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Node will be cryptographically secured</span>
          </div>

          <Button 
            type="submit"
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-emerald-500/20 group transition-all"
          >
            Authorize Node <Zap size={14} className="ml-2 group-hover:animate-pulse" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

