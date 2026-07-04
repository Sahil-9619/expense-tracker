import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User, Shield, Bell, CreditCard,
  Zap, Camera, Terminal,
  ShieldCheck, Smartphone, Key, LogOut,
  AlertTriangle, ArrowUpRight, Eye, EyeOff
} from 'lucide-react';
import { toast } from '../../components/UI/CustomToaster';
import { setUser as setReduxUser } from '../../redux/slices/authSlice';
import { useAuth } from '../../context/AuthContext';
import { updateUserProfile, changeUserPassword, deactivateUser } from '../../services/user.service';
import { motion } from 'motion/react';

export default function Settings({ categories = {}, onAddCategory, onDeleteCategory }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Fill all password fields');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setIsPasswordChanging(true);
    try {
      await changeUserPassword(user.id, {
        current_password: passwordData.currentPassword,
        password: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password changed successfully');
    } catch (err) {
      toast.error(err.message || 'Unable to change password');
    } finally {
      setIsPasswordChanging(false);
    }
  };

  const handleDeactivateAccount = async () => {
    setIsDeactivating(true);
    try {
      await deactivateUser(user.id);
      toast.success('Account deactivated successfully');
      logout();
      navigate('/auth');
    } catch (err) {
      toast.error(err.message || 'Unable to deactivate account');
    } finally {
      setIsDeactivating(false);
      setShowDeactivateConfirm(false);
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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'categories', label: 'Categories', icon: CreditCard },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ];

  return (
    <div className="p-3 md:p-5 space-y-5 min-h-full overflow-hidden">
      <div className="rounded-[1.75rem] border border-[var(--card-border)] bg-[var(--card-bg)]/85 px-4 py-3 shadow-sm backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.25em] transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-[0_8px_30px_-15px_rgba(16,185,129,0.8)]' : 'bg-[var(--bg-color)] text-[var(--text-secondary)] border border-[var(--card-border)] hover:bg-emerald-500/10 hover:text-emerald-500'}`}
              >
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${activeTab === tab.id ? 'bg-white/15 text-white' : 'bg-[var(--bg-color)] text-[var(--text-secondary)]'}`}>
                  <TabIcon size={14} />
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 border-t border-[var(--card-border)]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-4"
      >
        {/* IDENTITY BENTO */}
        {activeTab === 'profile' && (
          <motion.div variants={itemVariants} className="md:col-span-12 xl:col-span-7">
            <Card className="h-full rounded-2xl overflow-hidden group border border-[var(--card-border)]">
              <div className="px-6 md:px-8 pb-6 relative">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 -mt-2 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-[1.5rem] border border-emerald-500/20 flex items-center justify-center text-3xl font-black text-emerald-500">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight">{user?.name || 'Your profile'}</h2>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-secondary)] opacity-80">Personal information</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.35em] text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Primary Account
                  </span>
                </div>
                <div className="border-t border-[var(--card-border)] mb-5" />

                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Full Name</Label>
                      <div className="relative group/input">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] group-focus-within/input:text-emerald-500 transition-colors" />
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-11 pl-10 bg-[var(--bg-color)]/55 border-[var(--card-border)] rounded-2xl text-xs font-bold focus-visible:ring-emerald-500/30 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Email Address</Label>
                      <div className="relative group/input">
                        <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] group-focus-within/input:text-emerald-500 transition-colors" />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-11 pl-10 bg-[var(--bg-color)]/55 border-[var(--card-border)] rounded-2xl text-xs font-bold focus-visible:ring-emerald-500/30 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <Button
                      type="submit"
                      disabled={isUpdating}
                      className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.15em] text-[10px] h-11 px-6 rounded-2xl shadow-[0_0_18px_rgba(16,185,129,0.18)] hover:shadow-[0_0_26px_rgba(16,185,129,0.3)] transition-all"
                    >
                      {isUpdating ? 'Syncing...' : 'Save Changes'} <Zap size={14} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        )}

        {/* SECURITY BENTO */}
        {activeTab === 'security' && (
          <motion.div variants={itemVariants} className="md:col-span-12 xl:col-span-5">
            <Card className="bg-[var(--card-bg)]/50 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-color)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-primary)] shadow-inner">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tight text-[var(--text-primary)]">Change Password</h3>
                    <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">Update your login password securely</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="h-12 pr-11 bg-[var(--bg-color)]/55 border-[var(--card-border)] rounded-2xl text-xs font-bold focus-visible:ring-emerald-500/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="h-12 pr-11 bg-[var(--bg-color)]/55 border-[var(--card-border)] rounded-2xl text-xs font-bold focus-visible:ring-emerald-500/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="h-12 pr-11 bg-[var(--bg-color)]/55 border-[var(--card-border)] rounded-2xl text-xs font-bold focus-visible:ring-emerald-500/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      disabled={isPasswordChanging}
                      className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.15em] text-[10px] h-12 px-6 rounded-2xl shadow-[0_0_18px_rgba(16,185,129,0.18)] hover:shadow-[0_0_26px_rgba(16,185,129,0.3)] transition-all"
                    >
                      {isPasswordChanging ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        )}

        {/* CATEGORY HUB */}
        {activeTab === 'categories' && (
          <motion.div variants={itemVariants} className="md:col-span-12 xl:col-span-8">
            <Card className="bg-[var(--card-bg)]/50 backdrop-blur-xl rounded-2xl p-6 h-full space-y-6">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-[var(--text-primary)]">Category Hub</h3>
                <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">Create and manage custom transaction categories</p>
              </div>

              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2">
                {Object.keys(categories).map(catName => {
                  const cat = categories[catName];
                  return (
                    <div key={catName} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-${cat.accent}-500/20 bg-${cat.accent}-500/5 text-${cat.accent}-400 text-xs font-bold uppercase tracking-wide`}>
                      <span>{catName}</span>
                      <button
                        type="button"
                        onClick={() => onDeleteCategory(catName)}
                        className="text-[10px] text-[var(--text-secondary)] hover:text-rose-500 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[var(--card-border)]/50 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Create New Category</h4>
                <CategoryForm onAddCategory={onAddCategory} />
              </div>
            </Card>
          </motion.div>
        )}

        {/* DANGER ZONE BENTO */}
        {activeTab === 'danger' && (
          <motion.div variants={itemVariants} className="md:col-span-12 xl:col-span-4">
            <Card className="bg-[var(--card-bg)]/90 border border-rose-500/20 rounded-2xl p-6 relative overflow-hidden group hover:bg-[var(--card-bg)]/95 transition-colors min-h-[360px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 flex flex-col items-start gap-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)] transition-transform mb-4">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-rose-500">Delete Account</h3>
                  <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1 leading-relaxed">
                    Permanently delete your account and all data. This action cannot be undone.
                  </p>
                </div>

                <div className="w-full space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowDeactivateConfirm(true)}
                    className="w-full h-12 border-rose-500/40 text-rose-500 bg-white/5 hover:bg-rose-700 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.18em] transition duration-200 ease-out shadow-sm hover:shadow-md active:translate-y-px active:bg-rose-800 focus-visible:ring-2 focus-visible:ring-rose-400/30"
                  >
                    Delete Account <LogOut size={14} className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </Button>

                  {showDeactivateConfirm && (
                    <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-4 text-[var(--text-primary)] shadow-lg shadow-rose-500/10">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shadow-inner">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black uppercase tracking-[0.25em] text-rose-500">Confirm account deletion</p>
                          <p className="text-[11px] leading-relaxed text-rose-500/80 mt-2">
                            Delete your account now. This will deactivate your profile and sign you out immediately.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Button
                          variant="destructive"
                          size="lg"
                          onClick={handleDeactivateAccount}
                          disabled={isDeactivating}
                          className="h-12 text-[10px] font-black uppercase tracking-[0.18em] rounded-2xl shadow-sm transition duration-200 ease-out bg-rose-600 text-white hover:bg-rose-800 hover:text-white active:scale-[0.98] active:bg-rose-900"
                        >
                          {isDeactivating ? 'Deleting...' : 'Delete Account'}
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setShowDeactivateConfirm(false)}
                          className="h-12 text-[10px] font-black uppercase tracking-[0.18em] rounded-2xl shadow-sm transition duration-200 ease-out hover:bg-white/10 active:scale-[0.99]"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

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

function CategoryForm({ onAddCategory }) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('Coffee');
  const [accent, setAccent] = useState('emerald');

  const icons = ['Coffee', 'Home', 'BookOpen', 'Dumbbell', 'Gift', 'Briefcase', 'Utensils', 'ShoppingBag', 'Car', 'Heart'];
  const accents = ['emerald', 'indigo', 'rose', 'amber', 'sky', 'violet', 'pink'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCategory(name.trim(), icon, accent);
    setName('');
    setIcon('Coffee');
    setAccent('emerald');
    toast.success(`Category "${name}" Created Successfully`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      <div className="space-y-2">
        <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Category Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="E.g., Groceries"
          className="h-10 bg-[var(--bg-color)]/50 border-[var(--card-border)] rounded-xl text-xs font-bold focus-visible:ring-emerald-500/30"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Accent Theme</Label>
        <div className="flex flex-wrap gap-1.5 p-1 bg-[var(--bg-color)]/50 border border-[var(--card-border)] rounded-xl h-10 items-center justify-center">
          {accents.map(acc => {
            const colorClasses = {
              emerald: 'bg-emerald-500 hover:bg-emerald-400',
              indigo: 'bg-indigo-500 hover:bg-indigo-400',
              rose: 'bg-rose-500 hover:bg-rose-400',
              amber: 'bg-amber-500 hover:bg-amber-400',
              sky: 'bg-sky-500 hover:bg-sky-400',
              violet: 'bg-violet-500 hover:bg-violet-400',
              pink: 'bg-pink-500 hover:bg-pink-400'
            };
            return (
              <button
                key={acc}
                type="button"
                onClick={() => setAccent(acc)}
                className={`w-5 h-5 rounded-full ${colorClasses[acc]} transition-transform ${accent === acc ? 'scale-125 border border-white' : 'opacity-60 hover:opacity-100'}`}
              />
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 space-y-2">
          <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.15em] ml-1">Symbol</Label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full h-10 bg-[var(--bg-color)]/50 border border-[var(--card-border)] rounded-xl text-xs font-bold text-[var(--text-primary)] outline-none px-3 cursor-pointer"
          >
            {icons.map(ic => (
              <option key={ic} value={ic} className="bg-slate-900 text-white">{ic}</option>
            ))}
          </select>
        </div>
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[9px] h-10 px-4 rounded-xl shadow-lg shadow-emerald-500/20"
        >
          Add
        </Button>
      </div>
    </form>
  );
}

