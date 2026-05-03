import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-indigo-50 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-900 tracking-tight mb-1">Authenticating</h2>
          <p className="text-slate-500 font-medium animate-pulse text-sm">Setting up your financial workspace...</p>
        </div>
      </div>
    </div>
  );
}
