import { getStoredItem, setStoredItem, KEYS } from './storageService';
import { INITIAL_BOOKINGS } from '../data/sampleData';
import { warehouseService } from './warehouseService';
import { notificationService } from './notificationService';

export const bookingService = {
  getAll() {
    return getStoredItem(KEYS.BOOKINGS, INITIAL_BOOKINGS);
  },

  getByFarmer(farmerId) {
    const list = this.getAll();
    return list.filter(b => b.farmerId === farmerId);
  },

  getByOwner(ownerId) {
    const warehouses = warehouseService.getOwnerWarehouses(ownerId);
    const warehouseIds = new Set(warehouses.map(w => w.id));
    const list = this.getAll();
    return list.filter(b => warehouseIds.has(b.warehouseId));
  },

  createDirectBooking(data, farmer) {
    const warehouse = warehouseService.getById(data.warehouseId);
    if (!warehouse) throw new Error('Warehouse not found');

    const capacity = Number(data.allocatedCapacity || data.capacity);
    if (capacity <= 0) {
      throw new Error('Please enter a valid storage capacity in metric tonnes.');
    }

    if (capacity > warehouse.availableCapacity) {
      throw new Error(`Requested capacity (${capacity} MT) exceeds current available warehouse capacity (${warehouse.availableCapacity} MT).`);
    }

    const duration = Number(data.durationMonths || 3);
    const rentRate = warehouse.rentPerMonth;
    const totalCost = capacity * rentRate * duration;

    const stateCode = warehouse.state ? warehouse.state.substring(0, 2).toUpperCase() : 'IN';
    const receiptNum = `KV-${stateCode}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      id: `bk_${Date.now()}`,
      farmerId: farmer.id,
      farmerName: farmer.name,
      farmerPhone: farmer.phone || '',
      warehouseId: warehouse.id,
      warehouseName: warehouse.name,
      groupId: data.groupId || null,
      cropType: data.cropType || 'Foodgrains',
      allocatedCapacity: capacity,
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      endDate: data.endDate || '',
      durationMonths: duration,
      rentPerMonth: rentRate,
      totalCost: totalCost,
      status: 'active', // simulated confirmed booking
      isGroupBooking: Boolean(data.groupId),
      groupTitle: data.groupTitle || 'Individual Warehouse Booking',
      createdAt: new Date().toISOString(),
      receiptNumber: receiptNum
    };

    const list = this.getAll();
    list.unshift(newBooking);
    setStoredItem(KEYS.BOOKINGS, list);

    // Deduct available capacity from warehouse
    warehouseService.deductCapacity(warehouse.id, capacity);

    // Notify farmer
    notificationService.createNotification(
      farmer.id,
      'Booking Confirmed',
      `Your booking for ${capacity} MT of ${newBooking.cropType} at ${warehouse.name} has been confirmed. Receipt: ${receiptNum}.`,
      'booking'
    );

    // Notify owner
    notificationService.createNotification(
      warehouse.ownerId,
      'New Warehouse Bay Booked',
      `${farmer.name} has booked ${capacity} MT of storage at ${warehouse.name} (${receiptNum}).`,
      'booking'
    );

    return newBooking;
  },

  updateStatus(bookingId, status) {
    const list = this.getAll();
    const booking = list.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    const oldStatus = booking.status;
    booking.status = status;

    // If cancelled or rejected from active, restore warehouse capacity
    if (oldStatus === 'active' && (status === 'cancelled' || status === 'rejected')) {
      warehouseService.restoreCapacity(booking.warehouseId, booking.allocatedCapacity);
    } else if (oldStatus !== 'active' && status === 'active') {
      warehouseService.deductCapacity(booking.warehouseId, booking.allocatedCapacity);
    }

    setStoredItem(KEYS.BOOKINGS, list);

    // Notify farmer
    notificationService.createNotification(
      booking.farmerId,
      `Booking Status Updated: ${status.toUpperCase()}`,
      `Your booking for ${booking.allocatedCapacity} MT at ${booking.warehouseName} is now ${status}.`,
      'booking'
    );

    return booking;
  }
};
