import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wallet, CreditCard, Landmark, ArrowUpRight, MoreHorizontal, ShieldCheck, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import WalletDialog from '../../components/tracker/WalletDialog';
import { toast } from 'sonner';

const initialWallets = [
  { id: 1, name: 'Main Checking', type: 'Bank Account', balance: 45230.50, color: 'emerald', icon: Landmark, status: 'Active' },
  { id: 2, name: 'Savings Fund', type: 'Savings', balance: 120500.00, color: 'indigo', icon: Wallet, status: 'Active' },
  { id: 3, name: 'HDFC Credit', type: 'Credit Card', balance: -12450.20, color: 'rose', icon: CreditCard, status: 'Warning' },
  { id: 4, name: 'Crypto Wallet', type: 'Digital Assets', balance: 8720.00, color: 'amber', icon: Wallet, status: 'Encrypted' },
];

export default function Wallets() {
  const [wallets, setWallets] = useState(initialWallets);
  const [activeId, setActiveId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const activeWallet = wallets.find(w => w.id === activeId) || wallets[0];

  const handleAddWallet = (walletData) => {
    const newWallet = {
      ...walletData,
      id: Date.now(),
      color: 'emerald',
      icon: walletData.type === 'Credit Card' ? CreditCard : Landmark,
      status: 'Active',
      balance: parseFloat(walletData.balance)
    };
    setWallets([...wallets, newWallet]);
    toast.success('Liquidity Node Connected Successfully');
  };

  return (
    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between px-2">
        <div>
          <h1 className="text-lg font-black tracking-tight text-[var(--text-primary)] uppercase">Liquidity Nodes</h1>
          <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Distributed capital architecture</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm text-[9px] font-black uppercase tracking-widest h-8 px-4"
        >
          <Plus className="mr-2 h-3 w-3" /> Connect Node
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Wallet Stack List */}
        <div className="lg:col-span-4 space-y-2">
          {wallets.map((wallet) => (
            <motion.div 
              key={wallet.id}
              onClick={() => setActiveId(wallet.id)}
              whileTap={{ scale: 0.98 }}
              className={`
                cursor-pointer p-3 rounded-sm border transition-all flex items-center justify-between
                ${activeId === wallet.id 
                  ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5' 
                  : 'bg-[var(--card-bg)] border-[var(--card-border)] hover:border-emerald-500/20'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded bg-${wallet.color}-500/10 text-${wallet.color}-500`}>
                  <wallet.icon size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black text-[var(--text-primary)] uppercase truncate">{wallet.name}</span>
                  <span className="text-[8px] text-[var(--text-secondary)] font-bold uppercase opacity-60">{wallet.type}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black font-mono text-[var(--text-primary)]">
                  ₹{Math.abs(wallet.balance).toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 border border-dashed border-[var(--card-border)] rounded-sm flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-emerald-500 hover:bg-emerald-500/5 transition-all"
          >
            <Plus size={12} /> Add Terminal
          </button>
        </div>

        {/* Active Node Intelligence */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm h-full flex flex-col overflow-hidden">
                <div className="p-6 border-b border-[var(--card-border)] bg-[var(--bg-color)]/30 flex justify-between items-start">
                  <div className="space-y-1">
                    <Badge variant="outline" className={`bg-${activeWallet.color}-500/10 text-${activeWallet.color}-500 border-${activeWallet.color}-500/20 text-[8px] font-black uppercase tracking-widest px-2`}>
                      {activeWallet.status}
                    </Badge>
                    <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">{activeWallet.name}</h2>
                    <p className="text-[10px] font-medium text-[var(--text-secondary)] opacity-60">Verified Liquidity Node: 0x{activeId}F4...9A2</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Current Balance</span>
                    <span className="text-3xl font-black font-mono tracking-tighter text-emerald-500">₹{activeWallet.balance.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Node Analytics</h3>
                    <div className="space-y-3">
                      <IntelligenceItem label="Total Inflow" value="₹45,000" trend="+12%" isUp={true} />
                      <IntelligenceItem label="Total Outflow" value="₹2,340" trend="-4%" isUp={false} />
                      <IntelligenceItem label="Node Stability" value="99.9%" trend="Stable" isUp={true} />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Recent Node Activity</h3>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-sm bg-[var(--bg-color)]/50 border border-[var(--card-border)] hover:border-emerald-500/20 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                              <Activity size={14} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-tight text-[var(--text-primary)]">Transaction Verification</span>
                              <span className="text-[8px] text-[var(--text-secondary)] opacity-60 font-medium">May 07, 2026</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-black font-mono text-emerald-500">+₹1,240.00</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-6 bg-emerald-500/5 border-t border-[var(--card-border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-emerald-500" size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">256-Bit Node Encryption Active</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="h-8 rounded-sm text-[9px] font-black uppercase tracking-widest border-[var(--card-border)] px-4">Edit Node</Button>
                    <Button className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm text-[9px] font-black uppercase tracking-widest px-4">Sync Protocol</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <WalletDialog 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        onAdd={handleAddWallet}
      />
    </div>
  );
}

function IntelligenceItem({ label, value, trend, isUp }) {
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
