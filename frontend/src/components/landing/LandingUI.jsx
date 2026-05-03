import React from "react";
import { cn } from "../../lib/utils";

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "relative inline-flex items-center justify-center px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all duration-500 overflow-hidden group";
  const variants = {
    primary: "bg-indigo-600 text-white shadow-[0_0_40px_-5px_rgba(79,70,229,0.5)] hover:bg-indigo-500 hover:shadow-indigo-500/50",
    secondary: "bg-black/40 text-white border border-white/20 hover:bg-white/10 backdrop-blur-xl",
    outline: "border-2 border-white/20 text-white hover:border-indigo-500",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </button>
  );
};

export const ThreeDCard = ({ children, className = '' }) => (
  <div className={`group perspective-1000 ${className}`}>
    <div className="relative transform-gpu transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateX(5deg)_rotateY(-5deg)]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/50 to-purple-600/50 rounded-[2.5rem] blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      <div className="relative bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 h-full [backface-visibility:hidden]">
        {children}
      </div>
    </div>
  </div>
);

