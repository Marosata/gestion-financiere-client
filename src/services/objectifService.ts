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
    const response = await api.get('/objectifs');
    return response.data;
  },

  async getObjectifById(id: number): Promise<Objectif> {
    const response = await api.get(`/objectifs/${id}`);
    return response.data;
  },

  async createObjectif(objectif: Omit<Objectif, 'id' | 'montantActuel' | 'pourcentageProgression' | 'dateCreation' | 'dateModification'>): Promise<Objectif> {
    const response = await api.post('/objectifs', objectif);
    return response.data;
  },

  async updateObjectif(id: number, objectif: Partial<Objectif>): Promise<Objectif> {
    const response = await api.put(`/objectifs/${id}`, objectif);
    return response.data;
  },

  async deleteObjectif(id: number): Promise<void> {
    await api.delete(`/objectifs/${id}`);
  },

  async contribuer(id: number, contribution: ContributionObjectif): Promise<Objectif> {
    const response = await api.post(`/objectifs/${id}/contribuer`, contribution);
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
    const response = await api.get('/objectifs/stats');
    return response.data;
  }
};

export default objectifService;