import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { Globe, Check, Search, ChevronDown } from 'lucide-react';

export const LanguageSelector = ({ variant = 'default' }) => {
  const { currentLanguage, changeLanguage } = useApp();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const selectedCode = currentLanguage || i18n.language || localStorage.getItem('krishi_vault_lang') || 'en';
  const activeLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedCode) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          variant === 'header'
            ? 'bg-krishi-800/80 hover:bg-krishi-700 text-white border border-krishi-600/50 shadow-sm'
            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm'
        }`}
        aria-expanded={isOpen}
        aria-label="Select preferred language"
      >
        <Globe className="w-4 h-4 text-harvest-400 shrink-0" />
        <span className="font-semibold">{activeLang.nativeName}</span>
        <span className="text-xs opacity-75 hidden sm:inline">({activeLang.code.toUpperCase()})</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 max-h-96 rounded-2xl bg-white shadow-2xl border border-slate-100 ring-1 ring-black/5 z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2.5 bg-slate-50/80 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 22 Indian languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-krishi-500 text-slate-800 placeholder-slate-400"
                autoFocus
              />
            </div>
            <p className="text-[10px] text-slate-600 mt-1.5 px-1 font-medium">
              Eighth Schedule Languages of the Indian Constitution
            </p>
          </div>

          <div className="overflow-y-auto p-1.5 divide-y divide-slate-50">
            {filteredLanguages.map((lang) => {
              const isSelected = lang.code === selectedCode;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-xl transition-colors text-xs ${
                    isSelected
                      ? 'bg-krishi-50 text-krishi-900 font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 flex items-center gap-1.5">
                      {lang.nativeName}
                      {lang.status === 'complete' && (
                        <span className="text-[9px] bg-krishi-100 text-krishi-800 px-1.5 py-0.2 rounded font-bold">
                          Verified
                        </span>
                      )}
                      {lang.status === 'draft' && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                          Draft
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {lang.name} • <span className="italic">{lang.script}</span>
                    </span>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-krishi-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
