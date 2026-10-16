import { getStoredItem, setStoredItem, KEYS } from './storageService';
import { INITIAL_NOTIFICATIONS } from '../data/sampleData';

export const notificationService = {
  getAll() {
    return getStoredItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  getByUser(userId) {
    const list = this.getAll();
    return list.filter(n => n.userId === userId || n.userId === 'all');
  },

  getUnreadCount(userId) {
    const list = this.getByUser(userId);
    return list.filter(n => !n.read).length;
  },

  markAsRead(notificationId) {
    const list = this.getAll();
    const item = list.find(n => n.id === notificationId);
    if (item) {
      item.read = true;
      setStoredItem(KEYS.NOTIFICATIONS, list);
    }
    return list;
  },

  markAllAsRead(userId) {
    const list = this.getAll();
    list.forEach(n => {
      if (n.userId === userId || n.userId === 'all') {
        n.read = true;
      }
    });
    setStoredItem(KEYS.NOTIFICATIONS, list);
    return list;
  },

  deleteNotification(id) {
    const list = this.getAll();
    const filtered = list.filter(n => n.id !== id);
    setStoredItem(KEYS.NOTIFICATIONS, filtered);
    return filtered;
  },

  clearAllForUser(userId) {
    const list = this.getAll();
    const filtered = list.filter(n => n.userId !== userId && n.userId !== 'all');
    setStoredItem(KEYS.NOTIFICATIONS, filtered);
    return filtered;
  },

  createNotification(userId, title, message, type = 'system') {
    const list = this.getAll();
    const newNotif = {
      id: `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    list.unshift(newNotif);
    setStoredItem(KEYS.NOTIFICATIONS, list);
    return newNotif;
  }
};
