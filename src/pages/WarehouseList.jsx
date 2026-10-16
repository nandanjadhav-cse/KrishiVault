import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { warehouseService } from '../services/warehouseService';
import { WarehouseCard } from '../components/common/WarehouseCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  RotateCcw,
  Warehouse,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Star,
  Users,
  ArrowRight
} from 'lucide-react';

export const WarehouseList = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Params Initializers
  const initialQuery = searchParams.get('query') || '';
  const initialCrop = searchParams.get('crop') || '';
  const initialMinCapacity = searchParams.get('minCapacity') || '';

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCrop, setSelectedCrop] = useState(initialCrop);
  const [selectedStorageType, setSelectedStorageType] = useState('');
  const [maxRent, setMaxRent] = useState(700);
  const [minCapacity, setMinCapacity] = useState(initialMinCapacity ? Number(initialMinCapacity) : 0);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [visibleCount, setVisibleCount] = useState(6);

  // Available crops in dataset
  const cropsList = ['Onion', 'Wheat', 'Paddy / Basmati', 'Soybean', 'Cotton', 'Groundnut', 'Potato', 'Garlic', 'Chilli', 'Maize', 'Pulses'];

  // Filter warehouses dynamically
  const filteredWarehouses = useMemo(() => {
    return warehouseService.search({
      query: searchTerm,
      crop: selectedCrop,
      storageType: selectedStorageType,
      maxPrice: maxRent < 700 ? maxRent : null,
      minCapacity: minCapacity > 0 ? minCapacity : null,
      sortBy: sortBy
    });
  }, [searchTerm, selectedCrop, selectedStorageType, maxRent, minCapacity, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCrop('');
    setSelectedStorageType('');
    setMaxRent(700);
    setMinCapacity(0);
    setSortBy('recommended');
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    searchTerm || selectedCrop || selectedStorageType || maxRent < 700 || minCapacity > 0
  );

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-krishi-700 bg-krishi-100 px-3 py-1 rounded-full">
                Discovery & Booking
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                {t('warehouse.discoveryTitle')}
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {t('warehouse.discoverySubtitle')}
              </p>
            </div>

            {/* View Mode Toggle and Total Count */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-2 rounded-xl border border-slate-200">
                {filteredWarehouses.length} Warehouses Found
              </span>
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-krishi-800 text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-krishi-800 text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-card mb-8 space-y-4">
          
          {/* Top Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('warehouse.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-krishi-600 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            
            {/* Crop Select */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Crop
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="">All Crops</option>
                {cropsList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Storage Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Storage Type
              </label>
              <select
                value={selectedStorageType}
                onChange={(e) => setSelectedStorageType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="">All Types</option>
                <option value="onionStorage">Scientific Onion Chawl</option>
                <option value="grainSilo">Steel Grain Silo</option>
                <option value="coldStorage">Cold Storage (2°-8°C)</option>
                <option value="dryStorage">Pre-Engineered Dry Godown</option>
                <option value="multipurpose">Cooperative Multi-Commodity</option>
              </select>
            </div>

            {/* Max Rent Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Max Rent
                </label>
                <span className="text-xs font-bold text-krishi-700">
                  {maxRent >= 700 ? 'Any' : `≤ ₹${maxRent}/MT`}
                </span>
              </div>
              <input
                type="range"
                min="250"
                max="700"
                step="25"
                value={maxRent}
                onChange={(e) => setMaxRent(Number(e.target.value))}
                className="w-full accent-krishi-600 cursor-pointer"
              />
            </div>

            {/* Min Capacity */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Min Free Capacity
              </label>
              <select
                value={minCapacity}
                onChange={(e) => setMinCapacity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="0">Any Capacity</option>
                <option value="50">50+ MT Free</option>
                <option value="100">100+ MT Free</option>
                <option value="300">300+ MT Free</option>
                <option value="500">500+ MT Free</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-krishi-500"
              >
                <option value="recommended">Recommended</option>
                <option value="priceLow">Rent: Low to High</option>
                <option value="priceHigh">Rent: High to Low</option>
                <option value="capacity">Highest Available Space</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

          {/* Clear Filters bar */}
          {hasActiveFilters && (
            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
              <span className="text-slate-500">
                Active filters applied
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('warehouse.clearFilters')}</span>
              </button>
            </div>
          )}

        </div>

        {/* Warehouse Listings Container */}
        {filteredWarehouses.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-subtle max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Warehouse className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {t('warehouse.emptyTitle')}
            </h3>
            <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
              {t('warehouse.emptyDesc')}
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl bg-krishi-800 text-white font-bold text-xs hover:bg-krishi-700 transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWarehouses.slice(0, visibleCount).map((wh) => (
              <WarehouseCard key={wh.id} warehouse={wh} />
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredWarehouses.slice(0, visibleCount).map((wh) => {
              const percent = Math.round((wh.availableCapacity / wh.totalCapacity) * 100);
              return (
                <div
                  key={wh.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={wh.images[0]}
                      alt={wh.name}
                      className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-100"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-krishi-100 text-krishi-800">
                          {wh.storageTypeLabel}
                        </span>
                        {wh.wdraCertified && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-white flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-harvest-400" />
                            WDRA
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-800">
                          <Star className="w-3.5 h-3.5 text-harvest-500 fill-current" />
                          {wh.rating.toFixed(2)}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base">{wh.name}</h3>
                      <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-krishi-600 shrink-0" />
                        {wh.location}, {wh.state}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {wh.supportedCrops.map(c => (
                          <span key={c} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-slate-500 block">Monthly Rate</span>
                      <span className="text-lg font-extrabold text-slate-900">₹{wh.rentPerMonth}</span>
                      <span className="text-xs text-slate-500"> / MT</span>
                      <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                        {wh.availableCapacity} MT Free ({percent}%)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/marketplace?warehouse=${wh.id}`}
                        className="px-3 py-2 rounded-xl bg-harvest-100 hover:bg-harvest-200 text-harvest-900 text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Users className="w-3.5 h-3.5 text-harvest-700" />
                        <span>Groups</span>
                      </Link>
                      <Link
                        to={`/warehouses/${wh.id}`}
                        className="px-4 py-2 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <span>{t('warehouse.viewDetails')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredWarehouses.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-subtle hover:shadow-card transition-all"
            >
              {t('warehouse.loadMore')} ({filteredWarehouses.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
