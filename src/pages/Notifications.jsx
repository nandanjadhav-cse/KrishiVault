import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { notificationService } from '../services/notificationService';
import {
  Bell,
  CheckCircle2,
  Trash2,
  CheckCheck,
  Users,
  Warehouse,
  FileText,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const Notifications = () => {
  const { t } = useTranslation();
  const { currentUser, dataVersion, notifyDataChanged, showToast } = useApp();

  const notifications = useMemo(() => {
    if (!currentUser) return [];
    return notificationService.getByUser(currentUser.id);
  }, [currentUser, dataVersion]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    notificationService.markAsRead(id);
    notifyDataChanged();
  };

  const handleMarkAllRead = () => {
    if (!currentUser) return;
    notificationService.markAllAsRead(currentUser.id);
    notifyDataChanged();
    showToast('All notifications marked as read.', 'info');
  };

  const handleDelete = (id) => {
    notificationService.deleteNotification(id);
    notifyDataChanged();
  };

  const handleClearAll = () => {
    if (!currentUser) return;
    notificationService.clearAllForUser(currentUser.id);
    notifyDataChanged();
    showToast('Notifications cleared.', 'info');
  };

  const handleSendTestNotification = () => {
    if (!currentUser) return;
    notificationService.createNotification(
      currentUser.id,
      'APMC Market Rate Alert',
      'Lasalgaon red onion mandi prices rose by ₹320/quintal today. Your stored lot is gaining value!',
      'system'
    );
    notifyDataChanged();
    showToast('Simulated notification triggered!', 'success');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'group':
        return <Users className="w-5 h-5 text-harvest-600" />;
      case 'booking':
        return <Warehouse className="w-5 h-5 text-krishi-600" />;
      case 'invoice':
        return <FileText className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {t('notifications.title')}
              </h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-500 text-white animate-pulse">
                  {unreadCount} {t('notifications.unread')}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t('notifications.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleSendTestNotification}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              title="Trigger simulated live mandi price notification"
            >
              <Sparkles className="w-3.5 h-3.5 text-harvest-600" />
              <span>Simulate Alert</span>
            </button>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-krishi-50 hover:bg-krishi-100 text-krishi-800 text-xs font-bold transition-colors border border-krishi-200"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>{t('notifications.markAllRead')}</span>
              </button>
            )}

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Clear all notifications"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-subtle">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">
              {t('notifications.empty')}
            </h3>
            <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
              You will receive instant alerts here whenever a farmer joins your storage group or a warehouse booking updates.
            </p>
            <button
              onClick={handleSendTestNotification}
              className="px-4 py-2 rounded-xl bg-krishi-800 text-white font-bold text-xs"
            >
              Trigger Demo Alert
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  notif.read
                    ? 'bg-white border-slate-200/80'
                    : 'bg-emerald-50/60 border-krishi-300 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shrink-0 shadow-sm mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs sm:text-sm font-bold ${notif.read ? 'text-slate-800' : 'text-krishi-950 font-black'}`}>
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-slate-600 flex items-center gap-1 pt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {!notif.read && (
                    <button
                      type="button"
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-krishi-700 hover:bg-krishi-100"
                      title="Mark as read"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(notif.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                    title="Dismiss notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
