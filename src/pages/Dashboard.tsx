import { useState, useEffect } from 'react';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Layout from '../components/layout/Layout';

interface StatCardProps {
  title: string;
  amount: string;
  icon: React.ElementType;
  trend?: number;
  color: string;
}

function StatCard({ title, amount, icon: Icon, trend, color }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{amount}</h3>
          {trend !== undefined && (
            <p
              className={`flex items-center text-sm mt-2 ${
                trend >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend >= 0 ? (
                <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
              )}
              {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Solde total"
          amount="25 430,00 €"
          icon={BanknotesIcon}
          color="text-blue-600"
        />
        <StatCard
          title="Dépenses du mois"
          amount="1 240,00 €"
          icon={ArrowTrendingDownIcon}
          trend={-12}
          color="text-red-600"
        />
        <StatCard
          title="Revenus du mois"
          amount="3 800,00 €"
          icon={ArrowTrendingUpIcon}
          trend={8}
          color="text-green-600"
        />
        <StatCard
          title="Épargne"
          amount="12 350,00 €"
          icon={ChartBarIcon}
          trend={15}
          color="text-purple-600"
        />
      </div>

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
                    <BanknotesIcon className="w-6 h-6 text-gray-600" />
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