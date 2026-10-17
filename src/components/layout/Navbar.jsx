import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from '../common/LanguageSelector';
import {
  Warehouse,
  Users,
  Calculator,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { currentUser, logout, unreadCount, demoLogin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sticky navbar shadow and background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section smooth scrolling
  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const navLinkClass =
    "px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5";

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#101712]/95 backdrop-blur-md shadow-xl border-b border-white/10 py-2'
          : 'bg-[#101712] border-b border-white/10 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#123B2A] to-[#08B65A] p-2 border border-[#08B65A]/40 shadow-card flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path d="M24 6L8 16V40H40V16L24 6Z" stroke="#DDF7E8" strokeWidth="3" strokeLinejoin="round" />
                <path d="M18 40V24H30V40" stroke="#08B65A" strokeWidth="3" strokeLinejoin="round" />
                <circle cx="24" cy="18" r="3" fill="#E8B52C" />
                <path d="M24 21V27M21 24L27 24" stroke="#E8B52C" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 leading-none">
                Krishi Vault
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#08B65A]/20 text-[#DDF7E8] border border-[#08B65A]/30">
                  AgriTech
                </span>
              </span>
              <span className="text-[11px] text-slate-300 font-medium mt-0.5 hidden xs:block">
                {t('brand.tagline', 'Your Harvest Deserves a Safe Home.')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive && location.hash === ''
                    ? 'text-[#08B65A] bg-white/5 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {t('nav.home', 'Home')}
            </NavLink>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className={navLinkClass}
            >
              {t('howItWorks.title', 'How It Works')}
            </button>

            <NavLink
              to="/warehouses"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-[#08B65A] bg-white/5 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {t('nav.warehouses', 'Explore Warehouses')}
            </NavLink>

            <button
              onClick={() => scrollToSection('about')}
              className={navLinkClass}
            >
              {t('nav.about', 'About Us')}
            </button>

            <button
              onClick={() => scrollToSection('team')}
              className={navLinkClass}
            >
              {t('nav.team', 'Our Team')}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={navLinkClass}
            >
              {t('nav.contact', 'Contact')}
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector (22 Languages of India) */}
            <LanguageSelector variant="header" />

            {/* Notifications Center Bell */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-[#101712] animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Prominent Green CTA: Get Started */}
            <Link
              to="/warehouses"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#08B65A] hover:bg-[#079d4e] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-[#08B65A]/25 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{t('hero.primaryCta', 'Get Started')}</span>
            </Link>

            {/* User Profile Dropdown or Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  aria-expanded={profileDropdownOpen}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#08B65A]"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-premium border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#DDF7E8] text-[#123B2A]">
                        {currentUser.role === 'owner' ? t('auth.ownerRole', 'Warehouse Operator') : t('auth.farmerRole', 'Kisan Member')}
                      </span>
                    </div>

                    <Link
                      to={currentUser.role === 'owner' ? '/owner-dashboard' : '/farmer-dashboard'}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-krishi-50 hover:text-krishi-900 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#08B65A]" />
                      {currentUser.role === 'owner' ? t('nav.ownerDashboard', 'Owner Portal') : t('nav.farmerDashboard', 'Farmer Portal')}
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-krishi-50 hover:text-krishi-900 font-medium"
                    >
                      <User className="w-4 h-4 text-[#08B65A]" />
                      {t('nav.profile', 'My Profile')}
                    </Link>

                    <div className="my-1 border-t border-slate-100"></div>

                    <div className="px-3 py-1">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase px-1 mb-1">
                        Switch Demo Role
                      </p>
                      <button
                        onClick={() => {
                          demoLogin(currentUser.role === 'farmer' ? 'owner' : 'farmer');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700"
                      >
                        <span>Switch to {currentUser.role === 'farmer' ? 'Owner' : 'Farmer'}</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#E8B52C]" />
                      </button>
                    </div>

                    <div className="my-1 border-t border-slate-100"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout', 'Log Out')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {t('nav.login', 'Login')}
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#E8B52C] hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
                >
                  {t('nav.register', 'Register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector variant="header" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101712] border-t border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-semibold text-white hover:bg-white/10"
          >
            {t('nav.home', 'Home')}
          </Link>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-white/10"
          >
            {t('howItWorks.title', 'How It Works')}
          </button>
          <NavLink
            to="/warehouses"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-white/10"
          >
            <Warehouse className="w-5 h-5 text-[#08B65A]" />
            {t('nav.warehouses', 'Explore Warehouses')}
          </NavLink>
          <button
            onClick={() => scrollToSection('about')}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-white/10"
          >
            {t('nav.about', 'About Us')}
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-white/10"
          >
            {t('nav.team', 'Our Team')}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-white/10"
          >
            {t('nav.contact', 'Contact')}
          </button>

          <div className="pt-2 pb-1 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
            <Link
              to="/marketplace"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10"
            >
              <Users className="w-4 h-4 text-[#E8B52C]" />
              <span>{t('nav.marketplace', 'Group Booking')}</span>
            </Link>
            <Link
              to="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10"
            >
              <Calculator className="w-4 h-4 text-[#08B65A]" />
              <span>{t('nav.calculator', 'Calculator')}</span>
            </Link>
          </div>

          <div className="pt-2">
            <Link
              to="/warehouses"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#08B65A] hover:bg-[#079d4e] text-white font-bold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('hero.primaryCta', 'Get Started')}</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-white/10">
            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-950/80 text-red-200 text-sm font-semibold border border-red-800"
              >
                <LogOut className="w-4 h-4" />
                {t('nav.logout', 'Log Out')} ({currentUser.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-white/10 text-white text-center text-sm font-semibold"
                >
                  {t('nav.login', 'Login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-[#E8B52C] text-slate-900 text-center text-sm font-bold"
                >
                  {t('nav.register', 'Register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
