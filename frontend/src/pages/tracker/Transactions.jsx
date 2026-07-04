import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft,
  MoreHorizontal,
  History,
  Calendar,
  Settings2
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { motion } from 'motion/react';

export default function Transactions({ transactions = [], onAddClick }) {
  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Transactions</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Your recent transactions and history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widest rounded-sm border-[var(--card-border)] text-[var(--text-primary)] px-4">
            <Download className="mr-2 h-3 w-3" /> Export Data
          </Button>
          <Button 
            onClick={onAddClick}
            className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-sm shadow-lg shadow-emerald-500/20 px-4"
          >
            <Plus className="mr-2 h-3 w-3" /> Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Filter Sidebar (Mini) */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-4 space-y-6">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--text-secondary)] opacity-40" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-9 h-9 bg-[var(--bg-color)] border-[var(--card-border)] rounded-sm text-[10px] font-bold placeholder:opacity-30"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] ml-1">Quick Filters</label>
              <div className="flex flex-col gap-2">
                <FilterButton label="High Amount" active={true} />
                <FilterButton label="Income Only" />
                <FilterButton label="Expenses Only" />
                <FilterButton label="Pending" />
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--card-border)]">
              <Button variant="ghost" className="w-full justify-start h-8 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-emerald-500 hover:bg-emerald-500/5">
                <Settings2 className="mr-2 h-3 w-3" /> Advanced Search
              </Button>
            </div>
          </Card>

          <Card className="bg-emerald-500/5 border border-emerald-500/10 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <History size={12} className="text-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Sync Status</span>
            </div>
            <p className="text-[8px] text-emerald-500/60 font-bold uppercase leading-relaxed">
              All {transactions.length} transactions from the current epoch are saved and synced securely.
            </p>
          </Card>
        </div>

        {/* Dense Ledger Table */}
        <div className="col-span-12 lg:col-span-9">
          <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm overflow-hidden h-full flex flex-col">
            <div className="flex-1 overflow-x-auto custom-scrollbar no-scrollbar">
              <Table>
                <TableHeader className="bg-[var(--bg-color)]/50 sticky top-0 z-10">
                  <TableRow className="border-b border-[var(--card-border)] hover:bg-transparent">
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] py-3 px-6">Date / Merchant</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Category</TableHead>
                    <TableHead className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] text-right px-6">Amount (INR)</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-20">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((tx, i) => (
                      <motion.tr 
                        key={tx.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-[var(--card-border)]/50 last:border-0 hover:bg-emerald-500/[0.03] transition-colors group cursor-pointer"
                      >
                        <TableCell className="py-3 px-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors">
                              {tx.merchant || tx.description}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5 opacity-60">
                              <Calendar size={10} className="text-[var(--text-secondary)]" />
                              <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">
                                {new Date(tx.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                              {tx.category}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <div className="flex flex-col items-end">
                            <span className={`text-[11px] font-black font-mono tracking-tighter ${tx.type === 'income' ? 'text-emerald-500' : 'text-[var(--text-primary)]'}`}>
                              {tx.type === 'income' ? '+' : '-'}₹{parseFloat(tx.amount).toLocaleString()}
                            </span>
                            <span className="text-[8px] font-bold text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">Confirmed</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-6">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-[var(--text-secondary)] hover:text-emerald-500 hover:bg-emerald-500/10">
                              <MoreHorizontal size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-4 border-t border-[var(--card-border)] bg-[var(--bg-color)]/30 flex items-center justify-between">
              <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50">
                Sync complete. {transactions.length} transactions found.
              </span>
              <div className="flex gap-1">
                <Button variant="outline" className="h-7 text-[8px] font-black uppercase tracking-widest rounded-sm border-[var(--card-border)]">Prior</Button>
                <Button variant="outline" className="h-7 text-[8px] font-black uppercase tracking-widest rounded-sm border-[var(--card-border)] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Following</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ label, active = false }) {
  return (
    <button className={`
      flex items-center justify-between px-3 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all
      ${active 
        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
        : 'text-[var(--text-secondary)] hover:bg-emerald-500/5 hover:text-[var(--text-primary)] border border-transparent'}
    `}>
      {label}
      {active && <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />}
    </button>
  );
}

