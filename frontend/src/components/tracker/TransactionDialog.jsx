import React, { useState, useEffect } from 'react';
import { toast } from '../UI/CustomToaster';
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
import { Plus, Zap, Wallet, Tag, Calendar } from 'lucide-react';

export default function TransactionDialog({ isOpen, onOpenChange, onAdd, categoryConfig, wallets = [], transactionToEdit }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    payment_mode: 'Cash',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        description: transactionToEdit.title || transactionToEdit.description || '',
        amount: transactionToEdit.amount || '',
        category: transactionToEdit.category || 'Food',
        type: transactionToEdit.type || 'expense',
        payment_mode: transactionToEdit.payment_mode || 'Cash',
        date: transactionToEdit.date || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        payment_mode: 'Cash',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [transactionToEdit, isOpen]);

  const categories = Object.keys(categoryConfig);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    onAdd({ ...formData });
    onOpenChange(false);
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      type: 'expense',
      payment_mode: 'Cash',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--bg-color)] border-[var(--card-border)] sm:max-w-[420px] rounded-sm p-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,1)]" />

        <DialogHeader className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Plus size={20} strokeWidth={3} />
            </div>
            <div className="text-left">
              <DialogTitle className="text-xl font-black text-[var(--text-primary)] uppercase tracking-tight">{transactionToEdit ? "Modify Entry" : "Initialize Entry"}</DialogTitle>
              <DialogDescription className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Protocol Layer: Transaction</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`h-11 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'expense' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:bg-emerald-500/5 hover:text-emerald-500'}`}
            >
              Expense
            </Button>
            <Button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`h-11 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === 'income' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:bg-emerald-500/5 hover:text-emerald-500'}`}
            >
              Income
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Merchant / Description</Label>
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-secondary)] opacity-40 pointer-events-none" />
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="System description..."
                  className="pl-9 h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500">₹</span>
                  <Input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value.replace(/-/g, "") })}
                    onWheel={(e) => { e.preventDefault(); e.currentTarget.blur(); }}
                    onKeyDown={(e) => { if (["ArrowUp", "ArrowDown", "-", "Subtract"].includes(e.key)) e.preventDefault(); }}
                    placeholder="0.00"
                    className="pl-8 h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Date Point</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-secondary)] opacity-40 pointer-events-none" />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    onClick={(e) => {
                      try {
                        e.target.showPicker();
                      } catch (err) {
                        console.warn("showPicker not supported", err);
                      }
                    }}
                    className="pl-9 h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Classification Hub</Label>
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger className="h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-emerald-500" />
                    <SelectValue placeholder="Select Category" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-xs font-bold uppercase tracking-tight text-[var(--text-primary)] hover:bg-emerald-500/10 hover:text-emerald-500">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Payment Mode</Label>
              <Select
                value={formData.payment_mode}
                onValueChange={(val) => setFormData({ ...formData, payment_mode: val })}
              >
                <SelectTrigger className="h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <Wallet size={14} className="text-emerald-500" />
                    <SelectValue placeholder="Select Payment Mode" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm">
                  {['Cash', 'UPI', 'Debit Card', 'Credit Card'].map(mode => (
                    <SelectItem key={mode} value={mode} className="text-xs font-bold uppercase tracking-tight text-[var(--text-primary)] hover:bg-emerald-500/10 hover:text-emerald-500">
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-emerald-500/20 group transition-all"
          >
            {transactionToEdit ? "Update Transaction" : "Execute Protocol"} <Zap size={14} className="ml-2 group-hover:animate-pulse" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
