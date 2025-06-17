import React, { useEffect, useState } from 'react';
import objectifService from '../../services/objectifService';
import type { Objectif } from '../../services/objectifService';

const ObjectifsPrioritaires: React.FC = () => {
  const [objectifs, setObjectifs] = useState<Objectif[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObjectifs = async () => {
      try {
        setLoading(true);
        const data = await objectifService.getObjectifs();
        // Trier par priorité et prendre les 3 premiers
        const objectifsPrioritaires = data
          .filter(obj => obj.priorite === 'HAUTE')
          .sort((a, b) => {
            // D'abord par pourcentage de progression décroissant
            const progressionDiff = b.pourcentageProgression - a.pourcentageProgression;
            if (progressionDiff !== 0) return progressionDiff;
            // Ensuite par date cible croissante
            return new Date(a.dateCible).getTime() - new Date(b.dateCible).getTime();
          })
          .slice(0, 3);
        setObjectifs(objectifsPrioritaires);
      } catch (err) {
        setError("Erreur lors du chargement des objectifs");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchObjectifs();
  }, []);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('mg-MG', {
      style: 'currency',
      currency: 'MGA'
    }).format(montant);
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-md p-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
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

  if (objectifs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Objectifs Prioritaires</h2>
        <p className="text-gray-500 text-center py-4">Aucun objectif prioritaire défini</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Objectifs Prioritaires</h2>
      <div className="space-y-4">
        {objectifs.map((objectif) => (
          <div key={objectif.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{objectif.titre}</h3>
                <p className="text-sm text-gray-500">
                  Échéance : {new Date(objectif.dateCible).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <span className="text-sm font-medium text-blue-600">
                {objectif.montantActuel.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} 
                / 
                {objectif.montantCible.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                <div
                  style={{ width: `${objectif.pourcentageProgression}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
              <span className="text-xs text-gray-600 mt-1">
                {objectif.pourcentageProgression}% complété
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectifsPrioritaires; 