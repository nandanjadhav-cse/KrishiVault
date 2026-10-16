import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { groupService } from '../services/groupService';
import { warehouseService } from '../services/warehouseService';
import { bookingService } from '../services/bookingService';
import { Modal } from '../components/common/Modal';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import {
  Users,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  MapPin,
  TrendingDown,
  Warehouse,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  UserCheck,
  Percent,
  Check
} from 'lucide-react';

export const GroupMarketplace = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, showToast, notifyDataChanged, dataVersion } = useApp();

  const filterWarehouseId = searchParams.get('warehouse') || '';

  // Data
  const groups = useMemo(() => {
    const all = groupService.getAll();
    if (filterWarehouseId) {
      return all.filter(g => g.warehouseId === filterWarehouseId);
    }
    return all;
  }, [filterWarehouseId, dataVersion]);

  const warehouses = useMemo(() => warehouseService.getAll(), [dataVersion]);

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sharingModeFilter, setSharingModeFilter] = useState('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGroupDetails, setSelectedGroupDetails] = useState(null);
  const [joinModalGroup, setJoinModalGroup] = useState(null);
  const [joinCapacity, setJoinCapacity] = useState(15);
  const [leaveConfirmGroup, setLeaveConfirmGroup] = useState(null);

  // Create Group Form State
  const [newWarehouseId, setNewWarehouseId] = useState(warehouses[0]?.id || '');
  const [newCropType, setNewCropType] = useState('Onion');
  const [newTitle, setNewTitle] = useState('');
  const [newTargetCapacity, setNewTargetCapacity] = useState(100);
  const [newInitialPledge, setNewInitialPledge] = useState(25);
  const [newSharingMode, setNewSharingMode] = useState('proportional');
  const [newDuration, setNewDuration] = useState(4);
  const [newStartDate, setNewStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [newDescription, setNewDescription] = useState('');

  // Selected warehouse for create modal
  const activeCreateWarehouse = useMemo(() => {
    return warehouses.find(w => w.id === newWarehouseId) || warehouses[0];
  }, [warehouses, newWarehouseId]);

  // Filter groups
  const filteredGroups = useMemo(() => {
    return groups.filter(g => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || (
        g.title.toLowerCase().includes(q) ||
        g.cropType.toLowerCase().includes(q) ||
        g.location.toLowerCase().includes(q) ||
        g.warehouseName.toLowerCase().includes(q)
      );

      const matchStatus = statusFilter === 'all' || g.status === statusFilter;
      const matchMode = sharingModeFilter === 'all' || g.sharingMode === sharingModeFilter;

      return matchQuery && matchStatus && matchMode;
    });
  }, [groups, searchQuery, statusFilter, sharingModeFilter]);

  // Handle Create Group
  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Please login to create a storage group.', 'error');
      navigate('/login');
      return;
    }

    try {
      const created = groupService.createGroup(
        {
          warehouseId: newWarehouseId,
          cropType: newCropType,
          title: newTitle || `${newCropType} Collaborative Bay`,
          capacityTarget: Number(newTargetCapacity),
          initialCapacity: Number(newInitialPledge),
          sharingMode: newSharingMode,
          durationMonths: Number(newDuration),
          storageStartDate: newStartDate,
          description: newDescription
        },
        currentUser
      );

      setIsCreateModalOpen(false);
      notifyDataChanged();
      showToast(`Group "${created.title}" successfully launched!`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Join Group
  const handleJoinGroupSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Please login to join this storage group.', 'error');
      navigate('/login');
      return;
    }

    try {
      const updated = groupService.joinGroup(joinModalGroup.id, currentUser, Number(joinCapacity));
      setJoinModalGroup(null);
      notifyDataChanged();
      showToast(`Joined "${updated.title}" with ${joinCapacity} MT pledged!`, 'success');
      
      // Update details modal if open
      if (selectedGroupDetails?.id === updated.id) {
        setSelectedGroupDetails(updated);
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Leave Group
  const handleConfirmLeave = () => {
    if (!leaveConfirmGroup || !currentUser) return;
    try {
      const updated = groupService.leaveGroup(leaveConfirmGroup.id, currentUser.id);
      notifyDataChanged();
      showToast(`You have left "${leaveConfirmGroup.title}".`, 'info');
      if (selectedGroupDetails?.id === updated.id) {
        setSelectedGroupDetails(updated);
      }
      setLeaveConfirmGroup(null);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Simulated Group Final Booking
  const handleFinalizeGroupBooking = (group) => {
    if (!currentUser) return;
    try {
      // Find current user's membership in the group
      const myMember = group.members.find(m => m.farmerId === currentUser.id);
      if (!myMember) {
        showToast('Only joined members can finalize this simulated reservation.', 'error');
        return;
      }

      bookingService.createDirectBooking(
        {
          warehouseId: group.warehouseId,
          cropType: group.cropType,
          allocatedCapacity: myMember.requestedCapacity,
          durationMonths: group.durationMonths,
          startDate: group.storageStartDate,
          groupId: group.id,
          groupTitle: group.title
        },
        currentUser
      );

      notifyDataChanged();
      showToast(`Group reservation finalized! Added to your Farmer Dashboard.`, 'success');
      setSelectedGroupDetails(null);
      navigate('/farmer-dashboard');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-harvest-800 bg-harvest-100 px-3 py-1 rounded-full border border-harvest-200">
              Cooperative Storage Marketplace
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              {t('marketplace.title')}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t('marketplace.subtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs sm:text-sm shadow-premium transition-all hover:scale-105 active:scale-95 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-harvest-400" />
            <span>{t('marketplace.createGroupBtn')}</span>
          </button>
        </div>

        {/* Co-Op Explanation Banner */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-krishi-900 to-soil-900 text-white shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-harvest-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              How Rent is Shared
            </span>
            <h3 className="text-lg font-bold">
              Fair Capacity Sharing: No Farmer Pays for Empty Air
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In <strong>Proportional Mode</strong>, you pay strictly for the metric tonnes you store. In <strong>Equal Mode</strong>, costs are distributed identically among all participating farmers. Capacity is validated live to prevent warehouse overbooking.
            </p>
          </div>

          <Link
            to="/calculator"
            className="px-5 py-2.5 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
          >
            Calculate Exact Savings
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('marketplace.searchGroup')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              />
            </div>

            {/* Status Filter */}
            <div className="md:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="all">All Group Statuses</option>
                <option value="open">Open for Members</option>
                <option value="almostFull">Almost Full (≥80%)</option>
                <option value="full">100% Filled</option>
              </select>
            </div>

            {/* Sharing Mode Filter */}
            <div className="md:col-span-3">
              <select
                value={sharingModeFilter}
                onChange={(e) => setSharingModeFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="all">All Cost Models</option>
                <option value="proportional">Proportional by MT</option>
                <option value="equal">Equal Split Sharing</option>
              </select>
            </div>

          </div>
        </div>

        {/* Groups Grid */}
        {filteredGroups.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-subtle max-w-lg mx-auto">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">No Storage Groups Found</h3>
            <p className="text-xs text-slate-500 mb-6">
              Be the first kisan to organize a shared booking pool for this crop or warehouse.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-krishi-800 text-white font-bold text-xs"
            >
              Start New Group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGroups.map((grp) => {
              const percent = Math.round((grp.capacityAllocated / grp.capacityTarget) * 100);
              const remaining = grp.capacityTarget - grp.capacityAllocated;
              const isMember = currentUser && grp.members.some(m => m.farmerId === currentUser.id);

              return (
                <div
                  key={grp.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Status and Crop Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-krishi-100 text-krishi-800">
                        🌾 {grp.cropType}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          grp.status === 'open'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : grp.status === 'almostFull'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-slate-100 text-slate-800 border-slate-300'
                        }`}
                      >
                        {grp.status === 'open'
                          ? t('marketplace.statusOpen')
                          : grp.status === 'almostFull'
                          ? t('marketplace.statusAlmostFull')
                          : t('marketplace.statusFull')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-krishi-700 transition-colors">
                      {grp.title}
                    </h3>

                    {/* Warehouse and Location */}
                    <p className="flex items-center gap-1.5 text-xs text-slate-600 mb-4 truncate">
                      <Warehouse className="w-3.5 h-3.5 text-krishi-600 shrink-0" />
                      <span>{grp.warehouseName}</span>
                    </p>

                    {/* Capacity Progress Bar */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 mb-4 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-medium">Capacity Pledged</span>
                        <span className="font-extrabold text-slate-900">
                          {grp.capacityAllocated} / {grp.capacityTarget} MT ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percent >= 100
                              ? 'bg-slate-800'
                              : percent >= 80
                              ? 'bg-amber-500'
                              : 'bg-krishi-600'
                          }`}
                          style={{ width: `${Math.min(100, percent)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-slate-600 pt-1">
                        <span>{grp.members.length} Farmers Joined</span>
                        <span className="font-semibold text-emerald-700">
                          {remaining > 0 ? `${remaining} MT Vacant` : 'Fully Allocated'}
                        </span>
                      </div>
                    </div>

                    {/* Group Metadata details */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-5">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Storage Period:</span>
                        <span className="font-semibold text-slate-800">{grp.durationMonths} Months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Sharing Mode:</span>
                        <span className="font-semibold text-slate-800 capitalize">
                          {grp.sharingMode === 'proportional' ? 'Proportional by MT' : 'Equal Split'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Monthly Bay Rate:</span>
                        <span className="font-semibold text-slate-900">₹{grp.rentPerMtMonth} / MT</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedGroupDetails(grp)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                    >
                      View Details
                    </button>

                    {isMember ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Joined</span>
                      </span>
                    ) : remaining > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setJoinModalGroup(grp);
                          setJoinCapacity(Math.min(15, remaining));
                        }}
                        className="px-4 py-2 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-extrabold text-xs shadow-sm transition-all hover:scale-102"
                      >
                        Join Group
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                        Capacity Filled
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* 1. CREATE GROUP MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Start a New Storage Group"
        subtitle="Invite neighboring farmers to share warehouse bays and reduce rent"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Warehouse Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Select Warehouse
              </label>
              <select
                value={newWarehouseId}
                onChange={(e) => setNewWarehouseId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              >
                {warehouses.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.availableCapacity} MT free)
                  </option>
                ))}
              </select>
            </div>

            {/* Crop Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Crop Type
              </label>
              <select
                value={newCropType}
                onChange={(e) => setNewCropType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="Onion">Onion (कांदा)</option>
                <option value="Wheat">Wheat (गेहूँ)</option>
                <option value="Potato">Potato (आलू)</option>
                <option value="Soybean">Soybean (सोयाबीन)</option>
                <option value="Cotton">Cotton (कपास)</option>
                <option value="Groundnut">Groundnut (मूंगफली)</option>
                <option value="Chilli">Red Chilli (मिर्च)</option>
                <option value="Pulses">Pulses / Chana (दलहन)</option>
              </select>
            </div>

          </div>

          {/* Group Title */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Group Name / Title
            </label>
            <input
              type="text"
              placeholder="e.g. Lasalgaon Red Onion Co-Op Bay #2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Target Capacity */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Target Group Capacity (MT)
                </label>
                <span className="text-xs font-bold text-krishi-700">
                  Max: {activeCreateWarehouse.availableCapacity} MT
                </span>
              </div>
              <input
                type="number"
                min="10"
                max={activeCreateWarehouse.availableCapacity}
                value={newTargetCapacity}
                onChange={(e) => setNewTargetCapacity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>

            {/* Your Initial Pledge */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Your Initial Pledged Capacity (MT)
              </label>
              <input
                type="number"
                min="1"
                max={newTargetCapacity}
                value={newInitialPledge}
                onChange={(e) => setNewInitialPledge(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Sharing Mode */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Cost Sharing Model
              </label>
              <select
                value={newSharingMode}
                onChange={(e) => setNewSharingMode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="proportional">Proportional (Pay for MT occupied)</option>
                <option value="equal">Equal Split (Equal among farmers)</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Storage Duration (Months)
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
                required
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Description / Notes for Fellow Farmers
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Storing harvested kharif onions until peak market rates in February..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-krishi-500"
            />
          </div>

          {/* Real-time Math Preview */}
          <div className="p-4 rounded-2xl bg-krishi-50 border border-krishi-200 text-xs space-y-1.5">
            <p className="font-bold text-krishi-900">Estimated Cost for Your {newInitialPledge} MT Share:</p>
            <p className="text-slate-700">
              Rate: ₹{activeCreateWarehouse.rentPerMonth}/MT × {newInitialPledge} MT × {newDuration} Months = <strong>₹{(activeCreateWarehouse.rentPerMonth * newInitialPledge * newDuration).toLocaleString()}</strong>
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              Launch Storage Group
            </button>
          </div>
        </form>
      </Modal>

      {/* 2. JOIN GROUP MODAL */}
      {joinModalGroup && (
        <Modal
          isOpen={Boolean(joinModalGroup)}
          onClose={() => setJoinModalGroup(null)}
          title={`Join "${joinModalGroup.title}"`}
          subtitle={`${joinModalGroup.warehouseName} • ${joinModalGroup.cropType}`}
        >
          <form onSubmit={handleJoinGroupSubmit} className="space-y-4">
            
            <div className="p-4 rounded-2xl bg-harvest-50 border border-harvest-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Group Target:</span>
                <strong className="text-slate-900">{joinModalGroup.capacityTarget} MT</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Remaining Available Space:</span>
                <strong className="text-emerald-700">
                  {joinModalGroup.capacityTarget - joinModalGroup.capacityAllocated} MT
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Storage Period:</span>
                <strong className="text-slate-900">{joinModalGroup.durationMonths} Months</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Warehouse Rate:</span>
                <strong className="text-slate-900">₹{joinModalGroup.rentPerMtMonth} / MT / Mo</strong>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Your Required Capacity (MT)
                </label>
                <span className="text-xs font-extrabold text-krishi-700">
                  {joinCapacity} MT
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={joinModalGroup.capacityTarget - joinModalGroup.capacityAllocated}
                value={joinCapacity}
                onChange={(e) => setJoinCapacity(Number(e.target.value))}
                className="w-full accent-krishi-600 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-krishi-50 border border-krishi-200 text-xs space-y-1">
              <span className="text-slate-600">Your Estimated Total Rental:</span>
              <p className="text-lg font-black text-krishi-900">
                ₹{(joinCapacity * joinModalGroup.rentPerMtMonth * joinModalGroup.durationMonths).toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-600">
                Proportionally distributed. No advance payment required for demo reservation.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setJoinModalGroup(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-extrabold text-xs shadow-sm transition-all"
              >
                Confirm Membership & Pledge
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 3. GROUP DETAILS MODAL */}
      {selectedGroupDetails && (
        <Modal
          isOpen={Boolean(selectedGroupDetails)}
          onClose={() => setSelectedGroupDetails(null)}
          title={selectedGroupDetails.title}
          subtitle={`Organized by ${selectedGroupDetails.creatorName} at ${selectedGroupDetails.warehouseName}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            
            {/* Status bar */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                  Capacity Allocation
                </span>
                <span className="text-base font-extrabold text-slate-900">
                  {selectedGroupDetails.capacityAllocated} of {selectedGroupDetails.capacityTarget} MT Pledged
                </span>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  selectedGroupDetails.status === 'open'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}
              >
                {selectedGroupDetails.status.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedGroupDetails.description}
            </p>

            {/* Member List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Joined Farmers ({selectedGroupDetails.members.length})
              </h4>
              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden bg-white">
                {selectedGroupDetails.members.map((m, idx) => (
                  <div key={m.id || idx} className="p-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-krishi-100 text-krishi-800 font-bold flex items-center justify-center text-xs">
                        {m.farmerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 flex items-center gap-1.5">
                          {m.farmerName}
                          {m.farmerId === selectedGroupDetails.creatorId && (
                            <span className="text-[9px] bg-harvest-100 text-harvest-800 px-1.5 py-0.2 rounded font-bold">
                              Organizer
                            </span>
                          )}
                          {currentUser && m.farmerId === currentUser.id && (
                            <span className="text-[9px] bg-krishi-100 text-krishi-800 px-1.5 py-0.2 rounded font-bold">
                              You
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-slate-500">Joined on {m.joinedAt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-slate-900">{m.requestedCapacity} MT</span>
                      <span className="block text-[11px] text-krishi-700 font-semibold">
                        Est. ₹{m.estimatedCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions based on membership */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              {currentUser && selectedGroupDetails.members.some(m => m.farmerId === currentUser.id) ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setLeaveConfirmGroup(selectedGroupDetails);
                      setSelectedGroupDetails(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Leave This Group
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFinalizeGroupBooking(selectedGroupDetails)}
                    className="px-5 py-2.5 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Finalize Demo Group Reservation
                  </button>
                </>
              ) : selectedGroupDetails.capacityTarget > selectedGroupDetails.capacityAllocated ? (
                <button
                  type="button"
                  onClick={() => {
                    const grp = selectedGroupDetails;
                    setSelectedGroupDetails(null);
                    setJoinModalGroup(grp);
                    setJoinCapacity(Math.min(15, grp.capacityTarget - grp.capacityAllocated));
                  }}
                  className="w-full py-3 rounded-xl bg-harvest-500 hover:bg-harvest-400 text-slate-950 font-extrabold text-xs shadow-sm transition-all"
                >
                  Join This Group Share
                </button>
              ) : (
                <span className="text-xs text-slate-500 font-semibold italic">
                  This storage group has reached full capacity.
                </span>
              )}
            </div>

          </div>
        </Modal>
      )}

      {/* 4. LEAVE CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={Boolean(leaveConfirmGroup)}
        onClose={() => setLeaveConfirmGroup(null)}
        onConfirm={handleConfirmLeave}
        title="Leave Storage Group"
        message={`Are you sure you want to withdraw your storage pledge from "${leaveConfirmGroup?.title}"? Other farmers will be able to claim your pledged capacity.`}
        confirmText="Confirm Leave"
        isDanger={true}
      />

    </div>
  );
};
