import React, { useEffect, useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import compteService from '../../services/compteService';
import type { SyntheseMensuelle } from '../../services/compteService';

const SoldesSynthese: React.FC = () => {
  const [synthese, setSynthese] = useState<SyntheseMensuelle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSynthese = async () => {
      try {
        setLoading(true);
        const data = await compteService.getSyntheseMensuelle();
        setSynthese(data);
      } catch (err) {
        setError("Erreur lors du chargement des données financières");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSynthese();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-md p-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
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

  if (!synthese) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Synthèse Financière</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">Solde Total</h3>
          <p className="text-2xl font-bold text-blue-700">
            {synthese.soldeTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">Revenus du Mois</h3>
          <div className="flex items-center">
            <p className="text-2xl font-bold text-green-700">
              {synthese.revenusMois.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </p>
            {synthese.variationRevenus !== 0 && (
              <span className={`ml-2 flex items-center ${synthese.variationRevenus > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {synthese.variationRevenus > 0 ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                <span className="text-sm ml-1">{Math.abs(synthese.variationRevenus)}%</span>
              </span>
            )}
          </div>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-sm font-medium text-red-600">Dépenses du Mois</h3>
          <div className="flex items-center">
            <p className="text-2xl font-bold text-red-700">
              {synthese.depensesMois.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </p>
            {synthese.variationDepenses !== 0 && (
              <span className={`ml-2 flex items-center ${synthese.variationDepenses < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {synthese.variationDepenses < 0 ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )}
                <span className="text-sm ml-1">{Math.abs(synthese.variationDepenses)}%</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldesSynthese; 