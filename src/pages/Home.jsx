import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { warehouseService } from '../services/warehouseService';
import { groupService } from '../services/groupService';
import { WarehouseCard } from '../components/common/WarehouseCard';
import {
  Search,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Users,
  CheckCircle2,
  ChevronDown,
  Award,
  Lock,
  FileCheck2,
  PhoneCall,
  Sparkles,
  Calculator,
  Warehouse
} from 'lucide-react';

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Search widget state
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCrop, setSearchCrop] = useState('');
  const [searchCapacity, setSearchCapacity] = useState('');

  // Sample data
  const featuredWarehouses = warehouseService.getAll().slice(0, 3);
  const activeGroups = groupService.getAll().slice(0, 3);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation) params.set('query', searchLocation);
    if (searchCrop) params.set('crop', searchCrop);
    if (searchCapacity) params.set('minCapacity', searchCapacity);
    navigate(`/warehouses?${params.toString()}`);
  };

  const faqs = [
    {
      q: "How does Group Booking reduce my agricultural storage costs?",
      a: "Commercial warehouses typically mandate booking entire bays (e.g., 50 to 200 MT). Small and marginal farmers rarely have that volume alone. With Krishi Vault, 3 to 10 neighboring farmers pool their harvests of the same crop. You pay only for the exact metric tonnes you deposit, saving up to 45% compared to paying for empty space."
    },
    {
      q: "Is my stored harvest insured against damage, fire, or pest infestation?",
      a: "Yes. All warehouses on Krishi Vault are vetted for compliance with Warehousing Development and Regulatory Authority (WDRA) benchmarks. Facilities maintain mandatory fire, transit, and burglary insurance along with scientific fumigation protocols."
    },
    {
      q: "Can I use my storage receipt to apply for a low-interest bank loan?",
      a: "Yes. Partner warehouses support electronic Negotiable Warehouse Receipts (e-NWR) registered on the national CCRL/NERL repositories. Farmers can pledge these digital receipts directly with commercial and cooperative banks for post-harvest pledge finance at subsidized interest rates."
    },
    {
      q: "What happens if a group member fails to bring their pledged grain volume?",
      a: "Groups feature an 85% pledge threshold and clear booking deadlines. The platform transparently recalculates proportional shares, or alerts nearby waitlisted farmers to fill the shortfall before warehouse dispatch."
    },
    {
      q: "How do warehouse owners benefit from listing their facilities?",
      a: "Instead of dealing with fragmented individual spot requests, warehouse operators receive organized, aggregated group contracts with pre-validated volumes and digital payments, ensuring 95%+ year-round bay occupancy."
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-krishi-950 via-krishi-900 to-soil-950 text-white overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-32">
        {/* Subtle decorative glow & grain textures */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-krishi-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-96 h-96 bg-harvest-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-krishi-800/80 border border-harvest-400/30 shadow-inner">
                <Sparkles className="w-4 h-4 text-harvest-400" />
                <span className="text-xs font-semibold text-harvest-300 tracking-wide">
                  {t('hero.badge')}
                </span>
              </div>

              <h1 className="hero-heading text-white font-extrabold tracking-tight">
                <span className="block sm:inline lg:block">
                  {t('hero.title')}
                </span>{' '}
                <span className="inline-flex items-baseline flex-wrap sm:flex-nowrap">
                  {t('hero.titleLead') && (
                    <span className="mr-2 sm:mr-3">{t('hero.titleLead')}</span>
                  )}
                  <span className="hero-highlight-container relative inline-block whitespace-nowrap">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-harvest-300 via-harvest-400 to-emerald-300 font-extrabold">
                      {t('hero.titleHighlight')}
                    </span>
                    {/* Clean decorative SVG underline positioned strictly beneath highlight text */}
                    <svg
                      className="hero-underline-svg"
                      viewBox="0 0 100 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7.5C28 2.5 72 2.5 98 6.5C75 4.5 32 4.5 12 7.8"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {/* Final green decorative dot aligned with text baseline */}
                  <span
                    className="hero-dot"
                    aria-hidden="true"
                  />
                  <span className="sr-only">.</span>
                </span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/warehouses"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-extrabold text-sm transition-all shadow-premium hover:scale-105 active:scale-95"
                >
                  <Warehouse className="w-4 h-4" />
                  <span>{t('hero.primaryCta')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/marketplace"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-krishi-800/80 hover:bg-krishi-700 text-white font-bold text-sm border border-krishi-600/60 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Users className="w-4 h-4 text-harvest-400" />
                  <span>Explore Shared Groups</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-krishi-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-harvest-400" />
                  <span>WDRA Certified Silos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <span>Up to 45% Rent Savings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-harvest-400" />
                  <span>e-NWR Loan Eligible</span>
                </div>
              </div>

            </div>

            {/* Right visual column: High Quality Indian Agri Imagery Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-krishi-700/50 shadow-2xl bg-krishi-900 group">
                <img
                  src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern agricultural grain warehouse with Indian farmer"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-krishi-950 via-transparent to-black/30 pointer-events-none" />

                {/* Floating Co-Op Live Badge */}
                <div className="absolute top-4 right-4 bg-krishi-900/90 backdrop-blur-md border border-harvest-400/40 p-3 rounded-2xl shadow-xl max-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-bold text-harvest-300">Live Group Share</span>
                  </div>
                  <p className="text-xs font-semibold text-white truncate">Nashik Red Onion Bay</p>
                  <p className="text-[10px] text-slate-300">65 / 100 MT (35 MT Left)</p>
                </div>

                {/* Bottom Card Stat */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-300">Community Storage</p>
                    <p className="text-sm font-extrabold text-white">Save ₹12,000 / Season</p>
                  </div>
                  <Link
                    to="/calculator"
                    className="px-3 py-1.5 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 text-xs font-bold transition-all"
                  >
                    Calculate
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* 2. INTERACTIVE WAREHOUSE SEARCH BAR WIDGET */}
          <div className="mt-12 bg-white rounded-3xl p-4 sm:p-6 shadow-premium border border-slate-100 text-slate-900">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              
              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-krishi-500 transition-colors">
                <MapPin className="w-5 h-5 text-krishi-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Location / District
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nashik, Ludhiana, Indore..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Crop Type */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-krishi-500 transition-colors">
                <Layers className="w-5 h-5 text-harvest-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Crop Type
                  </label>
                  <select
                    value={searchCrop}
                    onChange={(e) => setSearchCrop(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Crops</option>
                    <option value="Onion">Onion (कांदा)</option>
                    <option value="Wheat">Wheat (गेहूँ)</option>
                    <option value="Potato">Potato (आलू)</option>
                    <option value="Soybean">Soybean (सोयाबीन)</option>
                    <option value="Cotton">Cotton (कपास)</option>
                    <option value="Groundnut">Groundnut (मूंगफली)</option>
                    <option value="Chilli">Red Chilli (मिर्च)</option>
                  </select>
                </div>
              </div>

              {/* Capacity Needed */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-krishi-500 transition-colors">
                <Warehouse className="w-5 h-5 text-krishi-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Storage Needed (MT)
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 10 MT"
                    value={searchCapacity}
                    onChange={(e) => setSearchCapacity(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full h-full min-h-[52px] flex items-center justify-center gap-2 rounded-2xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-sm transition-all shadow-md active:scale-98"
                >
                  <Search className="w-4 h-4 text-harvest-400" />
                  <span>{t('hero.searchBtn')}</span>
                </button>
              </div>

            </form>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-krishi-900/60 border border-krishi-800">
              <p className="text-3xl font-extrabold text-harvest-400">{t('hero.statFarmers')}</p>
              <p className="text-xs text-slate-300 mt-1">{t('hero.statFarmersLabel')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-krishi-900/60 border border-krishi-800">
              <p className="text-3xl font-extrabold text-white">{t('hero.statWarehouses')}</p>
              <p className="text-xs text-slate-300 mt-1">{t('hero.statWarehousesLabel')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-krishi-900/60 border border-krishi-800">
              <p className="text-3xl font-extrabold text-emerald-400">{t('hero.statCapacity')}</p>
              <p className="text-xs text-slate-300 mt-1">{t('hero.statCapacityLabel')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-krishi-900/60 border border-krishi-800">
              <p className="text-3xl font-extrabold text-harvest-400">{t('hero.statSavings')}</p>
              <p className="text-xs text-slate-300 mt-1">{t('hero.statSavingsLabel')}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW KRISHI VAULT WORKS */}
      <section className="py-20 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-krishi-700 bg-krishi-100 px-3 py-1 rounded-full">
              Seamless Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {t('howItWorks.title')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-krishi-100 text-krishi-800 font-extrabold flex items-center justify-center text-xl mb-4 border border-krishi-200">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {t('howItWorks.step1Title')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('howItWorks.step1Desc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-krishi-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified WDRA Standards</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-harvest-100 text-harvest-800 font-extrabold flex items-center justify-center text-xl mb-4 border border-harvest-200">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {t('howItWorks.step2Title')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('howItWorks.step2Desc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-harvest-700 font-semibold">
                <Users className="w-4 h-4" />
                <span>Co-Op Sharing Power</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xl mb-4 border border-emerald-200">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {t('howItWorks.step3Title')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('howItWorks.step3Desc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <TrendingDown className="w-4 h-4" />
                <span>Pay Only What You Use</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 font-extrabold flex items-center justify-center text-xl mb-4 border border-blue-200">
                  04
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {t('howItWorks.step4Title')}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t('howItWorks.step4Desc')}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-700 font-semibold">
                <FileCheck2 className="w-4 h-4" />
                <span>Instant e-NWR Slips</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FEATURED WAREHOUSES SECTION */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-krishi-700 bg-krishi-100 px-3 py-1 rounded-full">
                Featured Facilities
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Certified Storage Across Key Agricultural Belts
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Temperature-controlled silos, ventilated onion chawls, and cold chain centers.
              </p>
            </div>

            <Link
              to="/warehouses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-krishi-50 hover:bg-krishi-100 text-krishi-800 font-bold text-xs transition-colors self-start md:self-auto"
            >
              <span>View All 320+ Warehouses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWarehouses.map((wh) => (
              <WarehouseCard key={wh.id} warehouse={wh} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. GROUP BOOKING MARKETPLACE HIGHLIGHT */}
      <section className="py-20 bg-gradient-to-br from-krishi-900 via-soil-900 to-krishi-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-harvest-300 bg-harvest-500/20 border border-harvest-400/30 px-3 py-1 rounded-full">
                Core Innovation: Group Bookings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Don't Rent an Entire Bay Alone. <br />
                <span className="text-harvest-400">Share with Nearby Farmers.</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                When farmers unite, individual storage costs drop drastically. Join active groups or initiate a shared pool for your harvest today.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-harvest-500 text-slate-950 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200">
                    <strong className="text-white">Zero Minimum Capacity Penalty:</strong> Store 5 MT, 15 MT, or 50 MT at bulk wholesale commercial rates.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-harvest-500 text-slate-950 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200">
                    <strong className="text-white">Fair Math Algorithm:</strong> Automatic cost splitting based strictly on occupied space or equal share choices.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-harvest-500 text-slate-950 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200">
                    <strong className="text-white">Transport Pooling:</strong> Connect with group peers to share tractor-trolley and truck freight to the facility.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/marketplace"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-bold text-sm shadow-premium transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>Browse Open Groups</span>
                </Link>
                <Link
                  to="/calculator"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
                >
                  <Calculator className="w-4 h-4 text-harvest-400" />
                  <span>Try Savings Calculator</span>
                </Link>
              </div>
            </div>

            {/* Right side: Live groups showcase */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Active Storage Pools Accepting Members:
              </h3>

              {activeGroups.map((grp) => {
                const percent = Math.round((grp.capacityAllocated / grp.capacityTarget) * 100);
                return (
                  <div
                    key={grp.id}
                    className="p-5 rounded-2xl bg-krishi-800/80 border border-krishi-700/60 backdrop-blur-md shadow-card hover:border-harvest-400/40 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-krishi-700 text-harvest-300">
                          {grp.cropType} • {grp.location}
                        </span>
                        <h4 className="font-bold text-white text-sm mt-1">{grp.title}</h4>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {grp.status === 'open' ? 'Open' : 'Almost Full'}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Pledged: {grp.capacityAllocated} MT</span>
                        <span>Target: {grp.capacityTarget} MT ({percent}%)</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-harvest-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-krishi-700/50">
                      <span className="text-slate-300">
                        {grp.members.length} Farmers Joined • Rate: ₹{grp.rentPerMtMonth}/MT
                      </span>
                      <Link
                        to={`/marketplace`}
                        className="text-harvest-400 font-bold hover:text-harvest-300 flex items-center gap-1"
                      >
                        <span>Join</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 5. DUAL VALUE PROPOSITIONS: FARMERS VS WAREHOUSE OWNERS */}
      <section className="py-20 bg-[#f8f9f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Built for Farmers, Partnered with Owners
            </h2>
            <p className="text-sm text-slate-600">
              A win-win ecosystem solving India's post-harvest crisis together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* For Farmers */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-krishi-100 text-krishi-700 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {t('benefits.farmerTitle')}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-krishi-600 shrink-0 mt-0.5" />
                  <span>{t('benefits.farmer1')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-krishi-600 shrink-0 mt-0.5" />
                  <span>{t('benefits.farmer2')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-krishi-600 shrink-0 mt-0.5" />
                  <span>{t('benefits.farmer3')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-krishi-600 shrink-0 mt-0.5" />
                  <span>{t('benefits.farmer4')}</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/warehouses"
                  className="inline-flex items-center gap-2 text-xs font-bold text-krishi-800 hover:text-krishi-700"
                >
                  <span>Explore Available Warehouses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* For Warehouse Owners */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-harvest-100 text-harvest-700 flex items-center justify-center mb-6">
                <Warehouse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {t('benefits.ownerTitle')}
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-harvest-600 shrink-0 mt-0.5" />
                  <span>{t('benefits.owner1')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-harvest-600 shrink-0 mt-0.5" />
                  <span>{t('benefits.owner2')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-harvest-600 shrink-0 mt-0.5" />
                  <span>{t('benefits.owner3')}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-harvest-600 shrink-0 mt-0.5" />
                  <span>{t('benefits.owner4')}</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/owner-dashboard"
                  className="inline-flex items-center gap-2 text-xs font-bold text-harvest-800 hover:text-harvest-700"
                >
                  <span>Visit Warehouse Owner Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS (ILLUSTRATIVE DEMO CONTENT) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              Illustrative Prototype Testimonials
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Voices from the Fields
            </h2>
            <p className="text-xs text-slate-600">
              Demonstration profiles illustrating practical real-world savings for Indian farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Farmer 1 */}
            <div className="bg-[#fcfdfa] p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
              <p className="text-xs text-slate-700 italic leading-relaxed mb-6">
                "In Lasalgaon, onion prices fluctuate violently between November and February. Instead of distress-selling my 35 tonnes at ₹8/kg, I co-booked a ventilated bay with 3 neighbors through Krishi Vault. We sold in February at ₹24/kg, tripling our returns!"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80"
                  alt="Ramesh Patil"
                  className="w-10 h-10 rounded-full object-cover border border-krishi-600"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Ramesh Patil</h4>
                  <p className="text-[11px] text-slate-600">Onion Grower, Lasalgaon (Nashik)</p>
                </div>
              </div>
            </div>

            {/* Farmer 2 */}
            <div className="bg-[#fcfdfa] p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
              <p className="text-xs text-slate-700 italic leading-relaxed mb-6">
                "We had 75 MT of high-grade Sharbati wheat in Khanna. Commercial steel silos asked for 200 MT minimum. With Krishi Vault, three of us pooled together into a single automated bin. Clean moisture control and zero pest losses."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
                  alt="Gurpreet Singh"
                  className="w-10 h-10 rounded-full object-cover border border-harvest-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Gurpreet Singh Dhillon</h4>
                  <p className="text-[11px] text-slate-600">Wheat & Paddy Farmer, Ludhiana</p>
                </div>
              </div>
            </div>

            {/* Owner */}
            <div className="bg-[#fcfdfa] p-6 rounded-3xl border border-slate-200/80 shadow-subtle flex flex-col justify-between">
              <p className="text-xs text-slate-700 italic leading-relaxed mb-6">
                "Our cold storage had 400 MT sitting idle during off-season. Krishi Vault grouped 18 potato farmers and filled the chamber within 48 hours. Digital ledger and verified payments make management effortless."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Vikramaditya Deshmukh"
                  className="w-10 h-10 rounded-full object-cover border border-krishi-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Vikramaditya Deshmukh</h4>
                  <p className="text-[11px] text-slate-600">Sahyadri Agro Logistics, Pune</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-[#fafaf7] border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-krishi-700 bg-krishi-100 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Everything you need to know about collaborative warehousing on Krishi Vault.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:text-krishi-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 ml-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-krishi-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. STRONG FINAL CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-krishi-800 to-soil-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to Protect Your Harvest and Save on Storage?
          </h2>
          <p className="text-sm sm:text-base text-krishi-100 max-w-xl mx-auto">
            Join thousands of progressive farmers across Maharashtra, Punjab, Gujarat, and Madhya Pradesh.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/warehouses"
              className="px-8 py-3.5 rounded-2xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-extrabold text-sm shadow-premium transition-all hover:scale-105 active:scale-95"
            >
              Find a Warehouse Today
            </Link>
            <Link
              to="/calculator"
              className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Calculate Your Savings
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
