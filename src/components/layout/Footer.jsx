import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  ShieldCheck,
  MapPin,
  Mail,
  Heart,
  ExternalLink,
  Award,
  Sparkles,
  Warehouse,
  Users,
  Calculator,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#101712] text-slate-300 border-t border-white/10">
      {/* Top Value Banner */}
      <div className="bg-[#123B2A] border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#08B65A]/20 text-[#08B65A] flex items-center justify-center shrink-0 border border-[#08B65A]/30">
              <PhoneCall className="w-5 h-5 text-[#08B65A]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#DDF7E8] font-bold">
                National Kisan Call Center (Official Toll-Free)
              </p>
              <p className="text-base font-extrabold text-white">
                1800-180-1551 <span className="text-xs font-normal text-slate-300 ml-2">(6:00 AM – 10:00 PM All 7 Days)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-xl border border-white/10">
            <Award className="w-5 h-5 text-[#E8B52C] shrink-0" />
            <p className="text-xs text-slate-200">
              Inspired by <span className="text-[#DDF7E8] font-semibold">WDRA</span> (Warehousing Development and Regulatory Authority) Standards
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#123B2A] to-[#08B65A] p-2 border border-[#08B65A]/40 flex items-center justify-center">
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                  <path d="M24 6L8 16V40H40V16L24 6Z" stroke="#DDF7E8" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M18 40V24H30V40" stroke="#08B65A" strokeWidth="3" strokeLinejoin="round" />
                  <circle cx="24" cy="18" r="3" fill="#E8B52C" />
                  <path d="M24 21V27M21 24L27 24" stroke="#E8B52C" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Krishi Vault
                </span>
                <p className="text-xs text-[#08B65A] font-semibold">
                  Your Harvest Deserves a Safe Home.
                </p>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Krishi Vault is an AgriTech project built around a simple idea: access to storage should be easier to explore and more flexible for farmers. By connecting farmers with warehouse owners and introducing a shared-rental concept, Krishi Vault aims to make agricultural storage more accessible.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#08B65A] shrink-0 mt-0.5" />
                <span>
                  Department of Computer Science and Engineering<br />
                  Government College of Engineering, Chhatrapati Sambhajinagar
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#08B65A] shrink-0" />
                <span>contact@krishivault.prototype.in (Project Contact)</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#08B65A] pl-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/warehouses" className="text-slate-400 hover:text-white transition-colors">
                  Explore Warehouses
                </Link>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="text-slate-400 hover:text-white transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E8B52C] pl-2">
              Prototype Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/warehouses" className="text-slate-400 hover:text-white transition-colors">
                  Warehouse Discovery
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Shared Rental Groups</span>
                  <span className="text-[9px] bg-[#08B65A]/20 text-[#DDF7E8] px-1 rounded">Co-Op</span>
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-slate-400 hover:text-white transition-colors">
                  Cost Sharing Calculator
                </Link>
              </li>
              <li>
                <Link to="/farmer-dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Farmer Portal Demo
                </Link>
              </li>
              <li>
                <Link to="/owner-dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Warehouse Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Project Context */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#08B65A] pl-2">
              Project Initiative
            </h4>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <p>
                <strong className="text-white block mb-0.5">Team Krishi Vault</strong>
                A student engineering project combining technology, research, design, and creative thinking.
              </p>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px]">
                <p className="font-semibold text-[#DDF7E8]">Fair Pricing. Shared Storage.</p>
                <p className="text-slate-300 mt-1">Stronger Agricultural Communities.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Krishi Vault. All rights reserved. Academic Prototype.</p>
          <p className="text-[11px] text-slate-400">
            Government College of Engineering, Chhatrapati Sambhajinagar
          </p>
        </div>
      </div>
    </footer>
  );
};
