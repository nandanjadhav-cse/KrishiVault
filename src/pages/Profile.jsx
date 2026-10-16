import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  RotateCcw,
  Save,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Bell,
  LogOut
} from 'lucide-react';

export const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, updateProfile, resetDemoData, changeLanguage, logout, showToast } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [crops, setCrops] = useState((currentUser?.crops || []).join(', '));
  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [preferredLang, setPreferredLang] = useState(currentUser?.preferredLanguage || 'en');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    try {
      updateProfile({
        name,
        email,
        phone,
        location,
        preferredLanguage: preferredLang,
        crops: crops.split(',').map(s => s.trim()).filter(Boolean),
        companyName
      });
      // also update i18n language if changed
      changeLanguage(preferredLang);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleReset = () => {
    resetDemoData();
    setIsResetConfirmOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('profile.title')}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {t('profile.subtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs self-start sm:self-auto transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('nav.logout')}</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
          
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-krishi-600 shadow-sm shrink-0"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
              }}
            />
            <div>
              <h2 className="text-lg font-bold text-slate-900">{currentUser?.name}</h2>
              <p className="text-xs text-slate-500">{currentUser?.email}</p>
              <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-krishi-100 text-krishi-800">
                {currentUser?.role === 'owner' ? 'Warehouse Operator' : 'Kisan Member'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
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
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  District & State
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                  required
                />
              </div>
            </div>

            {/* Role specific field */}
            {currentUser?.role === 'owner' ? (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Business Entity / Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Harvest Crops Grown (Comma-separated)
                </label>
                <input
                  type="text"
                  value={crops}
                  onChange={(e) => setCrops(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                />
              </div>
            )}

            {/* Preferred Language */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                {t('profile.preferredLanguage')} (22 Scheduled Indian Languages)
              </label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name}) • {lang.script}
                  </option>
                ))}
              </select>
            </div>

            {/* Notification checkboxes */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Alert Preferences
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="rounded text-krishi-600 focus:ring-krishi-500"
                />
                <span>SMS updates for group capacity thresholds and bay availability</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded text-krishi-600 focus:ring-krishi-500"
                />
                <span>Email monthly storage statements and e-NWR digital receipts</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{t('profile.saveChanges')}</span>
              </button>
            </div>

          </form>

        </div>

        {/* Danger Zone: Reset Data */}
        <div className="bg-red-50/50 rounded-3xl p-6 sm:p-8 border border-red-200/80 space-y-3">
          <div className="flex items-center gap-2 text-red-800">
            <RotateCcw className="w-5 h-5 text-red-600" />
            <h3 className="font-extrabold text-sm">{t('profile.resetDemoData')}</h3>
          </div>
          <p className="text-xs text-red-700 leading-relaxed max-w-xl">
            {t('profile.resetWarning')}
          </p>
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Reset All Data to Defaults
          </button>
        </div>

      </div>

      {/* RESET CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleReset}
        title="Reset All Prototype State"
        message="This will overwrite all modified warehouses, active group pledges, direct bookings, and notifications back to the initial demo seed data."
        confirmText="Confirm Reset"
        isDanger={true}
      />

    </div>
  );
};
