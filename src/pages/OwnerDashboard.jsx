import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { warehouseService } from '../services/warehouseService';
import { bookingService } from '../services/bookingService';
import { Modal } from '../components/common/Modal';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Building2,
  Warehouse,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  CreditCard,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Users
} from 'lucide-react';

export const OwnerDashboard = () => {
  const { t } = useTranslation();
  const { currentUser, dataVersion, notifyDataChanged, showToast } = useApp();

  // Warehouse CRUD states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [deleteConfirmWarehouse, setDeleteConfirmWarehouse] = useState(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState('multipurpose');
  const [formLocation, setFormLocation] = useState('');
  const [formState, setFormState] = useState('Maharashtra');
  const [formTotalCapacity, setFormTotalCapacity] = useState(1500);
  const [formAvailableCapacity, setFormAvailableCapacity] = useState(1500);
  const [formRent, setFormRent] = useState(380);
  const [formCrops, setFormCrops] = useState('Wheat, Soybean, Gram');
  const [formFacilities, setFormFacilities] = useState('CCTV, Weighbridge, Nitrogen Fumigation, Fire Insurance');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80');

  // Warehouses and Bookings owned by current user
  const warehouses = useMemo(() => {
    return warehouseService.getAll();
  }, [dataVersion]);

  const allBookings = useMemo(() => {
    return bookingService.getAll();
  }, [dataVersion]);

  const pendingBookings = allBookings.filter(b => b.status === 'pending');
  const activeBookings = allBookings.filter(b => b.status === 'active');

  // Aggregates
  const totalWarehousesCount = warehouses.length;
  const totalCapacitySum = warehouses.reduce((sum, w) => sum + w.totalCapacity, 0);
  const availableCapacitySum = warehouses.reduce((sum, w) => sum + w.availableCapacity, 0);
  const occupiedCapacitySum = totalCapacitySum - availableCapacitySum;
  const overallOccupancyPct = totalCapacitySum > 0 ? Math.round((occupiedCapacitySum / totalCapacitySum) * 100) : 0;

  // Revenue estimation
  const estMonthlyRevenue = activeBookings.reduce((sum, b) => sum + (b.allocatedCapacity * b.rentPerMonth), 0);

  // Chart data
  const capacityChartData = warehouses.map(w => ({
    name: w.name.split(' ')[0] + ' ' + (w.district || ''),
    Occupied: w.totalCapacity - w.availableCapacity,
    Available: w.availableCapacity
  }));

  // Open edit modal with populated fields
  const handleStartEdit = (wh) => {
    setEditingWarehouse(wh);
    setFormName(wh.name);
    setFormType(wh.type);
    setFormLocation(wh.location);
    setFormState(wh.state || 'Maharashtra');
    setFormTotalCapacity(wh.totalCapacity);
    setFormAvailableCapacity(wh.availableCapacity);
    setFormRent(wh.rentPerMonth);
    setFormCrops(wh.supportedCrops.join(', '));
    setFormFacilities(wh.facilities.join(', '));
    setFormDescription(wh.description || '');
    setFormImage(wh.images[0] || '');
  };

  const handleOpenAddModal = () => {
    setEditingWarehouse(null);
    setFormName('');
    setFormType('multipurpose');
    setFormLocation('');
    setFormState('Maharashtra');
    setFormTotalCapacity(1200);
    setFormAvailableCapacity(1200);
    setFormRent(390);
    setFormCrops('Wheat, Maize, Pulses');
    setFormFacilities('CCTV, Weighbridge, Certified Fumigation, Insurance');
    setFormDescription('');
    setFormImage('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80');
    setIsAddModalOpen(true);
  };

  // Submit add or edit
  const handleSaveWarehouse = (e) => {
    e.preventDefault();
    try {
      const data = {
        name: formName,
        type: formType,
        location: formLocation,
        state: formState,
        totalCapacity: Number(formTotalCapacity),
        availableCapacity: Number(formAvailableCapacity),
        rentPerMonth: Number(formRent),
        supportedCrops: formCrops.split(',').map(s => s.trim()).filter(Boolean),
        facilities: formFacilities.split(',').map(s => s.trim()).filter(Boolean),
        description: formDescription,
        images: [formImage]
      };

      if (editingWarehouse) {
        warehouseService.update(editingWarehouse.id, data);
        showToast(`Warehouse "${formName}" updated successfully!`, 'success');
        setEditingWarehouse(null);
      } else {
        warehouseService.create(data, currentUser?.id || 'user_owner_1');
        showToast(`New warehouse "${formName}" listed successfully!`, 'success');
        setIsAddModalOpen(false);
      }
      notifyDataChanged();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Delete warehouse
  const handleConfirmDelete = () => {
    if (!deleteConfirmWarehouse) return;
    try {
      warehouseService.delete(deleteConfirmWarehouse.id);
      showToast(`Warehouse "${deleteConfirmWarehouse.name}" deleted.`, 'info');
      setDeleteConfirmWarehouse(null);
      notifyDataChanged();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Booking actions (Approve / Reject)
  const handleUpdateBookingStatus = (bookingId, status) => {
    try {
      bookingService.updateStatus(bookingId, status);
      showToast(`Booking request ${status === 'active' ? 'Approved' : 'Rejected'}.`, status === 'active' ? 'success' : 'info');
      notifyDataChanged();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-krishi-800 text-harvest-400 flex items-center justify-center shrink-0 border border-krishi-700 shadow-md">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {currentUser?.name || 'Vikramaditya Deshmukh'}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-harvest-100 text-harvest-800 border border-harvest-200">
                  Warehouse Operator
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Sahyadri Agro Logistics & Cold Chain • GSTIN: 27AABCS1429E1Z8
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs sm:text-sm shadow-premium transition-all hover:scale-105 active:scale-95 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-harvest-400" />
            <span>{t('dashboard.addNewWarehouse')}</span>
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('dashboard.totalWarehouses')}
            </span>
            <p className="text-3xl font-black text-slate-900">{totalWarehousesCount}</p>
            <span className="text-[11px] text-slate-500">WDRA Accredited Facilities</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Storage Capacity
            </span>
            <p className="text-3xl font-black text-slate-900">{totalCapacitySum.toLocaleString()} MT</p>
            <div className="flex justify-between text-[11px] text-slate-600 font-semibold pt-1">
              <span>{occupiedCapacitySum} MT Occupied</span>
              <span className="text-emerald-700">{availableCapacitySum} MT Free</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Overall Capacity Utilization
            </span>
            <p className="text-3xl font-black text-emerald-700">{overallOccupancyPct}%</p>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallOccupancyPct}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('dashboard.estimatedRevenue')}
            </span>
            <p className="text-3xl font-black text-krishi-800">₹{estMonthlyRevenue.toLocaleString()}</p>
            <span className="text-[11px] text-emerald-700 font-semibold">Active bay billing</span>
          </div>

        </div>

        {/* Capacity Utilization Chart */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Facility-Wise Capacity Breakdown (Occupied vs Free Space in MT)
              </h3>
              <p className="text-xs text-slate-500">Real-time bay monitoring to prevent overbooking</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capacityChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="Occupied" stackId="a" fill="#1f5730" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Available" stackId="a" fill="#99dfab" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Incoming Farmer Booking Requests */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t('dashboard.bookingRequests')}
              </h2>
              <p className="text-xs text-slate-500">
                Direct booking requests from farmers awaiting your confirmation
              </p>
            </div>
            {pendingBookings.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                {pendingBookings.length} Action Needed
              </span>
            )}
          </div>

          {pendingBookings.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 italic">
              {t('dashboard.noPendingRequests')}
            </p>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
              {pendingBookings.map((req) => (
                <div key={req.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        {req.cropType}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {req.farmerName} • <span className="text-krishi-700">{req.allocatedCapacity} MT</span>
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Warehouse: <strong>{req.warehouseName}</strong> • Duration: {req.durationMonths} Months • Rate: ₹{req.rentPerMonth}/MT
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Contact: {req.farmerPhone || '9822456711'} • Est. Revenue: ₹{req.totalCost.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleUpdateBookingStatus(req.id, 'active')}
                      className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-harvest-400" />
                      <span>{t('dashboard.approve')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateBookingStatus(req.id, 'rejected')}
                      className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold text-xs transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{t('dashboard.reject')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Warehouse Inventory Management CRUD Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t('dashboard.manageWarehouses')}
              </h2>
              <p className="text-xs text-slate-500">
                Add, edit pricing, manage capacity limits, or remove warehouse listings
              </p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="text-xs font-bold text-krishi-700 hover:text-krishi-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Facility</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Facility Name</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Total Space</th>
                  <th className="p-3.5">Free Space</th>
                  <th className="p-3.5">Rent (₹/MT)</th>
                  <th className="p-3.5">WDRA Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {warehouses.map((wh) => (
                  <tr key={wh.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      {wh.name}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {wh.location}, {wh.state}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {wh.storageTypeLabel}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      {wh.totalCapacity} MT
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">
                      {wh.availableCapacity} MT
                    </td>
                    <td className="p-3.5 font-extrabold text-slate-900">
                      ₹{wh.rentPerMonth}
                    </td>
                    <td className="p-3.5">
                      {wh.wdraCertified ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Approved
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(wh)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-krishi-800 hover:bg-slate-100"
                          title="Edit Warehouse"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmWarehouse(wh)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          title="Delete Warehouse"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ADD / EDIT WAREHOUSE MODAL */}
      <Modal
        isOpen={isAddModalOpen || Boolean(editingWarehouse)}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingWarehouse(null);
        }}
        title={editingWarehouse ? 'Edit Warehouse Information' : 'List New Warehouse'}
        subtitle="Manage facility capacity, supported crops, and pricing"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveWarehouse} className="space-y-4">
          
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Warehouse Facility Name
            </label>
            <input
              type="text"
              placeholder="e.g. Lasalgaon Agro Vault & Chawl"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Storage Type
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="onionStorage">Scientific Onion Chawl</option>
                <option value="grainSilo">Galvanized Steel Grain Silo</option>
                <option value="coldStorage">Cold Storage (2°-8°C)</option>
                <option value="dryStorage">Pre-Engineered Dry Godown</option>
                <option value="multipurpose">Cooperative Multi-Commodity</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Monthly Rent (₹ per MT)
              </label>
              <input
                type="number"
                min="100"
                max="2000"
                value={formRent}
                onChange={(e) => setFormRent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Total Usable Capacity (MT)
              </label>
              <input
                type="number"
                min="50"
                max="10000"
                value={formTotalCapacity}
                onChange={(e) => setFormTotalCapacity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Available Vacant Capacity (MT)
              </label>
              <input
                type="number"
                min="0"
                max={formTotalCapacity}
                value={formAvailableCapacity}
                onChange={(e) => setFormAvailableCapacity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Location (Taluka / District)
              </label>
              <input
                type="text"
                placeholder="e.g. Lasalgaon, Nashik"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                State
              </label>
              <select
                value={formState}
                onChange={(e) => setFormState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Punjab">Punjab</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Supported Crops (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Onion, Garlic, Potato"
              value={formCrops}
              onChange={(e) => setFormCrops(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Facilities & Security Features (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. CCTV Surveillance, 100 MT Weighbridge, Nitrogen Fumigation"
              value={formFacilities}
              onChange={(e) => setFormFacilities(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Photograph Image URL
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingWarehouse(null);
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              {editingWarehouse ? 'Save Updates' : 'Publish Warehouse'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={Boolean(deleteConfirmWarehouse)}
        onClose={() => setDeleteConfirmWarehouse(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Warehouse Listing"
        message={`Are you sure you want to remove "${deleteConfirmWarehouse?.name}" from Krishi Vault? All associated capacity records will be permanently removed.`}
        confirmText="Confirm Delete"
        isDanger={true}
      />

    </div>
  );
};
