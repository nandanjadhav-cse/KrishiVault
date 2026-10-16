import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import {
  HelpCircle,
  Globe,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Search,
  BookOpen,
  FileCheck2,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export const Help = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const guideItems = [
    {
      title: "How to Join an Open Group Booking",
      steps: [
        "Navigate to the Group Booking Marketplace from the top navigation bar.",
        "Filter by your target crop (e.g. Onion, Wheat, Chilli) or district.",
        "Choose an 'Open' or 'Almost Full' pool and review the warehouse rate & duration.",
        "Click 'Join Group', specify the exact Metric Tonnes you wish to pledge, and confirm.",
        "Your share is instantly locked and visible in your Farmer Dashboard."
      ]
    },
    {
      title: "How Rent is Shared: Proportional vs Equal",
      steps: [
        "Proportional Sharing: You pay strictly for the metric tonnes of capacity you occupy. (e.g. 20 MT out of a 100 MT bay = exactly 20% of the rent).",
        "Equal Sharing: Selected when farmers want to divide the lump-sum bay rental equally across all group members, regardless of volume variations.",
        "All calculations exclude middleman margins and are calculated directly from the warehouse base rate."
      ]
    },
    {
      title: "e-NWR Receipts & Bank Pledge Finance",
      steps: [
        "Once crops are verified and weighed at the facility, an electronic Negotiable Warehouse Receipt (e-NWR) is generated.",
        "Farmers can submit this receipt number to public sector or cooperative banks to receive immediate loans (up to 75% of commodity value) at subsidized interest rates.",
        "This allows farmers to pay off urgent harvesting costs without dumping grain on depressed spot markets."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-krishi-700 bg-krishi-100 px-3 py-1 rounded-full border border-krishi-200">
            Support & Documentation
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Krishi Vault Help Center & Language Checklist
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Guides, operational workflows, and verified translation coverage for all 22 scheduled Indian languages.
          </p>
        </div>

        {/* Step-by-Step Practical Guides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guideItems.map((g, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-krishi-100 text-krishi-800 font-bold flex items-center justify-center text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-3">
                  {g.title}
                </h3>
                <ol className="space-y-2 text-xs text-slate-600 list-decimal pl-4 leading-relaxed">
                  {g.steps.map((s, sIdx) => (
                    <li key={sIdx}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* 22 SCHEDULED INDIAN LANGUAGES DOCUMENTATION & REVIEW CHECKLIST */}
        <div id="languages" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-krishi-600" />
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  22 Scheduled Indian Languages — Status & Translation Matrix
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Eighth Schedule of the Constitution of India. All 22 languages + English have localized JSON resource bundles.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Language (Native Name)</th>
                  <th className="p-3">Script</th>
                  <th className="p-3">Direction</th>
                  <th className="p-3">Coverage Status</th>
                  <th className="p-3">Resource File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SUPPORTED_LANGUAGES.map((lang, idx) => (
                  <tr key={lang.code} className="hover:bg-slate-50/80">
                    <td className="p-3 font-semibold text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-bold text-slate-900">
                      {lang.nativeName} <span className="font-normal text-slate-500">({lang.name})</span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{lang.script}</td>
                    <td className="p-3 uppercase text-[10px] font-bold text-slate-600">{lang.dir}</td>
                    <td className="p-3">
                      {lang.status === 'complete' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Fully Verified & Usable</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Draft Review Stage</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-krishi-700 font-semibold">
                      src/i18n/locales/{lang.code}.json
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">Review Checklist Note:</p>
            <p>
              Marathi (मराठी), Hindi (हिन्दी), and English (en) are 100% comprehensively translated with domain-specific agricultural vocabulary. The remaining 19 scheduled languages feature authentic native script translations for primary navigation labels, titles, taglines, search controls, and call-to-actions, accompanied by structured draft resource files ready for professional agronomic translator review.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
