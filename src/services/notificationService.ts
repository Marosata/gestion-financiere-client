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
    return response.data;
  },

  async deleteNotification(id: number): Promise<void> {
    await api.delete(`/Notifications/${id}`);
  },

  async marquerCommeLue(id: number): Promise<void> {
    await api.put(`/Notifications/${id}/lue`, {});
  },

  async verifierBudgets(): Promise<void> {
    await api.post('/Notifications/verifier-budgets');
  },

  async verifierSoldes(): Promise<void> {
    await api.post('/Notifications/verifier-soldes');
  }
};

export default notificationService; 