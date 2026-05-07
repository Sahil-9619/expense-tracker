import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Shield, Bell, CreditCard, 
  Globe, Zap, Camera, Terminal,
  ShieldCheck, Smartphone, Key
} from 'lucide-react';
import { toast } from "sonner";
import { setUser as setReduxUser } from '../../redux/slices/authSlice';

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(setReduxUser({ ...user, ...formData }));
    toast.success("System Identity Updated Successfully");
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-xl font-black tracking-tight text-[var(--text-primary)] uppercase">System Configuration</h1>
        <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-60">Manage your node preferences and security</p>
      </div>

      <Tabs defaultValue="identity" className="w-full flex flex-col md:flex-row gap-8">
        <TabsList className="flex flex-col h-auto bg-transparent border-none p-0 gap-2 min-w-[200px]">
          <SettingsTab value="identity" icon={User} label="Identity" />
          <SettingsTab value="security" icon={Shield} label="Security" />
          <SettingsTab value="notifications" icon={Bell} label="Notifications" />
          <SettingsTab value="billing" icon={CreditCard} label="Billing" />
          <SettingsTab value="api" icon={Terminal} label="API Access" />
        </TabsList>

        <div className="flex-1">
          <TabsContent value="identity" className="mt-0 space-y-6">
            <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm">
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-xl bg-[var(--bg-color)] overflow-hidden border border-[var(--card-border)] shadow-lg group-hover:scale-105 transition-transform duration-500">
                      {user?.profile_pic ? (
                        <img src={user.profile_pic} alt="Identity" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-black text-emerald-500">
                          {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <button className="absolute -bottom-1 -right-1 p-2 bg-emerald-600 text-white rounded-lg shadow-xl hover:scale-110 active:scale-95 transition-all">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black text-[var(--text-primary)] uppercase tracking-tight">Authorized Identity</CardTitle>
                    <CardDescription className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-1">Status: Active Protocol</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-6">
                <form onSubmit={handleUpdate} className="space-y-6 max-w-md">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Full Name</Label>
                      <Input 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-md text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Email Address</Label>
                      <Input 
                        type="email"
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11 bg-[var(--bg-color)] border-[var(--card-border)] rounded-md text-xs font-bold"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] h-11 px-8 rounded-md shadow-lg shadow-emerald-500/10">
                    Sync Changes <Zap size={14} className="ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-rose-500/5 border border-rose-500/10 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 group">
              <div>
                <h5 className="text-sm font-black text-rose-400 uppercase tracking-tight group-hover:text-rose-300 transition-colors">Terminate Account</h5>
                <p className="text-[10px] font-bold text-rose-500/60 uppercase tracking-widest mt-1">Permanently purge all protocol data from our servers</p>
              </div>
              <Button variant="outline" className="h-10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white rounded-md text-[9px] font-black uppercase tracking-widest">
                Execute Purge
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0">
            <Card className="bg-[var(--card-bg)] border-[var(--card-border)] rounded-sm p-8">
              <h2 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-tight mb-8">Security Protocols</h2>
              <div className="space-y-6">
                <SecurityItem icon={ShieldCheck} title="Two-Factor Authentication" desc="Add an extra layer of security to your account" active={true} />
                <SecurityItem icon={Smartphone} title="Mobile Sessions" desc="Manage devices currently logged into your node" />
                <SecurityItem icon={Key} title="Change Password" desc="Last updated: 3 months ago" />
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function SettingsTab({ value, icon: Icon, label }) {
  return (
    <TabsTrigger 
      value={value} 
      className="w-full justify-start gap-3 px-4 py-3 rounded-md text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-500 data-[state=active]:border-emerald-500/20 border border-transparent transition-all"
    >
      <Icon size={16} strokeWidth={2.5} />
      {label}
    </TabsTrigger>
  );
}

function SecurityItem({ icon: Icon, title, desc, active = false }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-md bg-[var(--bg-color)]/40 border border-[var(--card-border)] group hover:border-emerald-500/30 transition-all">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-[var(--text-secondary)]'}`}>
          <Icon size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-black uppercase tracking-tight text-[var(--text-primary)]">{title}</span>
          <span className="text-[9px] text-[var(--text-secondary)] font-medium">{desc}</span>
        </div>
      </div>
      <Button variant="ghost" className="text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/5">Configure</Button>
    </div>
  );
}
