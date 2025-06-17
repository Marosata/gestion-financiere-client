import api from './api';

export interface Notification {
  id: number;
  titre: string;
  message: string;
  type: 'INFO' | 'ALERTE' | 'SUCCES' | 'ERREUR';
  dateCreation: string;
  lue: boolean;
  lienId?: number;
  lienType?: string;
}

const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get('/Notifications');
    console.log(response)
    return response.data;
  },

  async getNotificationsNonLues(): Promise<Notification[]> {
    const response = await api.get('/notifications/non-lues');
    return response.data;
  },

  async marquerCommeLue(id: number): Promise<void> {
    await api.put(`/notifications/${id}/lue`);
  },

  async marquerToutesCommeLues(): Promise<void> {
    await api.put('/notifications/marquer-toutes-lues');
  },

  async supprimerNotification(id: number): Promise<void> {
    await api.delete(`/notifications/${id}`);
  }
};

export default notificationService; 