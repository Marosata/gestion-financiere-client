import api from './api';

export interface Objectif {
  id: number;
  titre: string;
  montantCible: number;
  montantActuel: number;
  dateCible: string;
  dateDebut: string;
  categorieId?: number;
  categorieNom?: string;
  compteId: number;
  compteNom: string;
  statut: string;
  priorite: string;
  description?: string;
  pourcentageProgression: number;
  dateCreation: string;
  dateModification?: string;
}

export interface ContributionObjectif {
  montant: number;
  description?: string;
}

const objectifService = {
  async getObjectifs(): Promise<Objectif[]> {
    const response = await api.get('/Objectifs');
    return response.data;
  },

  async getObjectifById(id: number): Promise<Objectif> {
    const response = await api.get(`/Objectifs/${id}`);
    return response.data;
  },

  async createObjectif(objectif: Omit<Objectif, 'id' | 'montantActuel' | 'pourcentageProgression' | 'dateCreation' | 'dateModification'>): Promise<Objectif> {
    const response = await api.post('/Objectifs', objectif);
    return response.data;
  },

  async updateObjectif(id: number, objectif: Partial<Objectif>): Promise<Objectif> {
    const response = await api.put(`/Objectifs/${id}`, objectif);
    return response.data;
  },

  async deleteObjectif(id: number): Promise<void> {
    await api.delete(`/Objectifs/${id}`);
  },

  async contribuer(id: number, contribution: ContributionObjectif): Promise<Objectif> {
    const response = await api.post(`/Objectifs/${id}/contribuer`, contribution);
    return response.data;
  },

  async getStats(): Promise<{
    totalObjectifs: number;
    objectifsEnCours: number;
    objectifsAtteints: number;
    objectifsEnRetard: number;
    montantTotalCible: number;
    montantTotalActuel: number;
    pourcentageGlobalProgression: number;
  }> {
    const response = await api.get('/Objectifs/stats');
    return response.data;
  }
};

export default objectifService;