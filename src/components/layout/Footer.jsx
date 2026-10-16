import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  PhoneCall,
  ShieldCheck,
  MapPin,
  Mail,
  Heart,
  ExternalLink,
  Award
} from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-soil-950 text-slate-300 border-t border-soil-800">
      {/* Top Value Banner */}
      <div className="bg-krishi-900 border-b border-krishi-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-harvest-500/20 text-harvest-400 flex items-center justify-center shrink-0 border border-harvest-400/30">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-krishi-200 font-bold">
                National Kisan Call Center (Toll-Free)
              </p>
              <p className="text-base font-extrabold text-white">
                1800-180-1551 <span className="text-xs font-normal text-krishi-300 ml-2">(6:00 AM – 10:00 PM All 7 Days)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-krishi-800/80 px-4 py-2 rounded-xl border border-krishi-700/50">
            <Award className="w-5 h-5 text-harvest-400 shrink-0" />
            <p className="text-xs text-slate-200">
              Warehousing Development and Regulatory Authority (<span className="text-harvest-300 font-semibold">WDRA</span>) Standardized Prototypes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-krishi-600 to-krishi-800 p-2 border border-harvest-400/40 flex items-center justify-center">
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                  <path d="M24 6L8 16V40H40V16L24 6Z" stroke="#fef08a" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M18 40V24H30V40" stroke="#4ade80" strokeWidth="3" strokeLinejoin="round" />
                  <circle cx="24" cy="18" r="3" fill="#facc15" />
                  <path d="M24 21V27M21 24L27 24" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Krishi Vault
                </span>
                <p className="text-xs text-harvest-400 font-medium">
                  Smart Storage. Stronger Farmers.
                </p>
              </div>
            </Link>

            <div className="space-y-1">
              <p className="text-sm font-medium text-emerald-300">
                "बेहतर भंडारण, सशक्त किसान।"
              </p>
              <p className="text-sm font-medium text-harvest-300">
                "स्मार्ट साठवणूक, सक्षम शेतकरी."
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Krishi Vault is a next-generation cooperative agritech platform bringing equitable, transparent, and shared storage to farmers across India. Cut post-harvest losses and store with dignity.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-krishi-400" />
                <span>Agricultural Technology Innovation Lab, Maharashtra / Punjab</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-krishi-400" />
                <span>support@krishivault.prototype.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-harvest-400 pl-2">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/warehouses" className="text-slate-400 hover:text-white transition-colors">
                  Find Warehouses
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Group Booking Marketplace</span>
                  <span className="text-[9px] bg-harvest-500/20 text-harvest-300 px-1 rounded">Co-Op</span>
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-slate-400 hover:text-white transition-colors">
                  Rent & Savings Calculator
                </Link>
              </li>
              <li>
                <Link to="/farmer-dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Farmer Portal
                </Link>
              </li>
              <li>
                <Link to="/owner-dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Warehouse Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Crop Solutions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-krishi-400 pl-2">
              Storage Types
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Scientific Onion Chawls (Lasalgaon)</li>
              <li>Steel Grain Silos (Khanna / Ludhiana)</li>
              <li>Multi-Chamber Cold Stores (Malwa / Indore)</li>
              <li>Pre-Engineered Dry Godowns (Rajkot)</li>
              <li>Export Chilli Chambers (Guntur)</li>
              <li>Potato Cold Storage (Agra)</li>
            </ul>
          </div>

          {/* Legal & Project Meta */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-harvest-400 pl-2">
              Information & Demo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Krishi Vault
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-400 hover:text-white transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link to="/help#languages" className="text-slate-400 hover:text-white transition-colors">
                  22 Scheduled Languages
                </Link>
              </li>
              <li>
                <span className="inline-block mt-2 px-2.5 py-1 rounded bg-krishi-900/90 text-krishi-300 border border-krishi-800 text-[10px] font-semibold">
                  WDRA Standard Formats
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Academic Project Disclaimer & Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-soil-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Krishi Vault. College Mini-Project Demonstration Prototype.
            All simulated listings, bookings, and payments are local frontend mockups.
          </p>

          <p className="flex items-center gap-1.5 text-slate-400 text-center">
            Dedicated to the prosperity of Indian Kisans
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
