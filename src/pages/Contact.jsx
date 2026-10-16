import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

export const Contact = () => {
  const { t } = useTranslation();
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save simulated demo submission to localStorage
    const saved = JSON.parse(localStorage.getItem('krishi_vault_contact_messages') || '[]');
    saved.push({
      id: `msg_${Date.now()}`,
      name,
      email,
      phone,
      subject,
      message,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('krishi_vault_contact_messages', JSON.stringify(saved));

    setIsSent(true);
    showToast('Your message has been received! (Simulated local submission)', 'success');
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-krishi-700 bg-krishi-100 px-3 py-1 rounded-full border border-krishi-200">
            Contact Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            We Are Here to Assist Every Kisan
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Have questions about group booking, warehouse accreditation, or technical help? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* National Helpline Card */}
            <div className="bg-gradient-to-br from-krishi-900 to-soil-950 text-white rounded-3xl p-6 sm:p-8 shadow-premium space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-harvest-500/20 text-harvest-400 flex items-center justify-center border border-harvest-400/30">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-harvest-300 tracking-wider">
                  National Kisan Call Center
                </p>
                <p className="text-2xl font-black text-white mt-1">
                  1800-180-1551
                </p>
                <p className="text-[11px] text-slate-300 mt-1">
                  Toll-Free All India • 6:00 AM – 10:00 PM (All 7 Days)
                </p>
              </div>
            </div>

            {/* Direct Coordinates */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4 text-xs text-slate-700">
              <h3 className="font-bold text-slate-900 text-sm">
                Project Headquarters
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-krishi-600 shrink-0 mt-0.5" />
                <span>Agricultural Technology Innovation Lab, Maharashtra / Punjab, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-krishi-600 shrink-0" />
                <span>support@krishivault.prototype.in</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-krishi-600 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 6:30 PM IST</span>
              </div>
            </div>

          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card">
            {isSent ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-krishi-100 text-krishi-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your inquiry has been saved to the prototype session storage. Our demo support desk will review it.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 rounded-xl bg-krishi-800 text-white text-xs font-bold mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Baldev Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit number"
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
                      placeholder="farmer@kisan.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Topic / Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                    >
                      <option value="general">General Farmer Inquiry</option>
                      <option value="group">Group Booking Questions</option>
                      <option value="listing">Listing a New Warehouse</option>
                      <option value="enwr">e-NWR Bank Loan Information</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="How can we help your agricultural storage needs?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                    required
                  />
                </div>

                <p className="text-[11px] text-slate-600 italic">
                  * Note: Submissions are saved locally in localStorage for academic prototype evaluation.
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Send className="w-4 h-4 text-harvest-400" />
                    <span>Send Demo Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
