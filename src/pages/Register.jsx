import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Building2,
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, showToast } = useApp();

  const [role, setRole] = useState('farmer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('mr');
  const [cropsOrCompany, setCropsOrCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast('Passwords do not match. Please verify.', 'error');
      return;
    }

    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = register({
        name,
        email,
        phone,
        role,
        location,
        preferredLanguage,
        crops: role === 'farmer' ? cropsOrCompany.split(',').map(s => s.trim()).filter(Boolean) : undefined,
        companyName: role === 'owner' ? cropsOrCompany : undefined
      });

      setIsSubmitting(false);
      navigate(newUser.role === 'owner' ? '/owner-dashboard' : '/farmer-dashboard');
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-premium">
        
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
            {t('auth.registerTitle')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('auth.registerSubtitle')}
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {t('auth.selectRole')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                role === 'farmer'
                  ? 'border-krishi-600 bg-krishi-50 text-krishi-900 font-bold ring-2 ring-krishi-500/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="w-4 h-4 text-krishi-600" />
                <span className="text-xs font-bold">{t('auth.farmerRole')}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {t('auth.farmerRoleDesc')}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                role === 'owner'
                  ? 'border-harvest-600 bg-harvest-50 text-slate-950 font-bold ring-2 ring-harvest-500/20 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-harvest-600" />
                <span className="text-xs font-bold">{t('auth.ownerRole')}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {t('auth.ownerRoleDesc')}
              </p>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {t('auth.name')}
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Patil"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {t('auth.phone')}
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {t('auth.email')}
              </label>
              <input
                type="email"
                placeholder="farmer@kisan.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {t('auth.location')}
              </label>
              <input
                type="text"
                placeholder="e.g. Nashik, Maharashtra"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {role === 'farmer' ? 'Primary Crops (e.g. Onion, Wheat)' : 'Warehouse Business Entity'}
              </label>
              <input
                type="text"
                placeholder={role === 'farmer' ? 'Onion, Wheat, Soybean' : 'Sahyadri Agro Cold Chain Ltd.'}
                value={cropsOrCompany}
                onChange={(e) => setCropsOrCompany(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Preferred Interface Language
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {t('auth.password')}
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {t('auth.confirmPassword')}
              </label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-krishi-800 hover:bg-krishi-700 text-white font-extrabold text-xs shadow-premium transition-all hover:scale-102 mt-4"
          >
            {isSubmitting ? 'Creating Demo Account...' : t('auth.registerBtn')}
          </button>
        </form>

        <p className="text-[11px] text-slate-600 leading-relaxed text-center italic">
          {t('auth.demoNotice')}
        </p>

        <div className="text-center pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="font-bold text-krishi-700 hover:underline">
              {t('auth.loginBtn')}
            </Link>
          </span>
        </div>

      </div>
    </div>
  );
};
