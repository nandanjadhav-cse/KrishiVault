import {
  INITIAL_USERS,
  INITIAL_WAREHOUSES,
  INITIAL_GROUPS,
  INITIAL_BOOKINGS,
  INITIAL_NOTIFICATIONS
} from '../data/sampleData';

const KEYS = {
  USERS: 'krishi_vault_users',
  WAREHOUSES: 'krishi_vault_warehouses',
  GROUPS: 'krishi_vault_groups',
  BOOKINGS: 'krishi_vault_bookings',
  NOTIFICATIONS: 'krishi_vault_notifications',
  CURRENT_USER: 'krishi_vault_current_user'
};

export const initStorage = () => {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(KEYS.WAREHOUSES)) {
    localStorage.setItem(KEYS.WAREHOUSES, JSON.stringify(INITIAL_WAREHOUSES));
  }
  if (!localStorage.getItem(KEYS.GROUPS)) {
    localStorage.setItem(KEYS.GROUPS, JSON.stringify(INITIAL_GROUPS));
  }
  if (!localStorage.getItem(KEYS.BOOKINGS)) {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
  }
  if (!localStorage.getItem(KEYS.NOTIFICATIONS)) {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    // Default logged in as farmer Ramesh Patil for immediate rich interactive experience
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
  }
};

export const getStoredItem = (key, fallback = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

export const setStoredItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage:`, e);
  }
};

export const resetAllDemoData = () => {
  localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
  localStorage.setItem(KEYS.WAREHOUSES, JSON.stringify(INITIAL_WAREHOUSES));
  localStorage.setItem(KEYS.GROUPS, JSON.stringify(INITIAL_GROUPS));
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
  return true;
};

export { KEYS };
