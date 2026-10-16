import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { bookingService } from '../services/bookingService';
import { groupService } from '../services/groupService';
import { Modal } from '../components/common/Modal';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import {
  LayoutDashboard,
  Package,
  Layers,
  Calendar,
  CreditCard,
  Bell,
  ArrowRight,
  TrendingDown,
  Warehouse,
  Users,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
  AlertCircle,
  MapPin,
  Sparkles
} from 'lucide-react';

export const FarmerDashboard = () => {
  const { t } = useTranslation();
  const { currentUser, dataVersion, showToast } = useApp();

  // Selected receipt for modal
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Bookings and Groups
  const farmerBookings = useMemo(() => {
    if (!currentUser) return [];
    return bookingService.getByFarmer(currentUser.id);
  }, [currentUser, dataVersion]);

  const activeBookings = farmerBookings.filter(b => b.status === 'active');
  const pendingBookings = farmerBookings.filter(b => b.status === 'pending');

  const joinedGroups = useMemo(() => {
    if (!currentUser) return [];
    return groupService.getAll().filter(g => 
      g.members.some(m => m.farmerId === currentUser.id)
    );
  }, [currentUser, dataVersion]);

  // Aggregate stats
  const totalCapacityStored = activeBookings.reduce((sum, b) => sum + b.allocatedCapacity, 0);
  const monthlyStorageExpense = activeBookings.reduce((sum, b) => sum + (b.allocatedCapacity * b.rentPerMonth), 0);

  // Chart data: Stored crop distribution
  const cropDistributionData = useMemo(() => {
    const map = {};
    activeBookings.forEach(b => {
      map[b.cropType] = (map[b.cropType] || 0) + b.allocatedCapacity;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [activeBookings]);

  const COLORS = ['#2b8a45', '#eab308', '#3b82f6', '#ec4899', '#8b5cf6'];

  // Monthly expense chart data
  const expenseChartData = [
    { month: 'Aug', expense: 8400 },
    { month: 'Sep', expense: 12600 },
    { month: 'Oct', expense: monthlyStorageExpense || 16200 },
    { month: 'Nov (Est)', expense: monthlyStorageExpense ? Math.round(monthlyStorageExpense * 1.1) : 18000 }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Welcome & Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-krishi-600 shadow-sm shrink-0"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {currentUser?.name || 'Ramesh Patil'}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-krishi-100 text-krishi-800 border border-krishi-200">
                  Verified Farmer Member
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <span>{currentUser?.location || 'Nashik, Maharashtra'}</span>
                <span>•</span>
                <span>Farm: {currentUser?.farmSize || '6.5 Acres'}</span>
              </p>
              <div className="flex items-center gap-1.5 mt-2">
                {(currentUser?.crops || ['Onion', 'Soybean', 'Wheat']).map(c => (
                  <span key={c} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/warehouses"
              className="px-4 py-2.5 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              Book New Space
            </Link>
            <Link
              to="/marketplace"
              className="px-4 py-2.5 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-extrabold text-xs shadow-sm transition-all"
            >
              Join Storage Group
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-krishi-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('dashboard.activeBookings')}
              </span>
              <Warehouse className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900">{activeBookings.length}</p>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              {totalCapacityStored} MT currently stored
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-harvest-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('dashboard.joinedGroups')}
              </span>
              <Users className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900">{joinedGroups.length}</p>
            <span className="text-[11px] text-harvest-700 font-semibold block">
              Co-Op group sharing pools
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-blue-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('dashboard.monthlyExpense')}
              </span>
              <CreditCard className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900">₹{monthlyStorageExpense.toLocaleString()}</p>
            <span className="text-[11px] text-blue-700 font-semibold block">
              Avg ₹{totalCapacityStored > 0 ? Math.round(monthlyStorageExpense / totalCapacityStored) : 0}/MT/month
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-amber-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('dashboard.pendingRequests')}
              </span>
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-3xl font-black text-slate-900">{pendingBookings.length}</p>
            <span className="text-[11px] text-slate-500 font-medium block">
              Awaiting owner confirmation
            </span>
          </div>

        </div>

        {/* Analytics Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Crop Storage Distribution Pie Chart */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card">
            <h3 className="font-bold text-slate-900 text-sm mb-4">
              Stored Crops Distribution (MT)
            </h3>
            {cropDistributionData.length > 0 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {cropDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-16">No crops in active storage.</p>
            )}
          </div>

          {/* Monthly Expense Trend Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card">
            <h3 className="font-bold text-slate-900 text-sm mb-4">
              Monthly Storage Spend Trend (₹)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Storage Spend']} />
                  <Bar dataKey="expense" fill="#2b8a45" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Active Storage Bookings Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t('dashboard.activeBookings')}
              </h2>
              <p className="text-xs text-slate-500">
                Your currently stored consignments and negotiable receipts
              </p>
            </div>
            <Link
              to="/warehouses"
              className="text-xs font-bold text-krishi-700 hover:text-krishi-800"
            >
              + Book Another Warehouse
            </Link>
          </div>

          {activeBookings.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500 mb-3">{t('dashboard.noActiveBookings')}</p>
              <Link
                to="/warehouses"
                className="px-4 py-2 rounded-xl bg-krishi-800 text-white font-bold text-xs"
              >
                Browse Warehouses
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Receipt #</th>
                    <th className="p-3.5">Warehouse & Location</th>
                    <th className="p-3.5">Crop</th>
                    <th className="p-3.5">Volume</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Total Cost</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-krishi-900 font-mono">
                        {b.receiptNumber}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-900">
                        {b.warehouseName}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold">
                          {b.cropType}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {b.allocatedCapacity} MT
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {b.durationMonths} Mo ({b.startDate} to {b.endDate || 'Ongoing'})
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        ₹{b.totalCost.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        {b.isGroupBooking ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-harvest-100 text-harvest-800">
                            Shared Group
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            Direct Solo
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(b)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                        >
                          <Printer className="w-3 h-3 text-slate-600" />
                          <span>View Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Joined Storage Groups Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                My Cooperative Storage Groups
              </h2>
              <p className="text-xs text-slate-500">
                Shared booking pools you have pledged capacity towards
              </p>
            </div>
            <Link
              to="/marketplace"
              className="text-xs font-bold text-harvest-800 hover:text-harvest-900"
            >
              Browse All Groups →
            </Link>
          </div>

          {joinedGroups.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 italic">
              You haven't joined any shared groups yet. Visit the Marketplace to co-rent bays.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {joinedGroups.map((grp) => {
                const myMember = grp.members.find(m => m.farmerId === currentUser?.id);
                return (
                  <div
                    key={grp.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-krishi-100 text-krishi-800">
                          {grp.cropType} • {grp.location}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-1">{grp.title}</h4>
                      </div>
                      <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {grp.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-200">
                      <div className="flex justify-between">
                        <span>Your Pledged Volume:</span>
                        <strong className="text-slate-900">{myMember?.requestedCapacity || 0} MT</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Your Estimated Cost:</span>
                        <strong className="text-krishi-800">₹{myMember?.estimatedCost?.toLocaleString() || 0}</strong>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Link
                        to="/marketplace"
                        className="text-xs font-bold text-krishi-700 hover:underline flex items-center gap-1"
                      >
                        <span>Manage in Marketplace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* SIMULATED RECEIPT MODAL */}
      {selectedReceipt && (
        <Modal
          isOpen={Boolean(selectedReceipt)}
          onClose={() => setSelectedReceipt(null)}
          title="Electronic Negotiable Warehouse Receipt (Simulated)"
          subtitle={`Certificate: ${selectedReceipt.receiptNumber}`}
        >
          <div className="p-6 border border-slate-200 rounded-2xl bg-white space-y-4 text-xs font-mono">
            <div className="text-center pb-4 border-b border-slate-200 space-y-1">
              <h3 className="font-black text-base text-slate-900 font-sans tracking-wide">
                KRISHI VAULT e-NWR RECEIPT
              </h3>
              <p className="text-[11px] text-slate-500 font-sans">
                Standard Agricultural Storage Electronic Deposit Slip
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-700">
              <div>
                <span className="text-slate-600 block text-[10px]">DEPOSITOR / FARMER:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.farmerName}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[10px]">WAREHOUSE OPERATOR:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.warehouseName}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[10px]">COMMODITY:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.cropType}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[10px]">QUANTITY STORED:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.allocatedCapacity} Metric Tonnes</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[10px]">DURATION / PERIOD:</span>
                <span>{selectedReceipt.durationMonths} Months ({selectedReceipt.startDate})</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[10px]">MONTHLY RATE:</span>
                <span>₹{selectedReceipt.rentPerMonth} / MT</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900 font-sans">
              <span>TOTAL CONTRACT RENT:</span>
              <span className="text-krishi-800">₹{selectedReceipt.totalCost.toLocaleString()}</span>
            </div>

            <p className="text-[10px] text-slate-600 leading-relaxed font-sans pt-2 border-t border-slate-100 italic">
              Demonstration prototype receipt. In production, this record links to national e-NWR repositories (NERL/CCRL) for subsidized pledge credit.
            </p>

            <div className="flex justify-end gap-3 pt-3 font-sans">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Print Slip
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
