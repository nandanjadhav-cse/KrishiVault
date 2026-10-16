import { getStoredItem, setStoredItem, KEYS } from './storageService';
import { INITIAL_USERS } from '../data/sampleData';

export const authService = {
  getCurrentUser() {
    return getStoredItem(KEYS.CURRENT_USER, INITIAL_USERS[0]);
  },

  setCurrentUser(user) {
    setStoredItem(KEYS.CURRENT_USER, user);
  },

  login(emailOrPhone, password, role) {
    const users = getStoredItem(KEYS.USERS, INITIAL_USERS);
    const trimmed = emailOrPhone.trim().toLowerCase();
    
    // Find matching user (demo authentication)
    let found = users.find(u => 
      (u.email.toLowerCase() === trimmed || u.phone === trimmed) &&
      (!role || u.role === role)
    );

    if (!found) {
      // If role matches one of our demo seeds, use that demo seed
      found = users.find(u => u.role === role);
    }

    if (!found) {
      throw new Error('User not found. Please check your credentials or use the demo login buttons.');
    }

    setStoredItem(KEYS.CURRENT_USER, found);
    return found;
  },

  demoLogin(role = 'farmer') {
    const users = getStoredItem(KEYS.USERS, INITIAL_USERS);
    const target = users.find(u => u.role === role) || (role === 'owner' ? INITIAL_USERS[1] : INITIAL_USERS[0]);
    setStoredItem(KEYS.CURRENT_USER, target);
    return target;
  },

  register(userData) {
    const users = getStoredItem(KEYS.USERS, INITIAL_USERS);
    const existing = users.find(u => u.email.toLowerCase() === userData.email.trim().toLowerCase());
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role || 'farmer',
      preferredLanguage: userData.preferredLanguage || 'en',
      location: userData.location || 'Maharashtra, India',
      crops: userData.crops || ['Wheat', 'Gram'],
      farmSize: userData.farmSize || '5 Acres',
      companyName: userData.companyName || '',
      gstin: userData.gstin || '',
      avatar: userData.role === 'owner' 
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
        : 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80'
    };

    users.push(newUser);
    setStoredItem(KEYS.USERS, users);
    setStoredItem(KEYS.CURRENT_USER, newUser);
    return newUser;
  },

  updateProfile(updates) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('Not logged in');

    const users = getStoredItem(KEYS.USERS, INITIAL_USERS);
    const updatedUser = { ...currentUser, ...updates };

    const newUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    setStoredItem(KEYS.USERS, newUsers);
    setStoredItem(KEYS.CURRENT_USER, updatedUser);
    return updatedUser;
  },

  logout() {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
};
