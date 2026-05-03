import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles, ShieldCheck, Code, Compass } from 'lucide-react';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Mesh Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0,transparent_70%)]" />
      
      <div className="w-full max-w-[480px] relative z-10 animate-in fade-in zoom-in-95 duration-1000">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-indigo-600 p-3 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.4)] mb-8">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">Protocol Access</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Secure Authentication Gateway</p>
        </div>

        <div className="bento-card p-1">
          <div className="bg-slate-950/50 rounded-[1.9rem] p-10 backdrop-blur-3xl">
            {/* Login/Signup Toggle */}
            <div className="bg-white/5 p-1 rounded-2xl flex mb-12 relative border border-white/5">
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isLogin ? 'left-1' : 'left-[50%]'}`} 
              />
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] relative z-10 transition-colors ${isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] relative z-10 transition-colors ${!isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Register
              </button>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              {!isLogin && (
                <AuthInput icon={User} label="Identity Name" placeholder="John Doe" />
              )}

              <AuthInput icon={Mail} label="Access Endpoint" placeholder="name@org.com" type="email" />
              <AuthInput icon={Lock} label="Security Key" placeholder="••••••••••••" type="password" />

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">Recover Access</button>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] mt-8 group"
              >
                {isLogin ? 'Initialize Session' : 'Create Account'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative py-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[9px]"><span className="bg-transparent px-4 text-slate-500 font-black uppercase tracking-[0.2em]">External Handshake</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SocialButton icon={Compass} label="Google" />
              <SocialButton icon={Code} label="Github" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 text-slate-600">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">AES-256 Bit Encryption Protocol</span>
        </div>
      </div>
    </div>
  );
}

function AuthInput({ icon: Icon, label, placeholder, type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
        <input 
          type={type} 
          placeholder={placeholder}
          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-14 py-4 text-sm font-bold text-white placeholder:text-slate-700 focus:bg-white/[0.05] focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
        />
      </div>
    </div>
  );
}

function SocialButton({ icon: Icon, label }) {
  return (
    <button className="flex items-center justify-center gap-3 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.07] hover:border-white/10 transition-all text-[9px] font-black uppercase tracking-widest text-slate-300">
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}
