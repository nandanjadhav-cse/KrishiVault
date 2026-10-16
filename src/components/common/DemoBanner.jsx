import React from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Sparkles, UserCheck, Warehouse, RotateCcw } from 'lucide-react';

export const DemoBanner = () => {
  const { currentUser, demoLogin, resetDemoData } = useApp();
  const { t } = useTranslation();

  return (
    <aside aria-label="Demo environment notice" className="bg-gradient-to-r from-krishi-900 via-soil-900 to-krishi-950 text-white text-xs py-2 px-4 border-b border-krishi-700/50 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-harvest-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-harvest-500"></span>
          </span>
          <span className="font-semibold text-harvest-300 tracking-wide uppercase text-[10px] bg-krishi-800/80 px-2 py-0.5 rounded-full border border-harvest-500/30">
            College Prototype Demo
          </span>
          <span className="hidden sm:inline text-slate-300">
            Simulated agritech environment with localStorage persistence.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden md:inline">Quick Switch:</span>
          
          <button
            onClick={() => demoLogin('farmer')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              currentUser?.role === 'farmer'
                ? 'bg-harvest-500 text-slate-900 font-bold shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
            title="Log in as demo farmer Ramesh Patil (Nashik)"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Farmer: {currentUser?.role === 'farmer' ? currentUser.name.split(' ')[0] : 'Ramesh'}</span>
          </button>

          <button
            onClick={() => demoLogin('owner')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              currentUser?.role === 'owner'
                ? 'bg-harvest-500 text-slate-900 font-bold shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
            title="Log in as demo warehouse operator Vikramaditya Deshmukh"
          >
            <Warehouse className="w-3.5 h-3.5" />
            <span>Owner: {currentUser?.role === 'owner' ? currentUser.name.split(' ')[0] : 'Vikram'}</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all sample warehouses, groups, and bookings to initial defaults?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-700/40 ml-1 transition-all"
            title="Reset demo data to initial defaults"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset Data</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
