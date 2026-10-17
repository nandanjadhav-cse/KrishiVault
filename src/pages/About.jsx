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
  CheckCircle2,
  GraduationCap,
  Check,
  Scale
} from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  const coreValues = [
    { title: 'Farmer First', desc: 'Prioritizing farmer prosperity, dignity, and real ground-level utility.' },
    { title: 'Transparency', desc: 'Itemized, unambiguous per-tonne costs with zero hidden vacancy penalties.' },
    { title: 'Affordability', desc: 'Enabling smaller producers to access wholesale commercial storage rates.' },
    { title: 'Collaboration', desc: 'Fostering collective community pooling and mutual cooperative strength.' },
    { title: 'Practical Innovation', desc: 'Solving real post-harvest bottlenecks through accessible technology.' }
  ];

  const teamMembers = [
    {
      name: 'Nandan Jadhav',
      role: 'Technical Lead / Frontend Development',
      initials: 'NJ',
      gradient: 'from-[#123B2A] to-[#08B65A]',
      accent: 'text-[#08B65A] bg-[#DDF7E8]',
      border: 'border-[#08B65A]/40',
      contributions: [
        'Leads the frontend development of the Krishi Vault prototype.',
        'Works on React components, application structure, and user-interface functionality.',
        'Helps implement warehouse discovery and shared-rental calculation workflows.',
        'Contributes to debugging, integration, and technical improvements.'
      ],
      tags: ['React 19', 'Vite', 'Frontend Architecture', 'UI State Management']
    },
    {
      name: 'Divyansh Singh',
      role: 'UI/UX Design and Presentation',
      initials: 'DS',
      gradient: 'from-[#123B2A] to-[#08B65A]',
      accent: 'text-[#08B65A] bg-[#DDF7E8]',
      border: 'border-[#08B65A]/40',
      contributions: [
        'Contributes to the visual identity and user experience of Krishi Vault.',
        'Helps organize page layouts, visual hierarchy, and interface consistency.',
        'Works on presentation design and communicating the project concept clearly.',
        'Supports the creation of engaging and understandable user journeys.'
      ],
      tags: ['UI/UX Design', 'Visual Hierarchy', 'User Journeys', 'Design Systems']
    },
    {
      name: 'Ishmeet Kaur',
      role: 'Business Research and Market Analysis',
      initials: 'IK',
      gradient: 'from-[#ca8a04] to-[#E8B52C]',
      accent: 'text-[#ca8a04] bg-[#fef9c3]',
      border: 'border-[#E8B52C]/40',
      contributions: [
        'Contributes to agricultural market research and problem validation.',
        'Helps analyze farmer needs and warehouse-owner challenges.',
        'Supports business-model development and market-opportunity analysis.',
        'Helps structure the value proposition and potential customer segments.'
      ],
      tags: ['AgriTech Research', 'Market Validation', 'Value Proposition', 'Problem Discovery']
    },
    {
      name: 'Vaishnavi Pachpatte',
      role: 'Creative Strategy and Content',
      initials: 'VP',
      gradient: 'from-[#123B2A] to-[#08B65A]',
      accent: 'text-[#08B65A] bg-[#DDF7E8]',
      border: 'border-[#08B65A]/40',
      contributions: [
        'Contributes creative ideas for presenting the Krishi Vault concept.',
        'Supports content development and storytelling.',
        'Helps communicate the project\'s mission, benefits, and intended impact.',
        'Contributes to creative direction and presentation refinement.'
      ],
      tags: ['Storytelling', 'Creative Strategy', 'Content Design', 'Agri Messaging']
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf7] py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Story Hero Banner (2-column layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Agricultural Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3]">
              <img
                src="/images/about-farmers.jpg"
                alt="Indian farmers holding clean harvested golden wheat grain"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101712]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8B52C]">
                  Authentic Agricultural Roots
                </span>
                <p className="text-xs font-semibold text-slate-200 mt-0.5">
                  Harvested wheat inspection in rural agricultural terminal.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
              About Krishi Vault
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101712] tracking-tight leading-tight">
              Built Around the People Who Feed Us.
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Krishi Vault is an AgriTech project built around a simple idea: access to storage should be easier to explore and more flexible for farmers. By connecting farmers with warehouse owners and introducing a shared-rental concept, Krishi Vault aims to make agricultural storage more accessible, improve transparency in rental decisions, and help warehouse owners connect with a wider range of potential customers.
            </p>
          </div>

        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DDF7E8] text-[#08B65A] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#101712]">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To make agricultural storage easier to discover, more transparent to evaluate, and more accessible through technology.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#08B65A] italic">
              "बेहतर भंडारण, सशक्त किसान।"
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fef9c3] text-[#ca8a04] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#101712]">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To build a connected agricultural storage ecosystem where farmers and warehouse owners can find better opportunities through collaboration.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#ca8a04] italic">
              "स्मार्ट साठवणूक, सक्षम शेतकरी."
            </div>
          </div>

        </div>

        {/* Core Values Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-card space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#08B65A]">Guiding Principles</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101712]">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((val, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#fafaf7] border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#123B2A]">
                  <CheckCircle2 className="w-4 h-4 text-[#08B65A]" />
                  <span>{val.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* OUR TEAM SECTION */}
        <div className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B2A] bg-[#DDF7E8] px-3.5 py-1.5 rounded-full border border-[#08B65A]/30">
              Team Krishi Vault
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101712]">
              The Minds Behind Krishi Vault
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              A student team combining technology, research, design, and creative thinking to explore smarter agricultural storage.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-xs text-slate-700">
              <GraduationCap className="w-4 h-4 text-[#08B65A]" />
              <span className="font-semibold">
                Department of Computer Science and Engineering — Government College of Engineering, Chhatrapati Sambhajinagar
              </span>
            </div>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} text-white font-extrabold text-lg flex items-center justify-center border-2 ${member.border} shadow-sm shrink-0`}>
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#101712] leading-tight">
                        {member.name}
                      </h3>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${member.accent}`}>
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Contributions
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {member.contributions.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#08B65A] mt-1.5 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1 mt-4">
                  {member.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom CTA Box */}
        <div className="bg-[#101712] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-extrabold">Ready to explore modern storage?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Browse verified warehouses, inspect bay specifications, or experiment with our cost sharing calculator.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/warehouses"
              className="px-6 py-3 rounded-2xl bg-[#08B65A] hover:bg-[#079d4e] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105"
            >
              Explore Warehouses
            </Link>
            <Link
              to="/calculator"
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all hover:scale-105"
            >
              Try Calculator
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
