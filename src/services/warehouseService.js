import { getStoredItem, setStoredItem, KEYS } from './storageService';
import { INITIAL_WAREHOUSES } from '../data/sampleData';

export const warehouseService = {
  getAll() {
    return getStoredItem(KEYS.WAREHOUSES, INITIAL_WAREHOUSES);
  },

  getById(id) {
    const list = this.getAll();
    return list.find(w => w.id === id) || null;
  },

  getOwnerWarehouses(ownerId) {
    const list = this.getAll();
    return list.filter(w => w.ownerId === ownerId);
  },

  search({ query = '', crop = '', storageType = '', maxPrice = null, minCapacity = null, sortBy = 'recommended' }) {
    let list = this.getAll();

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(w => 
        w.name.toLowerCase().includes(q) ||
        w.location.toLowerCase().includes(q) ||
        w.district?.toLowerCase().includes(q) ||
        w.state?.toLowerCase().includes(q) ||
        w.supportedCrops.some(c => c.toLowerCase().includes(q))
      );
    }

    if (crop) {
      list = list.filter(w => 
        w.supportedCrops.some(c => c.toLowerCase().includes(crop.toLowerCase()))
      );
    }

    if (storageType) {
      list = list.filter(w => w.type === storageType);
    }

    if (maxPrice !== null && maxPrice > 0) {
      list = list.filter(w => w.rentPerMonth <= maxPrice);
    }

    if (minCapacity !== null && minCapacity > 0) {
      list = list.filter(w => w.availableCapacity >= minCapacity);
    }

    // Sorting
    switch (sortBy) {
      case 'priceLow':
        list.sort((a, b) => a.rentPerMonth - b.rentPerMonth);
        break;
      case 'priceHigh':
        list.sort((a, b) => b.rentPerMonth - a.rentPerMonth);
        break;
      case 'capacity':
        list.sort((a, b) => b.availableCapacity - a.availableCapacity);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // recommended: high rating + available capacity
        list.sort((a, b) => (b.rating * 100 + b.availableCapacity) - (a.rating * 100 + a.availableCapacity));
        break;
    }

    return list;
  },

  create(data, ownerId) {
    const list = this.getAll();
    const totalCap = Number(data.totalCapacity);
    const availableCap = Number(data.availableCapacity ?? data.totalCapacity);

    if (availableCap > totalCap) {
      throw new Error('Available capacity cannot exceed total warehouse capacity.');
    }

    const newWarehouse = {
      id: `wh_${Date.now()}`,
      ownerId: ownerId || 'user_owner_1',
      name: data.name,
      type: data.type || 'multipurpose',
      storageTypeLabel: data.storageTypeLabel || 'Agricultural Storage',
      location: data.location,
      district: data.district || data.location.split(',')[0]?.trim() || '',
      state: data.state || 'Maharashtra',
      address: data.address || data.location,
      totalCapacity: totalCap,
      availableCapacity: availableCap,
      rentPerMonth: Number(data.rentPerMonth),
      rating: 5.0,
      reviewsCount: 1,
      wdraCertified: Boolean(data.wdraCertified ?? true),
      wdraRegNumber: data.wdraRegNumber || `WDRA/IN/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
      supportedCrops: Array.isArray(data.supportedCrops) ? data.supportedCrops : (data.supportedCrops || '').split(',').map(s => s.trim()).filter(Boolean),
      facilities: Array.isArray(data.facilities) ? data.facilities : [
        'CCTV Surveillance & Manned Guard',
        'Electronic Weighbridge Access',
        'Certified Pest Management',
        'Transit Insurance Protection'
      ],
      images: data.images?.length ? data.images : [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
      ],
      status: 'available',
      description: data.description || 'Newly added verified agricultural storage facility on Krishi Vault.',
      contactPhone: data.contactPhone || '+91 98200 00000'
    };

    list.unshift(newWarehouse);
    setStoredItem(KEYS.WAREHOUSES, list);
    return newWarehouse;
  },

  update(id, updates) {
    const list = this.getAll();
    const index = list.findIndex(w => w.id === id);
    if (index === -1) throw new Error('Warehouse not found');

    const current = list[index];
    const total = Number(updates.totalCapacity ?? current.totalCapacity);
    const available = Number(updates.availableCapacity ?? current.availableCapacity);

    if (available > total) {
      throw new Error('Available capacity cannot be greater than total capacity.');
    }

    const updated = {
      ...current,
      ...updates,
      totalCapacity: total,
      availableCapacity: available,
      rentPerMonth: Number(updates.rentPerMonth ?? current.rentPerMonth)
    };

    list[index] = updated;
    setStoredItem(KEYS.WAREHOUSES, list);
    return updated;
  },

  delete(id) {
    const list = this.getAll();
    const filtered = list.filter(w => w.id !== id);
    setStoredItem(KEYS.WAREHOUSES, filtered);
    return true;
  },

  deductCapacity(warehouseId, amount) {
    const list = this.getAll();
    const wh = list.find(w => w.id === warehouseId);
    if (!wh) return;

    wh.availableCapacity = Math.max(0, wh.availableCapacity - amount);
    setStoredItem(KEYS.WAREHOUSES, list);
  },

  restoreCapacity(warehouseId, amount) {
    const list = this.getAll();
    const wh = list.find(w => w.id === warehouseId);
    if (!wh) return;

    wh.availableCapacity = Math.min(wh.totalCapacity, wh.availableCapacity + amount);
    setStoredItem(KEYS.WAREHOUSES, list);
  }
};
