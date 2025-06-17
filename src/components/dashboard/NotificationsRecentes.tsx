import React, { useEffect, useState } from 'react';
import notificationService from '../../services/notificationService';
import type { Notification } from '../../services/notificationService';
import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const NotificationsRecentes: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await notificationService.getNotificationsNonLues();
        setNotifications(data.slice(0, 5)); // Prendre les 5 dernières notifications non lues
      } catch (err) {
        setError("Erreur lors du chargement des notifications");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'SUCCES':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'ALERTE':
        return <ExclamationCircleIcon className="h-6 w-6 text-red-500" />;
      case 'INFO':
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <BellIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const handleMarquerCommeLue = async (id: number) => {
    try {
      await notificationService.marquerCommeLue(id);
      setNotifications(notifications.filter(notif => notif.id !== id));
    } catch (err) {
      console.error("Erreur lors du marquage de la notification:", err);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-md p-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications Récentes</h2>
        <p className="text-gray-500 text-center py-4">Aucune notification non lue</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Notifications Récentes</h2>
        {notifications.length > 0 && (
          <button
            onClick={() => notificationService.marquerToutesCommeLues()}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-gray-900">{notification.titre}</h3>
              <p className="text-sm text-gray-500">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(notification.dateCreation).toLocaleDateString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <button
              onClick={() => handleMarquerCommeLue(notification.id)}
              className="flex-shrink-0 text-sm text-gray-400 hover:text-gray-600"
            >
              Marquer comme lu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsRecentes; 