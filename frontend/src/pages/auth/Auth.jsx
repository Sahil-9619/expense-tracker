import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from "../../lib/utils";
import { HiOutlineSparkles, HiOutlineShieldCheck, HiArrowLeft } from 'react-icons/hi2';
import { AuthForm } from './AuthForm';
import { motion } from 'motion/react';
import { Boxes } from '../../components/UI/background-boxes';
import { AnimatedThemeToggler } from '../../components/UI/animated-theme-toggler';
import { BRAND_NAME } from '../../lib/constants';
import { useSearchParams } from 'react-router-dom';

export default function Auth({ onLogin }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formType, setFormType] = React.useState(searchParams.get("mode") === "signup" ? "signup" : "login");

  return (
    <div className="h-screen bg-[var(--bg-color)] flex flex-col md:flex-row relative overflow-hidden font-sans selection:bg-emerald-500/30 transition-colors duration-500">
      {/* Global Actions */}
      <div className="absolute top-4 left-4 right-4 z-[100] flex items-center justify-between pointer-events-none">
        <button
          onClick={() => navigate('/')}
          className="group pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-color)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-emerald-500 transition-all hover:border-emerald-500/30 shadow-lg active:scale-95"
        >
          <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Back to Home</span>
        </button>

        <div className="pointer-events-auto">
          <AnimatedThemeToggler variant="circle" />
        </div>
      </div>

      {/* Left Section (Desktop Only) */}
      <div className="hidden md:flex flex-1 relative overflow-hidden border-r border-[var(--card-border)] group bg-[var(--bg-color)] h-full">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/auth_bg.png"
            alt="Security Background"
            className="w-full h-full object-cover opacity-25 dark:opacity-10 scale-105 group-hover:scale-100 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-color)] via-[var(--bg-color)]/20 to-transparent opacity-75 dark:opacity-95" />
        </div>

        <div className="relative z-20 p-8 lg:p-12 flex flex-col h-full w-full justify-center">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2.5 mb-12 cursor-pointer group/logo w-fit"
              onClick={() => navigate('/')}
            >
              <div className="bg-emerald-600 p-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover/logo:scale-110 transition-transform">
                <HiOutlineSparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-[var(--text-primary)] uppercase group-hover/logo:text-emerald-500 transition-colors">{BRAND_NAME}</span>
            </motion.div>

            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-[1.1] tracking-tighter uppercase">
                  Control Your <br />
                  <span className="text-emerald-500">Wealth</span> With <br />
                  Precision.
                </h2>
                <p className="mt-6 text-base text-[var(--text-secondary)] max-w-sm leading-relaxed font-medium">
                  A software to manage your expenses with ease and precision.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-8 border-t border-[var(--card-border)] pt-8"
              >
                <div>
                  <p className="text-3xl font-black text-[var(--text-primary)]">Free &</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-bold mt-1.5">Efficient</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-[var(--text-primary)]">Easy and</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-bold mt-1.5">Encrypted</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex-1 relative bg-[var(--bg-color)] h-full overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Boxes />
        </div>

        <div className={cn("absolute inset-0 z-20 flex flex-col p-4 sm:p-8", formType === "signup" ? "overflow-y-auto custom-scrollbar" : "overflow-hidden")}>
          <div className="w-full max-w-[420px] mx-auto my-auto py-8 relative">
            {/* Mobile Header (Replaced "Protocol Access" with Logo) */}
            <div className="text-center mb-8 md:hidden cursor-pointer group" onClick={() => navigate('/')}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center justify-center bg-emerald-600 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] mb-4"
              >
                <HiOutlineSparkles className="w-5 h-5 text-white" />
              </motion.div>
              <h1 className="text-2xl font-black tracking-tighter text-[var(--text-primary)] uppercase mb-0.5">
                {BRAND_NAME}
              </h1>
              <p className="text-emerald-500 text-[8px] font-black uppercase tracking-[0.3em] opacity-80">
                Wealth Precision Tools
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AuthForm onLogin={onLogin} onTypeChange={setFormType} />
            </motion.div>

            <div className="mt-8 flex items-center justify-center gap-2.5 text-[var(--text-secondary)]">
              <HiOutlineShieldCheck className="w-3.5 h-3.5 opacity-60 text-emerald-500" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">AES-256 Bit Encryption Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
