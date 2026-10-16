import { getStoredItem, setStoredItem, KEYS } from './storageService';
import { INITIAL_GROUPS } from '../data/sampleData';
import { warehouseService } from './warehouseService';
import { notificationService } from './notificationService';

export const groupService = {
  getAll() {
    return getStoredItem(KEYS.GROUPS, INITIAL_GROUPS);
  },

  getById(id) {
    const list = this.getAll();
    return list.find(g => g.id === id) || null;
  },

  getByWarehouse(warehouseId) {
    const list = this.getAll();
    return list.filter(g => g.warehouseId === warehouseId);
  },

  createGroup(data, creator) {
    const warehouse = warehouseService.getById(data.warehouseId);
    if (!warehouse) throw new Error('Warehouse not found');

    const targetCap = Number(data.capacityTarget);
    const requestedCap = Number(data.initialCapacity || Math.min(20, targetCap));

    if (targetCap <= 0) {
      throw new Error('Target capacity must be greater than 0 MT.');
    }

    if (targetCap > warehouse.availableCapacity) {
      throw new Error(`Requested group target (${targetCap} MT) exceeds available warehouse space (${warehouse.availableCapacity} MT).`);
    }

    if (requestedCap > targetCap) {
      throw new Error('Your initial pledged capacity cannot exceed group target capacity.');
    }

    const duration = Number(data.durationMonths || 3);
    const rentRate = warehouse.rentPerMonth;

    // Calculate creator's cost
    const sharingMode = data.sharingMode || 'proportional';
    let estimatedCost = 0;
    if (sharingMode === 'proportional') {
      estimatedCost = requestedCap * rentRate * duration;
    } else {
      // equal share preview with 1 farmer initially
      estimatedCost = targetCap * rentRate * duration;
    }

    const newGroup = {
      id: `grp_${Date.now()}`,
      warehouseId: warehouse.id,
      warehouseName: warehouse.name,
      creatorId: creator.id,
      creatorName: creator.name,
      title: data.title || `${data.cropType || 'Crop'} Shared Bay Group`,
      cropType: data.cropType || 'Onion',
      location: warehouse.location,
      storageStartDate: data.storageStartDate || new Date().toISOString().split('T')[0],
      storageEndDate: data.storageEndDate || '',
      durationMonths: duration,
      capacityTarget: targetCap,
      capacityAllocated: requestedCap,
      sharingMode: sharingMode,
      rentPerMtMonth: rentRate,
      status: requestedCap >= targetCap ? 'full' : (requestedCap / targetCap >= 0.8 ? 'almostFull' : 'open'),
      description: data.description || `Shared storage group organized by ${creator.name} for ${data.cropType}.`,
      members: [
        {
          id: `mem_${Date.now()}`,
          farmerId: creator.id,
          farmerName: creator.name,
          farmerPhone: creator.phone || '',
          requestedCapacity: requestedCap,
          estimatedCost: estimatedCost,
          joinedAt: new Date().toISOString().split('T')[0],
          status: 'confirmed'
        }
      ]
    };

    const list = this.getAll();
    list.unshift(newGroup);
    setStoredItem(KEYS.GROUPS, list);

    // Simulated notification
    notificationService.createNotification(
      creator.id,
      'Group Created Successfully',
      `Your storage group "${newGroup.title}" is now open for other farmers in ${warehouse.location}.`,
      'group'
    );

    return newGroup;
  },

  joinGroup(groupId, farmer, requestedCapacity) {
    const list = this.getAll();
    const groupIndex = list.findIndex(g => g.id === groupId);
    if (groupIndex === -1) throw new Error('Storage group not found.');

    const group = list[groupIndex];
    const capacityToAdd = Number(requestedCapacity);

    if (capacityToAdd <= 0) {
      throw new Error('Please enter a valid capacity greater than 0 MT.');
    }

    // Check duplicate membership
    const alreadyMember = group.members.some(m => m.farmerId === farmer.id);
    if (alreadyMember) {
      throw new Error('You are already an active member of this storage group.');
    }

    // Check capacity limit
    const remaining = group.capacityTarget - group.capacityAllocated;
    if (capacityToAdd > remaining) {
      throw new Error(`Requested capacity (${capacityToAdd} MT) exceeds remaining unfilled capacity (${remaining} MT).`);
    }

    // Compute cost
    const duration = group.durationMonths;
    const rate = group.rentPerMtMonth;
    let cost = 0;

    if (group.sharingMode === 'proportional') {
      cost = capacityToAdd * rate * duration;
    } else {
      // Equal sharing recalculation
      const totalGroupCost = group.capacityTarget * rate * duration;
      const totalMembers = group.members.length + 1;
      cost = Math.round(totalGroupCost / totalMembers);
    }

    const newMember = {
      id: `mem_${Date.now()}`,
      farmerId: farmer.id,
      farmerName: farmer.name,
      farmerPhone: farmer.phone || '',
      requestedCapacity: capacityToAdd,
      estimatedCost: cost,
      joinedAt: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    };

    group.members.push(newMember);
    group.capacityAllocated += capacityToAdd;

    // If equal sharing, rebalance each member's estimated cost
    if (group.sharingMode === 'equal') {
      const perMemberCost = Math.round((group.capacityTarget * rate * duration) / group.members.length);
      group.members.forEach(m => {
        m.estimatedCost = perMemberCost;
      });
    }

    // Update status
    if (group.capacityAllocated >= group.capacityTarget) {
      group.status = 'full';
    } else if (group.capacityAllocated / group.capacityTarget >= 0.8) {
      group.status = 'almostFull';
    } else {
      group.status = 'open';
    }

    list[groupIndex] = group;
    setStoredItem(KEYS.GROUPS, list);

    // Notify joining farmer
    notificationService.createNotification(
      farmer.id,
      'Joined Storage Group',
      `You successfully joined "${group.title}" for ${capacityToAdd} MT of storage at ${group.warehouseName}.`,
      'group'
    );

    // Notify creator
    if (group.creatorId !== farmer.id) {
      notificationService.createNotification(
        group.creatorId,
        'New Member Joined Your Group',
        `${farmer.name} just joined your group "${group.title}" (${capacityToAdd} MT pledged).`,
        'group'
      );
    }

    return group;
  },

  leaveGroup(groupId, farmerId) {
    const list = this.getAll();
    const groupIndex = list.findIndex(g => g.id === groupId);
    if (groupIndex === -1) throw new Error('Storage group not found.');

    const group = list[groupIndex];
    const memberIndex = group.members.findIndex(m => m.farmerId === farmerId);
    if (memberIndex === -1) throw new Error('You are not a member of this group.');

    const leavingMember = group.members[memberIndex];
    group.capacityAllocated = Math.max(0, group.capacityAllocated - leavingMember.requestedCapacity);
    group.members.splice(memberIndex, 1);

    // If group became empty or only creator left
    if (group.capacityAllocated >= group.capacityTarget) {
      group.status = 'full';
    } else if (group.capacityAllocated / group.capacityTarget >= 0.8) {
      group.status = 'almostFull';
    } else {
      group.status = 'open';
    }

    list[groupIndex] = group;
    setStoredItem(KEYS.GROUPS, list);

    notificationService.createNotification(
      farmerId,
      'Left Storage Group',
      `You have left "${group.title}". Your storage pledge has been cancelled.`,
      'group'
    );

    return group;
  }
};
