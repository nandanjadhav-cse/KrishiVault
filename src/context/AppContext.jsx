import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { initStorage, resetAllDemoData } from '../services/storageService';
import { authService } from '../services/authService';
import { notificationService } from '../services/notificationService';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { updateDocumentDirection } from '../i18n/index';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return i18n.language || localStorage.getItem('krishi_vault_lang') || 'en';
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [dataVersion, setDataVersion] = useState(1); // Increment to trigger re-reads

  // Listen to i18n language changes
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng);
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Initialize storage on mount
  useEffect(() => {
    initStorage();
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setUnreadCount(notificationService.getUnreadCount(user.id));
    }
  }, []);

  // Update unread count when user or data changes
  const refreshNotifications = useCallback(() => {
    if (currentUser) {
      setUnreadCount(notificationService.getUnreadCount(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    refreshNotifications();
  }, [currentUser, dataVersion, refreshNotifications]);

  // Toast notification system
  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    if (type === 'success') {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.85 }
        });
      } catch (e) {
        // silent fail if canvas not ready
      }
    }

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Auth actions
  const login = (emailOrPhone, password, role) => {
    try {
      const user = authService.login(emailOrPhone, password, role);
      setCurrentUser(user);
      showToast(`Welcome back, ${user.name}!`, 'success');
      return user;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const demoLogin = (role) => {
    const user = authService.demoLogin(role);
    setCurrentUser(user);
    showToast(`Switched to demo ${role === 'owner' ? 'Warehouse Owner' : 'Farmer'}: ${user.name}`, 'info');
    setDataVersion(v => v + 1);
    return user;
  };

  const register = (data) => {
    try {
      const user = authService.register(data);
      setCurrentUser(user);
      showToast(`Account created! Welcome, ${user.name}`, 'success');
      return user;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    showToast('Logged out of demo session.', 'info');
  };

  const updateProfile = (updates) => {
    try {
      const updated = authService.updateProfile(updates);
      setCurrentUser(updated);
      showToast('Profile updated successfully!', 'success');
      return updated;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  // Language switcher
  const changeLanguage = async (langCode) => {
    try {
      await i18n.changeLanguage(langCode);
      setCurrentLanguage(langCode);
      localStorage.setItem('krishi_vault_lang', langCode);
      updateDocumentDirection(langCode);
      if (currentUser && currentUser.preferredLanguage !== langCode) {
        authService.updateProfile({ preferredLanguage: langCode });
      }
      const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
      showToast(`Language set to ${langObj?.name || langCode} (${langObj?.nativeName || ''})`, 'info');
    } catch (err) {
      console.error('Failed to change language:', err);
    }
  };

  // Reset entire demo data
  const handleResetDemo = () => {
    resetAllDemoData();
    const defaultUser = authService.getCurrentUser();
    setCurrentUser(defaultUser);
    setDataVersion(v => v + 1);
    showToast('Demo data successfully restored to original factory state.', 'success');
  };

  const notifyDataChanged = () => {
    setDataVersion(v => v + 1);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        demoLogin,
        register,
        logout,
        updateProfile,
        unreadCount,
        refreshNotifications,
        changeLanguage,
        currentLanguage,
        showToast,
        dataVersion,
        notifyDataChanged,
        resetDemoData: handleResetDemo
      }}
    >
      {children}
      {/* Global Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-card text-sm font-medium transition-all transform translate-y-0 ${
              t.type === 'success'
                ? 'bg-krishi-800 text-white border-l-4 border-harvest-400'
                : t.type === 'error'
                ? 'bg-red-800 text-white border-l-4 border-red-400'
                : 'bg-slate-900 text-white border-l-4 border-krishi-400'
            }`}
          >
            <span>{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              className="ml-3 text-slate-300 hover:text-white text-base leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
