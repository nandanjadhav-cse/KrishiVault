import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calculator as CalcIcon,
  TrendingDown,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Layers,
  Coins,
  ShieldCheck
} from 'lucide-react';

export const Calculator = () => {
  const { t } = useTranslation();

  // Calculator Inputs
  const [warehouseRent, setWarehouseRent] = useState(38000); // Total bay monthly rent ₹
  const [totalCapacity, setTotalCapacity] = useState(100); // MT total usable
  const [myCapacity, setMyCapacity] = useState(25); // MT needed by farmer
  const [numFarmers, setNumFarmers] = useState(4); // Farmers sharing
  const [durationMonths, setDurationMonths] = useState(5); // Duration in months
  const [handlingCharges, setHandlingCharges] = useState(25); // ₹ per MT handling
  const [sharingMode, setSharingMode] = useState('proportional'); // 'proportional' or 'equal'

  // Reset function
  const handleReset = () => {
    setWarehouseRent(38000);
    setTotalCapacity(100);
    setMyCapacity(25);
    setNumFarmers(4);
    setDurationMonths(5);
    setHandlingCharges(25);
    setSharingMode('proportional');
  };

  // Presets
  const applyPreset = (preset) => {
    switch (preset) {
      case 'onion':
        setWarehouseRent(42000);
        setTotalCapacity(100);
        setMyCapacity(30);
        setNumFarmers(3);
        setDurationMonths(5);
        setHandlingCharges(20);
        setSharingMode('proportional');
        break;
      case 'wheat':
        setWarehouseRent(62000);
        setTotalCapacity(200);
        setMyCapacity(40);
        setNumFarmers(5);
        setDurationMonths(6);
        setHandlingCharges(15);
        setSharingMode('proportional');
        break;
      case 'cold':
        setWarehouseRent(58000);
        setTotalCapacity(100);
        setMyCapacity(20);
        setNumFarmers(4);
        setDurationMonths(4);
        setHandlingCharges(35);
        setSharingMode('equal');
        break;
      default:
        break;
    }
  };

  // Arithmetic calculations
  // 1. If farmer had to rent the whole minimum commercial bay on their own:
  const soloMonthlyRent = warehouseRent;
  const soloHandlingTotal = myCapacity * handlingCharges;
  const soloTotalCost = (soloMonthlyRent * durationMonths) + soloHandlingTotal;

  // 2. Krishi Vault Shared Booking:
  const baseRatePerMtMonth = warehouseRent / totalCapacity;
  let sharedMonthlyRent = 0;

  if (sharingMode === 'proportional') {
    sharedMonthlyRent = myCapacity * baseRatePerMtMonth;
  } else {
    // Equal sharing among participating farmers
    sharedMonthlyRent = warehouseRent / Math.max(1, numFarmers);
  }

  const sharedHandling = myCapacity * handlingCharges;
  const sharedTotalCost = (sharedMonthlyRent * durationMonths) + sharedHandling;

  // 3. Savings calculation
  const totalSavings = Math.max(0, soloTotalCost - sharedTotalCost);
  const percentSaved = soloTotalCost > 0 ? Math.round((totalSavings / soloTotalCost) * 100) : 0;
  const effectiveRatePerMtMonth = myCapacity > 0 ? Math.round(sharedMonthlyRent / myCapacity) : 0;

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-krishi-700 bg-krishi-100 px-3 py-1 rounded-full border border-krishi-200">
            Interactive Financial Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {t('calculator.title')}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('calculator.subtitle')}
          </p>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-semibold text-slate-600">Quick Scenarios:</span>
            <button
              onClick={() => applyPreset('onion')}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
            >
              🧅 Nashik Onion Bay
            </button>
            <button
              onClick={() => applyPreset('wheat')}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
            >
              🌾 Punjab Wheat Silo
            </button>
            <button
              onClick={() => applyPreset('cold')}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            >
              ❄️ Cold Storage Equal Split
            </button>
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CalcIcon className="w-5 h-5 text-krishi-600" />
                <span>Storage Parameters</span>
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('calculator.reset')}</span>
              </button>
            </div>

            <div className="space-y-5">
              
              {/* Warehouse Rent */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {t('calculator.warehouseRent')}
                  </label>
                  <span className="text-sm font-extrabold text-slate-900">
                    ₹{warehouseRent.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="2000"
                  value={warehouseRent}
                  onChange={(e) => setWarehouseRent(Number(e.target.value))}
                  className="w-full accent-krishi-600 cursor-pointer"
                />
                <span className="text-[11px] text-slate-600">Standard monthly bay rent charged by facility owner</span>
              </div>

              {/* Total Bay Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('calculator.totalCapacity')}
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={totalCapacity}
                    onChange={(e) => setTotalCapacity(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                  />
                </div>

                {/* My Required Capacity */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('calculator.myCapacity')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={totalCapacity}
                    value={myCapacity}
                    onChange={(e) => setMyCapacity(Math.min(totalCapacity, Math.max(1, Number(e.target.value))))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                  />
                </div>
              </div>

              {/* Farmers & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('calculator.numFarmers')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={numFarmers}
                    onChange={(e) => setNumFarmers(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('calculator.duration')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                  />
                </div>
              </div>

              {/* Handling charges */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Labor & Handling Surcharge (₹/MT one-time)
                  </label>
                  <span className="text-xs font-extrabold text-slate-900">₹{handlingCharges}/MT</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={handlingCharges}
                  onChange={(e) => setHandlingCharges(Number(e.target.value))}
                  className="w-full accent-krishi-600 cursor-pointer"
                />
              </div>

              {/* Cost Sharing Mode Selection */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {t('calculator.sharingMode')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSharingMode('proportional')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      sharingMode === 'proportional'
                        ? 'border-krishi-600 bg-krishi-50 text-krishi-900 font-bold ring-2 ring-krishi-500/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs font-bold mb-0.5">1. Proportional by MT</p>
                    <p className="text-[11px] text-slate-600 font-normal">
                      Pay strictly according to the metric tonnes you occupy.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSharingMode('equal')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      sharingMode === 'equal'
                        ? 'border-krishi-600 bg-krishi-50 text-krishi-900 font-bold ring-2 ring-krishi-500/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-xs font-bold mb-0.5">2. Equal Cost Splitting</p>
                    <p className="text-[11px] text-slate-600 font-normal">
                      Rent is divided equally among participating farmers.
                    </p>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Results Comparison Section (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Savings Big Card */}
            <div className="bg-gradient-to-br from-krishi-900 via-soil-900 to-krishi-950 rounded-3xl p-6 sm:p-8 text-white shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-32 h-32 bg-harvest-400/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-[10px] font-bold uppercase tracking-wider text-harvest-300 bg-harvest-500/20 px-2.5 py-1 rounded-full border border-harvest-400/30 inline-block mb-3">
                Calculated Co-Op Benefit
              </span>

              <h3 className="text-xl font-extrabold mb-1">
                {t('calculator.totalSavings')}
              </h3>

              <div className="flex items-baseline gap-2 my-2">
                <span className="text-4xl sm:text-5xl font-black text-harvest-400">
                  ₹{totalSavings.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-emerald-400">
                  ({percentSaved}% Saved)
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Compared to booking a private warehouse bay independently for {durationMonths} months.
              </p>

              {/* Side-by-Side Cost Comparison */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Solo Unshared Cost:</span>
                  <span className="font-semibold text-slate-200 line-through">
                    ₹{soloTotalCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-white font-bold text-sm pt-2 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-harvest-300">
                    <Sparkles className="w-4 h-4" />
                    Krishi Vault Group Cost:
                  </span>
                  <span className="text-base text-harvest-300 font-extrabold">
                    ₹{Math.round(sharedTotalCost).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Visual Comparison Progress Bar */}
              <div className="mt-6 space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-300 font-medium">
                  <span>Group Cost vs Solo Alternative</span>
                  <span>{100 - percentSaved}% of Solo Price</span>
                </div>
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-harvest-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(5, 100 - percentSaved)}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Effective monthly rate:</span>
                <span className="font-extrabold text-white">₹{effectiveRatePerMtMonth} / MT / Month</span>
              </div>
            </div>

            {/* Disclaimer & Action */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed italic">
                {t('calculator.disclaimer')}
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Print / Save Calculation Summary
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('onion')}
                  className="w-full py-2.5 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Find Warehouses Matching This Budget
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
