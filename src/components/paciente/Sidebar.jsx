import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Calendar, User, Brain } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Home', path: '/pacientes' },
  { icon: MessageCircle, label: 'Chat', path: '/pacientes/chats' },
  { icon: Calendar, label: 'Appointments', path: '/pacientes/citas' },
  { icon: User, label: 'Profile', path: '/pacientes/perfil' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 p-4 flex flex-col h-screen sticky top-0">
      <Link to="/" className="flex items-center mb-8">
        <Brain className="h-8 w-8 text-pink-600" />
        <span className="ml-2 text-xl font-bold text-pink-600">HealthyMind</span>
      </Link>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-lg rounded-full transition-colors ${
                isActive
                  ? 'bg-pink-100 text-pink-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-6 w-6 mr-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="w-full bg-pink-600 text-white rounded-full py-3 px-4 font-medium hover:bg-pink-700 transition-colors">
          New Post
        </button>
      </div>
    </div>
  );
}