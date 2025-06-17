import api from './api';

export interface CompteSolde {
  id: number;
  nom: string;
  solde: number;
  type: string;
}

export interface SyntheseMensuelle {
  soldeTotal: number;
  depensesMois: number;
  revenusMois: number;
  variationDepenses: number;
  variationRevenus: number;
}

const compteService = {
  async getSoldes(): Promise<CompteSolde[]> {
    const response = await api.get('/comptes');
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