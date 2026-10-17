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
  Warehouse,
  Building2,
  Handshake,
  HeartHandshake,
  Check,
  Scale,
  GraduationCap,
  Globe,
  ExternalLink,
  ChevronRight,
  Info,
  Maximize2,
  Mail
} from 'lucide-react';

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Search widget state
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCrop, setSearchCrop] = useState('');
  const [searchCapacity, setSearchCapacity] = useState('');

  // Sample warehouse data for working prototype preview
  const featuredWarehouses = warehouseService.getAll().slice(0, 3);
  const activeGroups = groupService.getAll().slice(0, 3);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Modal for "List Your Warehouse"
  const [listModalOpen, setListModalOpen] = useState(false);

  // Interactive Shared Rental demo state
  const [farmerA, setFarmerA] = useState(2);
  const [farmerB, setFarmerB] = useState(3);
  const [farmerC, setFarmerC] = useState(1);
  const totalMonthlyRent = 12000;
  const totalTonnes = Math.max(1, farmerA + farmerB + farmerC);
  const costPerTonne = totalMonthlyRent / totalTonnes;
  const costA = Math.round(farmerA * costPerTonne);
  const costB = Math.round(farmerB * costPerTonne);
  const costC = Math.round(farmerC * costPerTonne);

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
      q: "How does the shared rental concept reduce agricultural storage costs?",
      a: "Commercial warehouses typically mandate booking entire bays (e.g., 50 to 200 MT). Small and marginal farmers rarely have that volume individually. Through Krishi Vault's shared rental concept, neighboring farmers storing the same crop can explore sharing a bay's capacity and splitting the cost proportionally."
    },
    {
      q: "What standards are warehouse listings evaluated against?",
      a: "Warehouse listings on Krishi Vault are structured around national Warehousing Development and Regulatory Authority (WDRA) benchmarks, emphasizing proper ventilation, pest management, electronic weighbridge access, and fire/transit insurance guidelines."
    },
    {
      q: "How does the transparent cost calculator work?",
      a: "Our calculator takes total monthly warehouse rent and divides it by total agreed capacity to determine an exact per-tonne rate. Each farmer pays only for their allocated tonnes with zero hidden vacancy penalties."
    },
    {
      q: "How do warehouse owners benefit from listing their facilities?",
      a: "Warehouse owners often face partial bay vacancies between peak seasons. By presenting their facilities on Krishi Vault, owners can connect with aggregated farmer demand and improve year-round capacity utilization."
    }
  ];

  const galleryImages = [
    {
      src: "/images/hero-farmer.jpg",
      title: "Farmer & Land Stewardship",
      subtitle: "Dedicated Indian farmer cultivating wheat during morning golden hour.",
      tag: "Field Cultivation"
    },
    {
      src: "/images/about-farmers.jpg",
      title: "Clean Harvested Produce",
      subtitle: "Farmer couple inspecting freshly bagged golden wheat at warehouse gate.",
      tag: "Post-Harvest"
    },
    {
      src: "/images/modern-storage.jpg",
      title: "Modern Storage Terminal",
      subtitle: "Organized palletized grain sacks and tractor loading bays in rural terminal.",
      tag: "Infrastructure"
    },
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80",
      title: "Agronomic Crop Health",
      subtitle: "Inspecting crop maturity and grain moisture levels prior to warehouse dispatch.",
      tag: "Quality Check"
    },
    {
      src: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80",
      title: "Mechanized Logistics",
      subtitle: "Tractor and trolley transport connecting rural farm fields with storage hubs.",
      tag: "Logistics"
    },
    {
      src: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80",
      title: "Community Collaboration",
      subtitle: "Farmers meeting together to coordinate crop pooling and storage sharing.",
      tag: "Cooperation"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf7] text-slate-800">
      
      {/* =========================================================================
          1. HERO SECTION — CINEMATIC & PREMIUM
          ========================================================================= */}
      <section
        id="top"
        className="relative min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-between text-white overflow-hidden bg-[#101712]"
      >
        {/* Full-width agricultural background photograph */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('/images/hero-farmer.jpg')` }}
          aria-label="Indian farmer standing in lush green crop field with tractor"
        />

        {/* Cinematic dark black gradient overlay on the left */}
        <div className="absolute inset-0 cinematic-hero-overlay pointer-events-none" />

        {/* Ambient subtle glow effects */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#08B65A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#E8B52C]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Main Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 sm:pt-20 sm:pb-16 relative z-10 w-full flex-grow flex flex-col justify-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6 max-w-3xl">
              
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#123B2A]/90 border border-[#08B65A]/40 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#08B65A] animate-ping" />
                <span className="text-xs sm:text-sm font-bold tracking-wider text-[#DDF7E8] uppercase">
                  SMART STORAGE. STRONGER FARMERS.
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                Your Harvest Deserves{' '}
                <span className="text-[#08B65A] relative inline-block whitespace-nowrap">
                  a Safe Home
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-3 text-[#E8B52C] pointer-events-none"
                    viewBox="0 0 100 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C30 3 70 3 98 8"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[#08B65A]">.</span>
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl">
                Discover affordable warehouse space, connect directly with warehouse owners, and share storage costs with other farmers through one simple platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/warehouses"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#08B65A] hover:bg-[#079d4e] text-white font-extrabold text-base transition-all shadow-xl hover:shadow-[#08B65A]/30 hover:scale-105 active:scale-95"
                >
                  <Warehouse className="w-5 h-5" />
                  <span>Find Warehouse Space</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>

                <button
                  onClick={() => setListModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/25 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                >
                  <Building2 className="w-5 h-5 text-[#E8B52C]" />
                  <span>List Your Warehouse</span>
                </button>
              </div>

              {/* Trust & Value Line */}
              <div className="pt-2 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#DDF7E8]">
                <ShieldCheck className="w-4 h-4 text-[#08B65A] shrink-0" />
                <span>Fair Pricing. Shared Storage. Stronger Agricultural Communities.</span>
              </div>

            </div>

            {/* Right Side: Floating Circular Agricultural Badge */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-center items-center">
              <div className="relative animate-float-gentle">
                
                {/* Glowing backdrop rings */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#08B65A]/30 to-[#E8B52C]/20 blur-xl animate-pulse-glow" />

                {/* Circular Glassmorphism Card */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-6 bg-[#101712]/80 backdrop-blur-xl border-2 border-[#08B65A]/40 shadow-2xl flex flex-col items-center justify-center text-center">
                  
                  {/* Agricultural emblem icon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#123B2A] to-[#08B65A] border border-[#08B65A]/50 flex items-center justify-center shadow-lg mb-3">
                    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                      <path d="M24 6L8 16V40H40V16L24 6Z" stroke="#DDF7E8" strokeWidth="2.5" strokeLinejoin="round" />
                      <path d="M18 40V24H30V40" stroke="#08B65A" strokeWidth="2.5" strokeLinejoin="round" />
                      <circle cx="24" cy="18" r="3" fill="#E8B52C" />
                      <path d="M24 21V27M21 24L27 24" stroke="#E8B52C" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#E8B52C]">
                    Krishi Vault
                  </span>
                  <span className="text-sm font-bold text-white mt-1">
                    Standardized Storage
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1 max-w-[190px]">
                    Empowering farmers with transparent space discovery & shared rental economics.
                  </p>

                  <div className="mt-3 px-3 py-1 rounded-full bg-[#08B65A]/20 border border-[#08B65A]/30 text-[10px] font-bold text-[#DDF7E8]">
                    WDRA Aligned Architecture
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* 4 Small, Elegant Statistic Badges (Honest Descriptive Labels, No Fabricated Numbers) */}
        <div className="relative z-10 border-t border-white/10 bg-[#101712]/90 backdrop-blur-md py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="stat-badge-glass p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#08B65A]/20 text-[#08B65A] flex items-center justify-center shrink-0 border border-[#08B65A]/30">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white">
                    Affordable Shared Storage
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Collaborative bay booking
                  </p>
                </div>
              </div>

              <div className="stat-badge-glass p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#E8B52C]/20 text-[#E8B52C] flex items-center justify-center shrink-0 border border-[#E8B52C]/30">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white">
                    Transparent Cost Sharing
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Proportional per-tonne splits
                  </p>
                </div>
              </div>

              <div className="stat-badge-glass p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#08B65A]/20 text-[#08B65A] flex items-center justify-center shrink-0 border border-[#08B65A]/30">
                  <Warehouse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white">
                    Direct Owner Connections
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Zero intermediary bias
                  </p>
                </div>
              </div>

              <div className="stat-badge-glass p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#DDF7E8]/20 text-[#DDF7E8] flex items-center justify-center shrink-0 border border-[#DDF7E8]/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white">
                    Farmer-Focused Design
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Multilingual accessibility
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          QUICK SEARCH DISCOVERY BAR
          ========================================================================= */}
      <section className="relative z-20 -mt-6 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/90">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            <div className="lg:col-span-4 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#08B65A] focus-within:ring-2 focus-within:ring-[#08B65A]/20 transition-all">
              <MapPin className="w-5 h-5 text-[#08B65A] shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Location / District
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nashik, Ludhiana, Indore..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="lg:col-span-3 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#08B65A] focus-within:ring-2 focus-within:ring-[#08B65A]/20 transition-all">
              <Layers className="w-5 h-5 text-[#08B65A] shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Crop Type
                </label>
                <select
                  value={searchCrop}
                  onChange={(e) => setSearchCrop(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="">All Crops</option>
                  <option value="Wheat">Wheat (गेहूं)</option>
                  <option value="Paddy">Paddy / Rice (धान)</option>
                  <option value="Onion">Onion (प्याज)</option>
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Cotton">Cotton (कपास)</option>
                  <option value="Potato">Potato (आलू)</option>
                  <option value="Maize">Maize (मक्का)</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-3 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-[#08B65A] focus-within:ring-2 focus-within:ring-[#08B65A]/20 transition-all">
              <Scale className="w-5 h-5 text-[#08B65A] shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Capacity Needed
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5 MT"
                  value={searchCapacity}
                  onChange={(e) => setSearchCapacity(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#08B65A] hover:bg-[#079d4e] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </form>
        </div>
      </section>

      {/* =========================================================================
          5. HOW KRISHI VAULT WORKS
          ========================================================================= */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
              Clear 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101712] tracking-tight">
              Smarter Storage. Simpler Decisions.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Krishi Vault helps farmers discover storage options and explore shared warehouse rentals, while helping warehouse owners connect with potential customers.
            </p>
          </div>

          {/* 4 Connected Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#DDF7E8] text-[#123B2A] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Search className="w-7 h-7 text-[#08B65A]" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-[#08B65A] transition-colors">
                    01
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#101712]">
                  Discover Storage
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Farmers explore available warehouse listings and compare relevant information such as WDRA compliance, proximity, crop support, and facilities.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[#08B65A]">
                <span>Browse listings</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#DDF7E8] text-[#123B2A] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Warehouse className="w-7 h-7 text-[#08B65A]" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-[#08B65A] transition-colors">
                    02
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#101712]">
                  Find Your Fit
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Farmers identify a warehouse that suits their storage needs, crop type, location, and budget without forced whole-bay minimum constraints.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[#08B65A]">
                <span>Filter by capacity</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#fef9c3] text-[#713f12] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Scale className="w-7 h-7 text-[#E8B52C]" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-[#E8B52C] transition-colors">
                    03
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#101712]">
                  Share the Cost
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Multiple farmers can explore sharing a warehouse's rental cost according to their agreed storage allocation, dividing commercial rent equitably.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[#ca8a04]">
                <span>Proportional splits</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#DDF7E8] text-[#123B2A] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Handshake className="w-7 h-7 text-[#08B65A]" />
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-[#08B65A] transition-colors">
                    04
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#101712]">
                  Connect & Coordinate
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Farmers and warehouse owners can coordinate rental arrangements through the intended platform workflow with transparency for all parties.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center text-xs font-bold text-[#08B65A]">
                <span>Direct coordination</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          <div className="text-center pt-4">
            <a
              href="#rental-example"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#123B2A] hover:bg-[#101712] text-white font-extrabold text-sm transition-all shadow-md hover:scale-105"
            >
              <span>Explore How It Works</span>
              <ArrowRight className="w-4 h-4 text-[#08B65A]" />
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. KEY FEATURES SECTION
          ========================================================================= */}
      <section id="features" className="py-20 lg:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#08B65A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
              Core Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101712] tracking-tight">
              Everything Starts With Better Storage.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Engineered to eliminate storage fragmentation, protect harvest value, and make modern agricultural warehousing accessible to all farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-[#fafaf7] border border-slate-200/80 hover:border-[#08B65A]/40 transition-all duration-300 hover:shadow-card group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] text-[#08B65A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Interactive Prototype
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#101712] mb-2">
                Warehouse Discovery
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore storage options in one convenient interface, with location filters, capacity meters, and crop compatibility profiles.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-[#fafaf7] border border-slate-200/80 hover:border-[#08B65A]/40 transition-all duration-300 hover:shadow-card group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] text-[#08B65A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Interactive Prototype
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#101712] mb-2">
                Shared Rental Concept
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Help multiple farmers explore ways to share warehouse rental costs, making large commercial bays accessible for small volumes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-[#fafaf7] border border-slate-200/80 hover:border-[#E8B52C]/40 transition-all duration-300 hover:shadow-card group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#fef9c3] text-[#ca8a04] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Interactive Prototype
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#101712] mb-2">
                Transparent Cost Calculator
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Estimate individual rental contributions based on agreed capacity allocations, with itemized per-tonne cost clarity.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-[#fafaf7] border border-slate-200/80 hover:border-[#08B65A]/40 transition-all duration-300 hover:shadow-card group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] text-[#08B65A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Interactive Prototype
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#101712] mb-2">
                Warehouse Owner Listings
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Give warehouse owners a way to present their storage facilities, fill vacant bay capacity, and connect with local farmer demand.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-[#fafaf7] border border-slate-200/80 hover:border-[#08B65A]/40 transition-all duration-300 hover:shadow-card group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] text-[#08B65A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  Core Architecture
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#101712] mb-2">
                Farmer-Friendly Experience
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Design an intuitive interface that is accessible to users with different levels of digital experience, featuring clear typography and high-contrast cues.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-[#fafaf7] border border-slate-200/80 hover:border-[#08B65A]/40 transition-all duration-300 hover:shadow-card group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] text-[#08B65A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  22 Languages Prototype
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#101712] mb-2">
                Multilingual Vision
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Support a more accessible agricultural platform through regional-language functionality across the 22 scheduled languages of India as implementation permits.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          9. SHARED RENTAL EXAMPLE SECTION
          ========================================================================= */}
      <section id="rental-example" className="py-20 lg:py-28 bg-[#123B2A] text-white relative overflow-hidden">
        
        {/* Decorative backdrop patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DDF7E8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#08B65A]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full">
              Transparent Shared Economics
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              A Smarter Way to Think About Storage Costs.
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              See how collaborative capacity sharing divides warehouse rent fairly among farmers storing the same crop.
            </p>
          </div>

          {/* Interactive Calculation Showcase Card */}
          <div className="bg-[#101712]/90 rounded-3xl p-6 sm:p-10 border border-white/15 backdrop-blur-xl shadow-2xl space-y-8">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-white/10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-bold text-slate-400">Total Monthly Bay Rent</span>
                <p className="text-3xl sm:text-4xl font-black text-[#E8B52C] mt-1">
                  ₹{totalMonthlyRent.toLocaleString()}
                </p>
                <span className="text-[11px] text-slate-300">Commercial 6-tonne bay capacity</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-bold text-slate-400">Total Allocated Capacity</span>
                <p className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {totalTonnes} Tonnes
                </p>
                <span className="text-[11px] text-[#DDF7E8]">Shared across 3 participating farmers</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs uppercase font-bold text-slate-400">Illustrative Rate per Tonne</span>
                <p className="text-3xl sm:text-4xl font-black text-[#08B65A] mt-1">
                  ₹{Math.round(costPerTonne).toLocaleString()}<span className="text-sm font-medium text-slate-300">/t/mo</span>
                </p>
                <span className="text-[11px] text-slate-300">Equal rate per unit of storage</span>
              </div>
            </div>

            {/* Visual Proportional Capacity Stack Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Capacity Allocation Distribution</span>
                <span>100% of Bay Allocated</span>
              </div>
              <div className="h-5 w-full bg-black/40 rounded-full overflow-hidden flex p-1 border border-white/10">
                <div
                  style={{ width: `${(farmerA / totalTonnes) * 100}%` }}
                  className="bg-[#08B65A] h-full rounded-l-full transition-all duration-300"
                  title={`Farmer A: ${farmerA} tonnes`}
                />
                <div
                  style={{ width: `${(farmerB / totalTonnes) * 100}%` }}
                  className="bg-[#E8B52C] h-full transition-all duration-300"
                  title={`Farmer B: ${farmerB} tonnes`}
                />
                <div
                  style={{ width: `${(farmerC / totalTonnes) * 100}%` }}
                  className="bg-[#38bdf8] h-full rounded-r-full transition-all duration-300"
                  title={`Farmer C: ${farmerC} tonnes`}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#08B65A]" />
                  Farmer A ({farmerA} tonnes — {((farmerA / totalTonnes) * 100).toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8B52C]" />
                  Farmer B ({farmerB} tonnes — {((farmerB / totalTonnes) * 100).toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                  Farmer C ({farmerC} tonnes — {((farmerC / totalTonnes) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* 3 Contribution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Farmer A Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-[#08B65A]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#08B65A]/20 text-[#08B65A] font-black text-sm flex items-center justify-center border border-[#08B65A]/40">
                    FA
                  </div>
                  <span className="text-xs font-bold text-[#08B65A] bg-[#08B65A]/15 px-2.5 py-1 rounded-full">
                    {((farmerA / totalTonnes) * 100).toFixed(1)}% Share
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Farmer A</h4>
                  <p className="text-xs text-slate-400">Crop: Wheat (गेहूं)</p>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Allocated Capacity</span>
                    <span className="text-base font-extrabold text-white">{farmerA} tonnes</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Monthly Contribution</span>
                    <span className="text-xl font-black text-[#08B65A]">₹{costA.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Farmer B Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-[#E8B52C]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#E8B52C]/20 text-[#E8B52C] font-black text-sm flex items-center justify-center border border-[#E8B52C]/40">
                    FB
                  </div>
                  <span className="text-xs font-bold text-[#E8B52C] bg-[#E8B52C]/15 px-2.5 py-1 rounded-full">
                    {((farmerB / totalTonnes) * 100).toFixed(1)}% Share
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Farmer B</h4>
                  <p className="text-xs text-slate-400">Crop: Wheat (गेहूं)</p>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Allocated Capacity</span>
                    <span className="text-base font-extrabold text-white">{farmerB} tonnes</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Monthly Contribution</span>
                    <span className="text-xl font-black text-[#E8B52C]">₹{costB.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Farmer C Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-sky-400/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 font-black text-sm flex items-center justify-center border border-sky-400/40">
                    FC
                  </div>
                  <span className="text-xs font-bold text-sky-400 bg-sky-500/15 px-2.5 py-1 rounded-full">
                    {((farmerC / totalTonnes) * 100).toFixed(1)}% Share
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Farmer C</h4>
                  <p className="text-xs text-slate-400">Crop: Wheat (गेहूं)</p>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Allocated Capacity</span>
                    <span className="text-base font-extrabold text-white">{farmerC} tonne</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Monthly Contribution</span>
                    <span className="text-xl font-black text-sky-400">₹{costC.toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Explanatory Note Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3.5">
              <Info className="w-5 h-5 text-[#E8B52C] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Illustrative Calculation Note:</strong> These values are illustrative and assume equal rental cost per tonne of allocated capacity. Actual terms may vary according to warehouse conditions, handling charges, crop requirements, and agreements between participants. This does not represent a real completed rental transaction.
              </p>
            </div>

            {/* CTA to full calculator */}
            <div className="text-center pt-2">
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#08B65A] hover:bg-[#079d4e] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105"
              >
                <Calculator className="w-4 h-4" />
                <span>Open Custom Savings Calculator</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. AGRICULTURAL IMAGE GALLERY
          ========================================================================= */}
      <section id="gallery" className="py-20 lg:py-28 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
              Indian Agricultural Landscape
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101712] tracking-tight">
              Cinematic Agricultural Reality
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              High-quality glimpses of Indian farmers, fertile crop fields, grain preservation, and modern storage facilities.
            </p>
          </div>

          {/* 6-Item Responsive Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col"
              >
                {/* Image Container with Restrained Hover Zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101712]/90 via-[#101712]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Tag Pill */}
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#101712]/80 text-[#DDF7E8] border border-white/20 backdrop-blur-md">
                    {img.tag}
                  </span>
                </div>

                {/* Caption Card */}
                <div className="p-6 bg-white flex-grow flex flex-col justify-between space-y-2 border-t border-slate-100">
                  <h3 className="text-base font-extrabold text-[#101712] group-hover:text-[#08B65A] transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {img.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. ABOUT US SECTION — TELL OUR STORY
          ========================================================================= */}
      <section id="about" className="py-20 lg:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Beautiful Agricultural Photograph */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src="/images/about-farmers.jpg"
                  alt="Indian farmers holding clean harvested golden wheat grain"
                  className="w-full h-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101712]/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#101712]/85 backdrop-blur-md border border-white/20 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E8B52C]" />
                    <span className="text-xs font-bold text-[#DDF7E8] uppercase tracking-wider">
                      Empowering Rural Bharat
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Transforming isolated warehouse bays into cooperative community storage networks.
                  </p>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#08B65A]/15 rounded-3xl -z-10 blur-xl" />
            </div>

            {/* Right Column: Story, Mission, Vision, Core Values */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#08B65A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
                  Our Purpose & Vision
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101712] tracking-tight leading-tight">
                  Built Around the People Who Feed Us.
                </h2>
              </div>

              {/* About Krishi Vault Story */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Krishi Vault is an AgriTech project built around a simple idea: access to storage should be easier to explore and more flexible for farmers. By connecting farmers with warehouse owners and introducing a shared-rental concept, Krishi Vault aims to make agricultural storage more accessible, improve transparency in rental decisions, and help warehouse owners connect with a wider range of potential customers.
              </p>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-5 rounded-2xl bg-[#fafaf7] border border-slate-200/80 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#DDF7E8] text-[#08B65A] flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-extrabold text-[#101712]">Our Mission</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To make agricultural storage easier to discover, more transparent to evaluate, and more accessible through technology.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#fafaf7] border border-slate-200/80 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-[#fef9c3] text-[#ca8a04] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-extrabold text-[#101712]">Our Vision</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To build a connected agricultural storage ecosystem where farmers and warehouse owners can find better opportunities through collaboration.
                  </p>
                </div>

              </div>

              {/* Core Values */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Our Core Values
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Farmer First', 'Transparency', 'Affordability', 'Collaboration', 'Practical Innovation'].map((val, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#123B2A] text-white text-xs font-bold"
                    >
                      <Check className="w-3.5 h-3.5 text-[#08B65A]" />
                      <span>{val}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Button to Team */}
              <div className="pt-2">
                <a
                  href="#team"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#08B65A] hover:bg-[#079d4e] text-white font-extrabold text-sm transition-all shadow-md hover:scale-105"
                >
                  <Users className="w-4 h-4" />
                  <span>Meet Our Team</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          8. OUR TEAM SECTION — PROFESSIONAL TEAM PROFILES
          ========================================================================= */}
      <section id="team" className="py-20 lg:py-28 bg-[#fafaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
              Team Krishi Vault
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101712] tracking-tight">
              The Minds Behind Krishi Vault.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              A student team combining technology, research, design, and creative thinking to explore smarter agricultural storage.
            </p>
            
            {/* Academic Affiliation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-xs text-slate-700">
              <GraduationCap className="w-4 h-4 text-[#08B65A]" />
              <span className="font-semibold">
                Department of Computer Science and Engineering — Government College of Engineering, Chhatrapati Sambhajinagar
              </span>
            </div>
          </div>

          {/* Exactly 4 Individual Team Cards in Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Team Member 1 — Nandan Jadhav */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-5">
                
                {/* Initials Avatar Placeholder with Green Accents */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#123B2A] to-[#08B65A] text-white font-extrabold text-xl flex items-center justify-center border-2 border-[#08B65A]/40 shadow-md group-hover:scale-105 transition-transform shrink-0">
                    NJ
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#101712] leading-tight">
                      Nandan Jadhav
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-bold text-[#08B65A] bg-[#DDF7E8] px-2 py-0.5 rounded-md">
                      Technical Lead / Frontend
                    </span>
                  </div>
                </div>

                {/* Role Description & Bullet Points */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Core Contribution
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Leads the frontend development of the Krishi Vault prototype.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Works on React components, application structure, and user-interface functionality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Helps implement warehouse discovery and shared-rental calculation workflows.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Contributes to debugging, integration, and technical improvements.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Skills/Tags */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap gap-1.5 mt-5">
                {['React 19', 'Vite', 'Frontend Architecture', 'UI State'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Member 2 — Divyansh Singh */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-5">
                
                {/* Initials Avatar Placeholder */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#123B2A] to-[#08B65A] text-white font-extrabold text-xl flex items-center justify-center border-2 border-[#08B65A]/40 shadow-md group-hover:scale-105 transition-transform shrink-0">
                    DS
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#101712] leading-tight">
                      Divyansh Singh
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-bold text-[#08B65A] bg-[#DDF7E8] px-2 py-0.5 rounded-md">
                      UI/UX Design & Presentation
                    </span>
                  </div>
                </div>

                {/* Role Description & Bullet Points */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Core Contribution
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Contributes to the visual identity and user experience of Krishi Vault.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Helps organize page layouts, visual hierarchy, and interface consistency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Works on presentation design and communicating the project concept clearly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Supports the creation of engaging and understandable user journeys.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Skills/Tags */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap gap-1.5 mt-5">
                {['UI/UX Design', 'Visual Hierarchy', 'User Journeys', 'Design Systems'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Member 3 — Ishmeet Kaur */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-5">
                
                {/* Initials Avatar Placeholder */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ca8a04] to-[#E8B52C] text-slate-950 font-extrabold text-xl flex items-center justify-center border-2 border-[#E8B52C]/40 shadow-md group-hover:scale-105 transition-transform shrink-0">
                    IK
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#101712] leading-tight">
                      Ishmeet Kaur
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-bold text-[#ca8a04] bg-[#fef9c3] px-2 py-0.5 rounded-md">
                      Business Research & Market
                    </span>
                  </div>
                </div>

                {/* Role Description & Bullet Points */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Core Contribution
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B52C] mt-1.5 shrink-0" />
                      <span>Contributes to agricultural market research and problem validation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B52C] mt-1.5 shrink-0" />
                      <span>Helps analyze farmer needs and warehouse-owner challenges.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B52C] mt-1.5 shrink-0" />
                      <span>Supports business-model development and market-opportunity analysis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B52C] mt-1.5 shrink-0" />
                      <span>Helps structure the value proposition and potential customer segments.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Skills/Tags */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap gap-1.5 mt-5">
                {['AgriTech Research', 'Market Analysis', 'Problem Discovery', 'Value Prop'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Member 4 — Vaishnavi Pachpatte */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-5">
                
                {/* Initials Avatar Placeholder */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#123B2A] to-[#08B65A] text-white font-extrabold text-xl flex items-center justify-center border-2 border-[#08B65A]/40 shadow-md group-hover:scale-105 transition-transform shrink-0">
                    VP
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#101712] leading-tight">
                      Vaishnavi Pachpatte
                    </h3>
                    <span className="inline-block mt-1 text-[11px] font-bold text-[#08B65A] bg-[#DDF7E8] px-2 py-0.5 rounded-md">
                      Creative Strategy & Content
                    </span>
                  </div>
                </div>

                {/* Role Description & Bullet Points */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Core Contribution
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Contributes creative ideas for presenting the Krishi Vault concept.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Supports content development and storytelling.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Helps communicate the project's mission, benefits, and intended impact.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                      <span>Contributes to creative direction and presentation refinement.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Skills/Tags */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap gap-1.5 mt-5">
                {['Storytelling', 'Creative Strategy', 'Content Design', 'Agri Messaging'].map((tag, i) => (
                  <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Academic Transparency Note */}
          <div className="text-center">
            <p className="text-xs text-slate-400">
              * Team roles and contributions reflect our academic project plan for national ideathon showcase.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          WORKING PROTOTYPE: FEATURED WAREHOUSES
          ========================================================================= */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#08B65A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full">
                Live Prototype Inventory
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101712] tracking-tight">
                Explore Available Warehouses
              </h2>
              <p className="text-sm text-slate-600">
                Browse real working warehouse profiles with active bay capacities and scientific storage specifications.
              </p>
            </div>

            <Link
              to="/warehouses"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#08B65A] hover:text-[#079d4e] transition-colors"
            >
              <span>View All Warehouses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWarehouses.map((warehouse) => (
              <WarehouseCard key={warehouse.id} warehouse={warehouse} />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION SECTION
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#fafaf7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
              Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101712]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Everything you need to know about Krishi Vault's shared rental model and platform vision.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#08B65A] shrink-0 transition-transform duration-200 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          10. CALL-TO-ACTION SECTION
          ========================================================================= */}
      <section id="cta" className="py-20 lg:py-28 bg-[#101712] text-white relative overflow-hidden">
        
        {/* Background agricultural texture */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 pointer-events-none"
          style={{ backgroundImage: `url('/images/hero-farmer.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101712] via-[#101712]/90 to-[#123B2A]/90 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#123B2A] border border-[#08B65A]/40 text-xs font-bold uppercase tracking-wider text-[#DDF7E8]">
            <Sparkles className="w-4 h-4 text-[#E8B52C]" />
            <span>Join the Agricultural Movement</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Let’s Make Better Storage Possible.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you are a farmer looking for storage or a warehouse owner with space to offer, Krishi Vault is designed to bring both sides closer together.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/warehouses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#08B65A] hover:bg-[#079d4e] text-white font-extrabold text-base transition-all shadow-xl hover:shadow-[#08B65A]/30 hover:scale-105 active:scale-95"
            >
              <Warehouse className="w-5 h-5" />
              <span>Find Storage</span>
            </Link>

            <button
              onClick={() => setListModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/25 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              <Building2 className="w-5 h-5 text-[#E8B52C]" />
              <span>List Your Warehouse</span>
            </button>
          </div>

          <div className="pt-6 text-xs text-slate-400">
            Fair Pricing • Shared Storage • Stronger Agricultural Communities
          </div>

        </div>
      </section>

      {/* =========================================================================
          11. CONTACT SECTION
          ========================================================================= */}
      <section id="contact" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101712]">
              Connect With Krishi Vault
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Assistance for farmers, warehouse operators, and academic evaluators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-[#fafaf7] border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#08B65A]/20 text-[#08B65A] flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#101712]">National Kisan Helpline</h3>
              <p className="text-2xl font-black text-[#08B65A]">1800-180-1551</p>
              <p className="text-xs text-slate-500">Official Toll-Free • 6:00 AM – 10:00 PM (All 7 Days)</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fafaf7] border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8B52C]/20 text-[#ca8a04] flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#101712]">Academic Institution</h3>
              <p className="text-sm font-semibold text-slate-800">Department of Computer Science & Engineering</p>
              <p className="text-xs text-slate-500">Government College of Engineering, Chhatrapati Sambhajinagar</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fafaf7] border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] text-[#123B2A] flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#08B65A]" />
              </div>
              <h3 className="text-base font-bold text-[#101712]">Digital Coordination</h3>
              <p className="text-sm font-semibold text-slate-800">contact@krishivault.prototype.in</p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#08B65A] hover:underline"
                >
                  <span>Open Contact Message Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          LIST YOUR WAREHOUSE INQUIRY MODAL (DEMO WORKFLOW)
          ========================================================================= */}
      {listModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DDF7E8] text-[#08B65A] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">List Your Warehouse</h3>
                  <p className="text-xs text-slate-500">Warehouse Operator Demonstration Flow</p>
                </div>
              </div>
              <button
                onClick={() => setListModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Krishi Vault allows warehouse owners to list available storage bays, specify supported grain or cold storage varieties, and receive aggregated bookings from nearby farmers.
            </p>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="font-bold text-slate-800">Choose how you'd like to test this:</div>
              <div className="space-y-2">
                <Link
                  to="/owner-dashboard"
                  onClick={() => setListModalOpen(false)}
                  className="block w-full py-2.5 px-3 rounded-xl bg-[#08B65A] hover:bg-[#079d4e] text-white text-center font-bold"
                >
                  Open Warehouse Owner Portal Demo
                </Link>
                <Link
                  to="/register?role=owner"
                  onClick={() => setListModalOpen(false)}
                  className="block w-full py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-center font-bold"
                >
                  Register as Warehouse Owner
                </Link>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => setListModalOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
