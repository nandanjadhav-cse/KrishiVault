import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Star,
  ShieldCheck,
  PackageCheck,
  Users,
  ArrowRight,
  ThermometerSnowflake,
  Layers,
  CircleDot
} from 'lucide-react';

export const WarehouseCard = ({ warehouse }) => {
  const { t } = useTranslation();

  const getStorageBadge = (type) => {
    switch (type) {
      case 'coldStorage':
        return {
          label: 'Cold Storage (2°-8°C)',
          icon: <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-500" />,
          color: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'onionStorage':
        return {
          label: 'Onion Chawl',
          icon: <Layers className="w-3.5 h-3.5 text-amber-600" />,
          color: 'bg-amber-50 text-amber-800 border-amber-200'
        };
      case 'grainSilo':
        return {
          label: 'Galvanized Silo',
          icon: <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />,
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      default:
        return {
          label: 'Multi-Commodity Godown',
          icon: <Layers className="w-3.5 h-3.5 text-slate-600" />,
          color: 'bg-slate-50 text-slate-700 border-slate-200'
        };
    }
  };

  const badge = getStorageBadge(warehouse.type);
  const percentAvailable = Math.round((warehouse.availableCapacity / warehouse.totalCapacity) * 100);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group">
      {/* Warehouse Image & Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={warehouse.images[0]}
          alt={warehouse.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-sm ${badge.color}`}>
            {badge.icon}
            <span>{badge.label}</span>
          </span>
          {warehouse.wdraCertified && (
            <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-krishi-800 text-white shadow-sm border border-krishi-600">
              <ShieldCheck className="w-3 h-3 text-harvest-400" />
              <span>WDRA</span>
            </span>
          )}
        </div>

        {/* Rating overlay bottom left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg text-white text-xs font-bold">
          <Star className="w-3.5 h-3.5 text-harvest-400 fill-current" />
          <span>{warehouse.rating.toFixed(2)}</span>
          <span className="text-[10px] text-slate-300 font-normal">({warehouse.reviewsCount})</span>
        </div>

        {/* Status indicator bottom right */}
        <div className="absolute bottom-3 right-3">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-white/90 text-slate-800 backdrop-blur-sm">
            <span className={`w-2 h-2 rounded-full ${warehouse.availableCapacity > 50 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {warehouse.availableCapacity > 0 ? `${warehouse.availableCapacity} MT Free` : 'Fully Booked'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-krishi-700 transition-colors line-clamp-1">
              {warehouse.name}
            </h3>
          </div>

          <p className="flex items-center gap-1 text-xs text-slate-600 mb-3">
            <MapPin className="w-3.5 h-3.5 text-krishi-600 shrink-0" />
            <span className="truncate">{warehouse.location}, {warehouse.state}</span>
          </p>

          {/* Supported Crops */}
          <div className="flex flex-wrap gap-1 mb-4">
            {warehouse.supportedCrops.slice(0, 3).map((crop) => (
              <span
                key={crop}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
              >
                {crop}
              </span>
            ))}
            {warehouse.supportedCrops.length > 3 && (
              <span className="text-[10px] text-slate-600 font-semibold self-center">
                +{warehouse.supportedCrops.length - 3} more
              </span>
            )}
          </div>

          {/* Capacity Progress Bar */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-600">Available Storage</span>
              <span className="font-bold text-slate-800">
                {warehouse.availableCapacity} / {warehouse.totalCapacity} MT ({percentAvailable}%)
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentAvailable > 40
                    ? 'bg-krishi-600'
                    : percentAvailable > 15
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${percentAvailable}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-600 block">Monthly Rate</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-extrabold text-slate-900">₹{warehouse.rentPerMonth}</span>
              <span className="text-[11px] text-slate-600 font-medium">/ MT / Mo</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/marketplace?warehouse=${warehouse.id}`}
              className="p-2.5 rounded-xl bg-harvest-100 hover:bg-harvest-200 text-harvest-900 transition-colors"
              title="Explore shared group bookings at this warehouse"
            >
              <Users className="w-4 h-4 text-harvest-700" />
            </Link>
            <Link
              to={`/warehouses/${warehouse.id}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-krishi-800 hover:bg-krishi-700 text-white text-xs font-bold transition-all shadow-sm group/btn"
            >
              <span>{t('warehouse.viewDetails')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
