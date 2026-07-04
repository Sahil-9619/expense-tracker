import React, { useMemo, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, CreditCard, Landmark, ShieldCheck, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import WalletDialog from '../../components/tracker/WalletDialog';

const walletIconByType = {
  'Bank Account': Landmark,
  Savings: Wallet,
  'Credit Card': CreditCard,
  'Digital Assets': Wallet,
  Cash: Wallet,
};

export default function Wallets({ wallets = [], transactions = [], onAddWallet }) {
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedId = activeId || wallets[0]?.id;
  const activeWallet = wallets.find(w => w.id === selectedId) || wallets[0];
  const activeTransactions = useMemo(() => {
    if (!activeWallet) return [];
    return transactions.filter((tx) => tx.wallet === activeWallet.id).slice(0, 3);
  }, [activeWallet, transactions]);

  const totalInflow = activeTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  const totalOutflow = activeTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Wallets</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Manage your accounts and balances</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm text-[9px] font-black uppercase tracking-widest h-8 px-4">
          <Plus className="mr-2 h-3 w-3" /> Add Wallet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 space-y-2">
          {wallets.length === 0 ? (
            <div className="p-6 rounded-sm border border-dashed border-[var(--card-border)] text-center text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50">
              No wallets connected
            </div>
          ) : wallets.map((wallet) => {
            const Icon = walletIconByType[wallet.type] || Wallet;
            return (
              <motion.div
                key={wallet.id}
                onClick={() => setActiveId(wallet.id)}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer p-3 rounded-sm border transition-all flex items-center justify-between ${
                  selectedId === wallet.id
                    ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                    : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:border-emerald-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded bg-${wallet.color}-500/10 text-${wallet.color}-500`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-black text-[var(--text-primary)] uppercase truncate">{wallet.name}</span>
                    <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase opacity-60">{wallet.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black font-mono text-[var(--text-primary)]">
                    ₹{Math.abs(Number(wallet.balance || 0)).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            );
          })}

          <button onClick={() => setIsModalOpen(true)} className="w-full py-4 border border-dashed border-[var(--card-border)] rounded-sm flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-emerald-500 hover:bg-emerald-500/5 transition-all">
            <Plus size={12} /> Add Wallet
          </button>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeWallet?.id || 'empty-wallet'} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
              <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm h-full flex flex-col overflow-hidden">
                <div className="p-6 border-b border-[var(--card-border)] bg-[var(--bg-color)]/30 flex justify-between items-start">
                  <div className="space-y-1">
                    <div className={`inline-flex items-center rounded-full border px-2 py-0.5 bg-${activeWallet?.color || 'emerald'}-500/10 text-${activeWallet?.color || 'emerald'}-500 border-${activeWallet?.color || 'emerald'}-500/20 text-[8px] font-black uppercase tracking-widest`}>
                      {activeWallet?.status || 'Inactive'}
                    </div>
                    <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">{activeWallet?.name || 'No Wallet Selected'}</h2>
                    <p className="text-[10px] font-medium text-[var(--text-secondary)] opacity-60">Wallet ID: {activeWallet ? `#${activeWallet.id}` : 'Not connected'}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Current Balance</span>
                    <span className="text-3xl font-black font-mono tracking-tighter text-emerald-500">₹{Number(activeWallet?.balance || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Wallet Analytics</h3>
                    <div className="space-y-3">
                      <IntelligenceItem label="Total Inflow" value={`₹${totalInflow.toLocaleString()}`} trend={`${activeTransactions.length} records`} isUp />
                      <IntelligenceItem label="Total Outflow" value={`₹${totalOutflow.toLocaleString()}`} trend="Tracked" />
                      <IntelligenceItem label="Wallet Status" value={activeWallet?.status || 'Inactive'} trend="DB synced" isUp />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Recent Wallet Activity</h3>
                    <div className="space-y-2">
                      {activeTransactions.length === 0 ? (
                        <div className="p-4 rounded-sm bg-[var(--bg-color)]/50 border border-[var(--card-border)] text-center text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">
                          No wallet activity recorded
                        </div>
                      ) : activeTransactions.map(tx => (
                        <div key={tx.id} className="flex items-center justify-between p-3 rounded-sm bg-[var(--bg-color)]/50 border border-[var(--card-border)] hover:border-emerald-500/20 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                              <Activity size={14} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-tight text-[var(--text-primary)]">{tx.description || tx.title}</span>
                              <span className="text-[8px] text-[var(--text-secondary)] opacity-60 font-medium">{new Date(tx.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-black font-mono ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {tx.type === 'income' ? '+' : '-'}₹{Number(tx.amount || 0).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-6 bg-emerald-500/5 border-t border-[var(--card-border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-emerald-500" size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">All data is saved and synced securely</span>
                  </div>
                  <Button className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm text-[9px] font-black uppercase tracking-widest px-4">Sync Now</Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <WalletDialog isOpen={isModalOpen} onOpenChange={setIsModalOpen} onAdd={onAddWallet} />
    </div>
  );
}

function IntelligenceItem({ label, value, trend, isUp = false }) {
  return (
    <div className="p-3 rounded-sm bg-[var(--bg-color)]/40 border border-[var(--card-border)] space-y-1">
      <span className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{label}</span>
      <div className="flex items-end justify-between">
        <span className="text-xs font-black font-mono text-[var(--text-primary)]">{value}</span>
        <span className={`text-[8px] font-black ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>
      </div>
    </div>
  );
}

