import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, Shield, Bell, CreditCard, 
  Zap, Camera, Terminal,
  ShieldCheck, Smartphone, Key, LogOut,
  AlertTriangle, ArrowUpRight
} from 'lucide-react';
import { toast } from "sonner";
import { setUser as setReduxUser } from '../../redux/slices/authSlice';
import { updateUserProfile } from '../../services/user.service';
import { motion } from 'motion/react';

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await updateUserProfile(user.id, formData);
      const updatedUser = response.data || { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch(setReduxUser(updatedUser));
      toast.success("System Identity Updated Successfully");
    } catch (err) {
      toast.error(err.message || "Unable to update identity");
    } finally {
      setIsUpdating(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[var(--text-primary)] uppercase">Settings</h1>
          <p className="text-[10px] md:text-xs text-emerald-500 font-black uppercase tracking-[0.2em] mt-1">Manage Your Account</p>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* IDENTITY BENTO */}
        <motion.div variants={itemVariants} className="md:col-span-12 xl:col-span-7">
          <Card className="h-full bg-[var(--card-bg)]/50 backdrop-blur-xl rounded-2xl overflow-hidden group">
            <div className="h-32 bg-gradient-to-br from-emerald-500/20 via-[var(--bg-color)] to-[var(--bg-color)] relative">
              <div className="absolute inset-0 opacity-10 mix-blend-overlay mesh-gradient"></div>
            </div>
            
            <div className="px-6 md:px-8 pb-8 relative">
              <div className="flex justify-between items-end -mt-12 mb-8">
                <div className="relative group/avatar">
                  <div className="w-24 h-24 rounded-2xl bg-[var(--bg-color)] p-1.5 shadow-2xl relative z-10 border border-emerald-500/20 group-hover/avatar:border-emerald-500/50 transition-colors">
                    <div className="w-full h-full rounded-xl bg-emerald-500/10 flex items-center justify-center overflow-hidden relative">
                      {user?.profile_pic ? (
                        <img src={user.profile_pic} alt="Identity" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl font-black text-emerald-500 tracking-tighter">
                          {user?.name?.[0]?.toUpperCase() || 'U'}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                        <Camera className="text-white w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                </div>

                <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 font-black tracking-widest text-[9px] uppercase rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  Primary Account
                </span>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Full Name</Label>
                    <div className="relative group/input">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] group-focus-within/input:text-emerald-500 transition-colors" />
                      <Input 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12 pl-10 bg-[var(--bg-color)]/50 border-[var(--card-border)] rounded-xl text-xs font-bold focus-visible:ring-emerald-500/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Email Address</Label>
                    <div className="relative group/input">
                      <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] group-focus-within/input:text-emerald-500 transition-colors" />
                      <Input 
                        type="email"
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 pl-10 bg-[var(--bg-color)]/50 border-[var(--card-border)] rounded-xl text-xs font-bold focus-visible:ring-emerald-500/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button 
                    type="submit" 
                    disabled={isUpdating}
                    className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.15em] text-[10px] h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
                  >
                    {isUpdating ? 'Syncing...' : 'Save Changes'} <Zap size={14} className="ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </motion.div>

        {/* SECURITY BENTO */}
        <motion.div variants={itemVariants} className="md:col-span-12 xl:col-span-5 space-y-6">
          <Card className="bg-[var(--card-bg)]/50 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden group h-full flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-color)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-primary)] shadow-inner">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-[var(--text-primary)]">Security Settings</h3>
                <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Security Status</p>
              </div>
            </div>

            <div className="space-y-3 relative z-10 flex-1 flex flex-col justify-center">
              <SecurityRow icon={ShieldCheck} title="2FA Verification" status="Active" active={true} />
              <SecurityRow icon={Smartphone} title="Active Sessions" status="2 Nodes" active={false} />
              <SecurityRow icon={Key} title="Password" status="Updated 30d ago" active={false} />
            </div>
          </Card>
        </motion.div>

        {/* PREFERENCES BENTO */}
        <motion.div variants={itemVariants} className="md:col-span-12 xl:col-span-8">
           <Card className="bg-[var(--card-bg)]/50 backdrop-blur-xl rounded-2xl p-6 h-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                <PreferenceCard icon={Bell} title="System Alerts" desc="Configure notification streams" />
                <PreferenceCard icon={CreditCard} title="Billing & Plan" desc="Manage API quotas and limits" />
                <PreferenceCard icon={Terminal} title="Developer API" desc="Generate REST endpoints keys" />
              </div>
           </Card>
        </motion.div>

        {/* DANGER ZONE BENTO */}
        <motion.div variants={itemVariants} className="md:col-span-12 xl:col-span-4">
            <Card className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-rose-500/10 transition-colors h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col items-start gap-4 h-full justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)] group-hover:scale-110 transition-transform mb-4">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-rose-500">Delete Account</h3>
                  <p className="text-[10px] text-rose-500/70 font-bold uppercase tracking-widest mt-1 leading-relaxed">
                    Permanently delete your account and all data. This action cannot be undone.
                  </p>
                </div>

                <Button variant="outline" className="w-full h-11 border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mt-2 group/btn">
                  Delete Account <LogOut size={14} className="ml-2 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                </Button>
              </div>
            </Card>
        </motion.div>

      </motion.div>
    </div>
  );
}

function SecurityRow({ icon: Icon, title, status, active }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-color)]/60 border border-[var(--card-border)]/50 hover:border-emerald-500/30 transition-colors group/row cursor-pointer shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-[var(--text-secondary)]'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] group-hover/row:text-emerald-500 transition-colors">{title}</span>
          <span className={`text-[8px] font-bold uppercase tracking-[0.2em] ${active ? 'text-emerald-500' : 'text-[var(--text-secondary)] opacity-50'}`}>
            {status}
          </span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="w-6 h-6 opacity-0 group-hover/row:opacity-100 transition-opacity">
        <ArrowUpRight className="w-3 h-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]" />
      </Button>
    </div>
  );
}

function PreferenceCard({ icon: Icon, title, desc }) {
  return (
    <div className="p-5 rounded-2xl bg-[var(--bg-color)]/40 border border-[var(--card-border)]/50 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all group/pref cursor-pointer flex flex-col gap-4 h-full shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-primary)] group-hover/pref:scale-110 group-hover/pref:text-emerald-500 transition-all shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div className="mt-auto">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] group-hover/pref:text-emerald-500 transition-colors">{title}</h4>
        <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1 opacity-60 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

