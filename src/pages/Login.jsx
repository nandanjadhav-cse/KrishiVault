import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, demoLogin, showToast } = useApp();

  const [role, setRole] = useState('farmer'); // 'farmer' or 'owner'
  const [emailOrPhone, setEmailOrPhone] = useState('ramesh.patil@kisan.in');
  const [password, setPassword] = useState('kisan1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = login(emailOrPhone, password, role);
      setIsSubmitting(false);
      navigate(user.role === 'owner' ? '/owner-dashboard' : '/farmer-dashboard');
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = (demoRole) => {
    const user = demoLogin(demoRole);
    navigate(user.role === 'owner' ? '/owner-dashboard' : '/farmer-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-premium">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-krishi-800 p-2 flex items-center justify-center">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path d="M24 6L8 16V40H40V16L24 6Z" stroke="#fef08a" strokeWidth="3" />
                <path d="M18 40V24H30V40" stroke="#4ade80" strokeWidth="3" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-slate-900">Krishi Vault</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {t('auth.loginTitle')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setRole('farmer');
              setEmailOrPhone('ramesh.patil@kisan.in');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              role === 'farmer'
                ? 'bg-white text-krishi-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Kisan / Farmer</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('owner');
              setEmailOrPhone('vikram.storage@agroholdings.com');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              role === 'owner'
                ? 'bg-white text-krishi-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Warehouse Owner</span>
          </button>
        </div>

        {/* Quick 1-Click Demo Buttons */}
        <div className="space-y-2 pt-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">
            One-Click Instant Prototype Demo Login
          </p>
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('farmer')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-krishi-50 hover:bg-krishi-100 text-krishi-900 text-xs font-bold border border-krishi-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-krishi-700" />
                <span>Demo Farmer: Ramesh Patil (Nashik)</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('owner')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-harvest-50 hover:bg-harvest-100 text-harvest-950 text-xs font-bold border border-harvest-200 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-harvest-700" />
                <span>Demo Operator: Vikramaditya (Pune)</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
            </button>
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-slate-600">
            <span className="bg-white px-2">or enter credentials</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Email or Mobile Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-2xl bg-krishi-800 hover:bg-krishi-700 text-white font-extrabold text-xs shadow-premium transition-all hover:scale-102"
          >
            {isSubmitting ? 'Signing In...' : t('auth.loginBtn')}
          </button>
        </form>

        {/* Notice */}
        <p className="text-[11px] text-slate-600 leading-relaxed text-center italic">
          {t('auth.demoNotice')}
        </p>

        <div className="text-center pt-2">
          <span className="text-xs text-slate-500">
            {t('auth.dontHaveAccount')}{' '}
            <Link to="/register" className="font-bold text-krishi-700 hover:underline">
              {t('auth.registerBtn')}
            </Link>
          </span>
        </div>

      </div>
    </div>
  );
};
