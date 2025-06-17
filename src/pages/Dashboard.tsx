import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import SoldesSynthese from '../components/dashboard/SoldesSynthese';
import ObjectifsPrioritaires from '../components/dashboard/ObjectifsPrioritaires';
import NotificationsRecentes from '../components/dashboard/NotificationsRecentes';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-800"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-2">
          Bienvenue ! Voici un aperçu de vos finances.
        </p>
      </div>

      {/* Première rangée : Synthèse, Objectifs, Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SoldesSynthese />
        <ObjectifsPrioritaires />
        <NotificationsRecentes />
      </div>

      {/* Deuxième rangée : Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Répartition des dépenses
          </h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-gray-500">Graphique à venir</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Dernières transactions
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600">€</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">Transaction {i}</p>
                    <p className="text-sm text-gray-500">Il y a {i} jour(s)</p>
                  </div>
                </div>
                <span className="font-medium text-red-600">-{i}50,00 €</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 