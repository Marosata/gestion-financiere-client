import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CreditCardIcon,
  ChartPieIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth.slice';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'Rapports', href: '/rapports', icon: ChartPieIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Paramètres', href: '/parametres', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      } min-h-screen p-4 flex flex-col`}
    >
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed && (
          <h1 className="text-xl font-bold">Finance Manager</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <svg
            className={`w-6 h-6 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'bg-indigo-700 text-white'
                    : 'hover:bg-indigo-700'
                }`}
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center p-3 rounded-lg hover:bg-indigo-700 transition-colors mt-auto"
      >
        <ArrowLeftOnRectangleIcon className="w-6 h-6" />
        {!isCollapsed && <span className="ml-3">Déconnexion</span>}
      </button>
    </div>
  );
} 