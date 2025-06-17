import api from './api';

export interface Compte {
  id: number;
  nom: string;
  soldeActuel: number;
  typeNom: string;
  typeId: number;
  description?: string;
  dateCreation: string;
  dateModification?: string;
}

export interface ComptesResponse {
  comptes: Compte[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  soldeTotalActuel: number;
}

export interface SyntheseMensuelle {
  soldeTotal: number;
  depensesMois: number;
  revenusMois: number;
  variationDepenses: number;
  variationRevenus: number;
}

const compteService = {
  async getComptes(): Promise<ComptesResponse> {
    try {
      const response = await api.get('/Comptes');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des comptes:', error);
      throw error;
    }
  },

  async getCompteById(id: number): Promise<Compte> {
    const response = await api.get(`/Comptes/${id}`);
    return response.data;
  },

  async createCompte(compte: Omit<Compte, 'id' | 'dateCreation' | 'dateModification'>): Promise<Compte> {
    const response = await api.post('/Comptes', compte);
    return response.data;
  },

  async updateCompte(id: number, compte: Partial<Compte>): Promise<Compte> {
    const response = await api.put(`/Comptes/${id}`, compte);
    return response.data;
  },

  async deleteCompte(id: number): Promise<void> {
    await api.delete(`/Comptes/${id}`);
  },

  async getSolde(id: number): Promise<number> {
    const response = await api.get(`/Comptes/${id}/solde`);
    return response.data;
  },

  async getSyntheseMensuelle(): Promise<SyntheseMensuelle> {
    const response = await api.get('/comptes/synthese-mensuelle');
    return response.data;
  },

  async getCompteDetails(id: number) {
    const response = await api.get(`/comptes/${id}`);
    return response.data;
  }
};

export default compteService; 