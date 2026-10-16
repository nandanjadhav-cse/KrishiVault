import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { warehouseService } from '../services/warehouseService';
import { groupService } from '../services/groupService';
import { bookingService } from '../services/bookingService';
import { Modal } from '../components/common/Modal';
import { WarehouseCard } from '../components/common/WarehouseCard';
import {
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Phone,
  User,
  Building2,
  FileCheck2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Info,
  Clock,
  Users
} from 'lucide-react';

export const WarehouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser, showToast, notifyDataChanged } = useApp();

  const warehouse = warehouseService.getById(id);
  const activeGroups = groupService.getByWarehouse(id);
  const similarWarehouses = useMemo(() => {
    return warehouseService.getAll().filter(w => w.id !== id).slice(0, 2);
  }, [id]);

  // Gallery active index
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Booking simulation state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingCrop, setBookingCrop] = useState('');
  const [bookingCapacity, setBookingCapacity] = useState(10);
  const [bookingDuration, setBookingDuration] = useState(3);
  const [bookingStartDate, setBookingStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [bookingNotes, setBookingNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default crop when warehouse loads
  React.useEffect(() => {
    if (warehouse?.supportedCrops?.length && !bookingCrop) {
      setBookingCrop(warehouse.supportedCrops[0]);
    }
  }, [warehouse, bookingCrop]);

  if (!warehouse) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center max-w-md shadow-card">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Warehouse Not Found</h2>
          <p className="text-xs text-slate-600 mb-6">
            The requested warehouse could not be located in our verified directory.
          </p>
          <Link
            to="/warehouses"
            className="px-5 py-2.5 rounded-xl bg-krishi-800 text-white font-bold text-xs"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  // Cost calculations
  const baseRate = warehouse.rentPerMonth;
  const estimatedMonthly = bookingCapacity * baseRate;
  const estimatedTotal = estimatedMonthly * bookingDuration;
  const handlingFee = Math.round(bookingCapacity * 25); // ₹25 per MT loading/unloading
  const grandTotal = estimatedTotal + handlingFee;

  const handleSimulatedBookingSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Please sign in to complete your warehouse booking.', 'error');
      navigate('/login');
      return;
    }

    if (bookingCapacity > warehouse.availableCapacity) {
      showToast(
        `Requested capacity (${bookingCapacity} MT) exceeds available space (${warehouse.availableCapacity} MT).`,
        'error'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const newBooking = bookingService.createDirectBooking(
        {
          warehouseId: warehouse.id,
          cropType: bookingCrop,
          allocatedCapacity: Number(bookingCapacity),
          startDate: bookingStartDate,
          durationMonths: Number(bookingDuration)
        },
        currentUser
      );

      setIsSubmitting(false);
      setIsBookingModalOpen(false);
      notifyDataChanged();
      showToast(`Booking ${newBooking.receiptNumber} successfully created!`, 'success');
      navigate('/farmer-dashboard');
    } catch (err) {
      setIsSubmitting(false);
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-krishi-700">Home</Link>
          <span>/</span>
          <Link to="/warehouses" className="hover:text-krishi-700">Warehouses</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{warehouse.name}</span>
        </nav>

        {/* Top Header Block */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-krishi-100 text-krishi-800">
                  {warehouse.storageTypeLabel}
                </span>
                {warehouse.wdraCertified && (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900 text-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-harvest-400" />
                    <span>WDRA Approved ({warehouse.wdraRegNumber})</span>
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 text-harvest-500 fill-current" />
                  <span>{warehouse.rating.toFixed(2)} ({warehouse.reviewsCount} Kisan Ratings)</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {warehouse.name}
              </h1>

              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-krishi-600 shrink-0" />
                <span>{warehouse.address}, {warehouse.district}, {warehouse.state}</span>
              </p>
            </div>

            {/* Quick Price / CTA Block */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between bg-slate-50 lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-slate-200 gap-3">
              <div className="text-left lg:text-right">
                <span className="text-xs text-slate-500 block">Warehouse Storage Rate</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹{warehouse.rentPerMonth}</span>
                  <span className="text-xs text-slate-500 font-bold">/ MT / Month</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                  {warehouse.availableCapacity} MT space currently vacant
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs sm:text-sm shadow-premium transition-all hover:scale-105 active:scale-95"
              >
                {t('warehouse.bookNow')}
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Gallery & Details on Left, Booking Calculator on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-card space-y-3">
              <div className="h-[360px] sm:h-[420px] rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={warehouse.images[activeImgIndex] || warehouse.images[0]}
                  alt={warehouse.name}
                  className="w-full h-full object-cover transition-all duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-white text-xs font-semibold">
                  Photo {activeImgIndex + 1} of {warehouse.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {warehouse.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {warehouse.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`h-20 w-28 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImgIndex === idx ? 'border-krishi-600 scale-102 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description & Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-l-4 border-krishi-600 pl-3">
                {t('warehouse.detailsTitle')}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {warehouse.description}
              </p>

              {/* Supported Crops */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  {t('warehouse.supportedCrops')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {warehouse.supportedCrops.map((crop) => (
                    <span
                      key={crop}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200/80"
                    >
                      🌾 {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Facilities & Security Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-l-4 border-harvest-500 pl-3">
                {t('warehouse.facilities')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {warehouse.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-krishi-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-800">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Storage Groups at this Warehouse */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 border-l-4 border-krishi-600 pl-3">
                    {t('warehouse.activeGroups')}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 pl-4">
                    Join an existing group to share costs or create your own.
                  </p>
                </div>
                <Link
                  to={`/marketplace?warehouse=${warehouse.id}`}
                  className="text-xs font-bold text-krishi-700 hover:text-krishi-800 flex items-center gap-1"
                >
                  <span>{t('warehouse.createGroupHere')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {activeGroups.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center">
                  <p className="text-xs text-slate-600 mb-3">
                    {t('warehouse.noGroups')}
                  </p>
                  <Link
                    to="/marketplace"
                    className="px-4 py-2 rounded-xl bg-harvest-500 text-slate-950 font-bold text-xs inline-block"
                  >
                    Start a Group at this Facility
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeGroups.map((grp) => {
                    const pct = Math.round((grp.capacityAllocated / grp.capacityTarget) * 100);
                    return (
                      <div
                        key={grp.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-krishi-200 text-krishi-900">
                              {grp.cropType}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{grp.title}</span>
                          </div>
                          <p className="text-xs text-slate-600">
                            Pledged: <strong className="text-slate-800">{grp.capacityAllocated} / {grp.capacityTarget} MT</strong> ({pct}%) • {grp.members.length} Farmers Joined
                          </p>
                        </div>

                        <Link
                          to={`/marketplace`}
                          className="px-4 py-2 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-bold text-xs whitespace-nowrap shadow-sm"
                        >
                          Join Group Share
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Similar Warehouses */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                {t('warehouse.similarWarehouses')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {similarWarehouses.map((sim) => (
                  <WarehouseCard key={sim.id} warehouse={sim} />
                ))}
              </div>
            </div>

          </div>

          {/* Right Sticky Sidebar: Quick Price Breakdown & Booking Widget (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Live Booking Estimator Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-premium space-y-5">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center justify-between">
                <span>Direct Storage Estimator</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Instant Quote
                </span>
              </h3>

              <div className="space-y-3.5">
                {/* Crop */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Commodity to Store
                  </label>
                  <select
                    value={bookingCrop}
                    onChange={(e) => setBookingCrop(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                  >
                    {warehouse.supportedCrops.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Capacity */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Required Capacity
                    </label>
                    <span className="text-xs font-extrabold text-krishi-700">
                      {bookingCapacity} MT
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={Math.min(200, warehouse.availableCapacity)}
                    step="1"
                    value={bookingCapacity}
                    onChange={(e) => setBookingCapacity(Number(e.target.value))}
                    className="w-full accent-krishi-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-600">
                    Max currently free: {warehouse.availableCapacity} MT
                  </span>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Storage Duration
                    </label>
                    <span className="text-xs font-extrabold text-krishi-700">
                      {bookingDuration} Months
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={bookingDuration}
                    onChange={(e) => setBookingDuration(Number(e.target.value))}
                    className="w-full accent-krishi-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Storage Rent ({bookingCapacity} MT × ₹{baseRate} × {bookingDuration} mo)</span>
                  <span className="font-semibold text-slate-800">₹{estimatedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>In-Out Handling & Electronic Weighbridge</span>
                  <span className="font-semibold text-slate-800">₹{handlingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST on Agri Storage (Govt Exempt)</span>
                  <span className="font-semibold text-emerald-600">₹0 (0%)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
                  <span>Estimated Total</span>
                  <span className="text-lg text-krishi-700">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-krishi-800 hover:bg-krishi-700 text-white font-extrabold text-xs sm:text-sm shadow-premium transition-all hover:scale-102 active:scale-98"
              >
                Book This Space (Simulated)
              </button>

              <div className="p-3 rounded-2xl bg-harvest-50 border border-harvest-200 text-[11px] text-harvest-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
                  Want to save up to 45%?
                </p>
                <p className="text-slate-600 leading-snug">
                  Check out group bookings at this warehouse to share rental space with neighboring farmers.
                </p>
                <Link
                  to={`/marketplace?warehouse=${warehouse.id}`}
                  className="font-bold text-harvest-800 hover:underline block pt-1"
                >
                  Explore Shared Booking Groups →
                </Link>
              </div>
            </div>

            {/* Warehouse Owner Contact Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-subtle space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Facility Operator
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-krishi-100 text-krishi-800 font-bold flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Sahyadri Agro Logistics Ltd.</p>
                  <p className="text-[11px] text-slate-600">WDRA Accredited Operator</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-krishi-600" />
                <span>{warehouse.contactPhone}</span>
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* SIMULATED BOOKING CONFIRMATION MODAL */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Confirm Simulated Warehouse Booking"
        subtitle={`${warehouse.name} (${warehouse.location})`}
      >
        <form onSubmit={handleSimulatedBookingSubmit} className="space-y-4">
          
          <div className="p-4 rounded-2xl bg-krishi-50 border border-krishi-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Booking Farmer:</span>
              <strong className="text-slate-900">{currentUser?.name || 'Guest Farmer'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Crop to Store:</span>
              <strong className="text-slate-900">{bookingCrop}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Pledged Capacity:</span>
              <strong className="text-slate-900">{bookingCapacity} MT</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Storage Duration:</span>
              <strong className="text-slate-900">{bookingDuration} Months (From {bookingStartDate})</strong>
            </div>
            <div className="flex justify-between border-t border-krishi-200/80 pt-2 text-sm font-extrabold">
              <span className="text-krishi-900">Estimated Total:</span>
              <span className="text-krishi-900">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Storage Start Date
            </label>
            <input
              type="date"
              value={bookingStartDate}
              onChange={(e) => setBookingStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Special Handling / Lot Notes (Optional)
            </label>
            <textarea
              rows="2"
              placeholder="e.g. 50 kg gunny bags, moisture tested at 11.2%..."
              value={bookingNotes}
              onChange={(e) => setBookingNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-krishi-500"
            />
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed italic">
            * Note: This is an academic project prototype. Upon confirmation, a simulated booking record will be generated in localStorage, the warehouse capacity will automatically adjust, and an instant receipt slip will appear on your Farmer Dashboard.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Simulated Reservation'}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
