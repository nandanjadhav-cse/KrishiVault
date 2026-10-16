import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { currentUser, logout, unreadCount, demoLogin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-krishi-800 text-harvest-300 font-semibold shadow-inner'
        : 'text-slate-100 hover:text-white hover:bg-krishi-800/60'
    }`;

  const mobileItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
      isActive
        ? 'bg-krishi-800 text-harvest-300 font-bold'
        : 'text-slate-200 hover:bg-krishi-800/50 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-30 bg-krishi-900 border-b border-krishi-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-krishi-600 to-krishi-800 p-2 border border-harvest-400/40 shadow-card flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path d="M24 6L8 16V40H40V16L24 6Z" stroke="#fef08a" strokeWidth="3" strokeLinejoin="round" />
                <path d="M18 40V24H30V40" stroke="#4ade80" strokeWidth="3" strokeLinejoin="round" />
                <circle cx="24" cy="18" r="3" fill="#facc15" />
                <path d="M24 21V27M21 24L27 24" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Krishi Vault
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-harvest-500/20 text-harvest-300 border border-harvest-400/30">
                  AgriTech
                </span>
              </span>
              <span className="text-[11px] text-krishi-200 font-medium">
                Smart Storage. Stronger Farmers.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink to="/" className={navItemClass}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/warehouses" className={navItemClass}>
              <Warehouse className="w-4 h-4 text-krishi-400" />
              {t('nav.warehouses')}
            </NavLink>
            <NavLink to="/marketplace" className={navItemClass}>
              <Users className="w-4 h-4 text-harvest-400" />
              <span>{t('nav.marketplace')}</span>
              <span className="ml-1 text-[10px] bg-harvest-500 text-slate-900 font-bold px-1.5 py-0.2 rounded-full">
                Share
              </span>
            </NavLink>
            <NavLink to="/calculator" className={navItemClass}>
              <Calculator className="w-4 h-4 text-krishi-400" />
              {t('nav.calculator')}
            </NavLink>

            {currentUser?.role === 'owner' ? (
              <NavLink to="/owner-dashboard" className={navItemClass}>
                <Building2 className="w-4 h-4 text-harvest-300" />
                {t('nav.ownerDashboard')}
              </NavLink>
            ) : (
              <NavLink to="/farmer-dashboard" className={navItemClass}>
                <LayoutDashboard className="w-4 h-4 text-harvest-300" />
                {t('nav.farmerDashboard')}
              </NavLink>
            )}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector */}
            <LanguageSelector variant="header" />

            {/* Notifications Center Bell */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-lg text-slate-200 hover:text-white hover:bg-krishi-800 transition-colors"
              title={t('nav.notifications')}
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-krishi-900 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User Profile or Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-krishi-800 transition-colors text-left"
                  aria-expanded={profileDropdownOpen}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-harvest-400"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                  <div className="hidden md:flex flex-col">
                    <span className="text-xs font-bold text-white leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-harvest-300 capitalize">
                      {currentUser.role === 'owner' ? 'Warehouse Operator' : 'Kisan Member'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-premium border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-krishi-100 text-krishi-800">
                        {currentUser.role}
                      </span>
                    </div>

                    <Link
                      to={currentUser.role === 'owner' ? '/owner-dashboard' : '/farmer-dashboard'}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-krishi-50 hover:text-krishi-900 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-krishi-600" />
                      {currentUser.role === 'owner' ? t('nav.ownerDashboard') : t('nav.farmerDashboard')}
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-krishi-50 hover:text-krishi-900 font-medium"
                    >
                      <User className="w-4 h-4 text-krishi-600" />
                      {t('nav.profile')}
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
                        <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
                      </button>
                    </div>

                    <div className="my-1 border-t border-slate-100"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white hover:bg-krishi-800 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-harvest-500 hover:bg-harvest-400 text-slate-900 transition-colors shadow-sm"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            <LanguageSelector variant="header" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-krishi-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-krishi-950 border-t border-krishi-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileItemClass}
          >
            {t('nav.home')}
          </NavLink>
          <NavLink
            to="/warehouses"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileItemClass}
          >
            <Warehouse className="w-5 h-5 text-krishi-400" />
            {t('nav.warehouses')}
          </NavLink>
          <NavLink
            to="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileItemClass}
          >
            <Users className="w-5 h-5 text-harvest-400" />
            {t('nav.marketplace')}
          </NavLink>
          <NavLink
            to="/calculator"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileItemClass}
          >
            <Calculator className="w-5 h-5 text-krishi-400" />
            {t('nav.calculator')}
          </NavLink>

          <NavLink
            to={currentUser?.role === 'owner' ? '/owner-dashboard' : '/farmer-dashboard'}
            onClick={() => setMobileMenuOpen(false)}
            className={mobileItemClass}
          >
            <LayoutDashboard className="w-5 h-5 text-harvest-300" />
            {currentUser?.role === 'owner' ? t('nav.ownerDashboard') : t('nav.farmerDashboard')}
          </NavLink>

          <NavLink
            to="/notifications"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileItemClass}
          >
            <Bell className="w-5 h-5 text-krishi-400" />
            <span>{t('nav.notifications')}</span>
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {unreadCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileItemClass}
          >
            <User className="w-5 h-5 text-krishi-400" />
            {t('nav.profile')}
          </NavLink>

          <div className="pt-4 border-t border-krishi-800 flex flex-col gap-2">
            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-950/80 text-red-200 text-sm font-semibold border border-red-800"
              >
                <LogOut className="w-4 h-4" />
                {t('nav.logout')} ({currentUser.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-krishi-800 text-white text-center text-sm font-semibold"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl bg-harvest-500 text-slate-900 text-center text-sm font-bold"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
