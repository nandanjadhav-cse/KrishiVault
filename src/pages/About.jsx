import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  TrendingDown,
  Users,
  Award,
  Heart,
  Target,
  Sparkles,
  ArrowRight,
  Warehouse,
  CheckCircle2
} from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-krishi-700 bg-krishi-100 px-3 py-1 rounded-full border border-krishi-200">
            About Krishi Vault
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Democratizing Agricultural Warehousing for India's Smallholder Farmers
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Krishi Vault connects Indian farmers with modern, certified warehouses and introduces cooperative group booking so small farmers can pool capacity and slash storage rents by up to 45%.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-krishi-100 text-krishi-800 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To eliminate post-harvest distress sales across rural India by transforming isolated, expensive commercial warehouses into open, collaborative storage networks accessible to even 2-tonne farmers.
            </p>
            <div className="pt-2 text-xs font-medium text-emerald-800 italic">
              "बेहतर भंडारण, सशक्त किसान।"
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-harvest-100 text-harvest-800 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A transparent, pan-India agritech warehousing ecosystem where no crop rots on field borders, every storage receipt serves as collateral for zero-hassle pledge credit, and cooperative logistics empower every kisan family.
            </p>
            <div className="pt-2 text-xs font-medium text-harvest-800 italic">
              "स्मार्ट साठवणूक, सक्षम शेतकरी."
            </div>
          </div>

        </div>

        {/* The Indian Agricultural Storage Challenge */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-card space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 border-l-4 border-krishi-600 pl-4">
            The Problem We Are Solving
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
              <p className="text-2xl font-black text-red-600">₹92,000 Cr</p>
              <h4 className="font-bold text-slate-800">Annual Post-Harvest Loss</h4>
              <p>Over 16% of fruits & vegetables and 8% of foodgrains spoil in India each season due to inadequate local storage.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
              <p className="text-2xl font-black text-amber-600">86%</p>
              <h4 className="font-bold text-slate-800">Small & Marginal Kisans</h4>
              <p>Most farmers produce less than 30 tonnes per crop, while commercial warehouses set prohibitive 100 MT minimums.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
              <p className="text-2xl font-black text-krishi-700">45%</p>
              <h4 className="font-bold text-slate-800">Cooperative Cost Savings</h4>
              <p>Krishi Vault group bookings eliminate vacancy penalties and give small farmers wholesale commercial bay rates.</p>
            </div>
          </div>
        </div>

        {/* WDRA Standards & Regulatory Alignment */}
        <div className="bg-gradient-to-r from-krishi-900 to-soil-950 text-white rounded-3xl p-8 sm:p-10 shadow-premium flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-harvest-400" />
              <span className="text-xs uppercase font-bold tracking-wider text-harvest-300">
                WDRA Regulatory Compliance
              </span>
            </div>
            <h3 className="text-2xl font-extrabold">
              Aligned with National Warehousing Standards
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All warehouse listings follow the Warehousing Development and Regulatory Authority (WDRA) guidelines for scientific pest control, electronic weighbridge standards, and digital Negotiable Warehouse Receipt (e-NWR) issuance.
            </p>
          </div>

          <Link
            to="/warehouses"
            className="px-6 py-3 rounded-2xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-bold text-xs shrink-0 shadow-md transition-all hover:scale-105"
          >
            Browse WDRA Warehouses
          </Link>
        </div>

        {/* Project Meta Note */}
        <div className="p-6 rounded-2xl bg-slate-100 text-center text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-700">
            College Mini-Project Demonstration Prototype
          </p>
          <p>
            Developed as an academic agritech software architecture prototype showcasing React, localized internationalization across all 22 scheduled languages of India, and cooperative economic sharing mechanisms.
          </p>
        </div>

      </div>
    </div>
  );
};
