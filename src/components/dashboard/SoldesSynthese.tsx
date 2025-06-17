import React, { useEffect, useState } from 'react';
import compteService, { type ComptesResponse } from '../../services/compteService';

const SoldesSynthese: React.FC = () => {
  const [comptesData, setComptesData] = useState<ComptesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComptes = async () => {
      try {
        const data = await compteService.getComptes();
        console.log('Données des comptes reçues:', data);
        setComptesData(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des comptes:', err);
        setError('Erreur lors de la récupération des données');
      }
    };

    fetchComptes();
  }, []);

  const calculerSoldesParType = () => {
    if (!comptesData?.comptes) {
      console.log('Pas de données de comptes disponibles');
      return {};
    }
    console.log('Calcul des soldes par type avec les comptes:', comptesData.comptes);
    
    return comptesData.comptes.reduce((acc, compte) => {
      const solde = compte.soldeActuel;
      const type = compte.typeNom;
      console.log(`Traitement du compte - Type: ${type}, Solde: ${solde}`);
      
      if (!acc[type]) acc[type] = 0;
      acc[type] += solde;
      return acc;
    }, {} as Record<string, number>);
  };

  const soldesParType = calculerSoldesParType();
  console.log('Soldes calculés par type:', soldesParType);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Soldes</h2>
      {Object.entries(soldesParType).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(soldesParType).map(([type, solde]) => (
            <div key={type} className="flex justify-between items-center">
              <span className="font-medium">{type}</span>
              <span className={`font-bold ${solde >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {solde.toLocaleString('mg-MG', { style: 'currency', currency: 'MGA' })}
              </span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span className={`${(comptesData?.soldeTotalActuel ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(comptesData?.soldeTotalActuel ?? 0).toLocaleString('mg-MG', { style: 'currency', currency: 'MGA' })}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Aucune donnée disponible</p>
      )}
    </div>
  );
};

export default SoldesSynthese; 