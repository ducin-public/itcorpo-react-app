import React from 'react';
import { Building2, Users, FolderKanban, Heart, DollarSign, Home } from 'lucide-react';
import { NavItem } from './NavItem';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              <NavLink to="/">ITCorpo React</NavLink>
            </h1>
          </div>
          <nav className="flex space-x-6">
            <NavItem icon={<Home className="h-5 w-5" />} text="Home" to="/" />
            <NavItem icon={<DollarSign className="h-5 w-5" />} text="Finances" to="/finances" />
            <NavItem icon={<Users className="h-5 w-5" />} text="Employees" to="/employees" />
            <NavItem icon={<FolderKanban className="h-5 w-5" />} text="Projects" to="/projects" />
            <NavItem icon={<Building2 className="h-5 w-5" />} text="Offices" to="/offices" />
            <NavItem icon={<Heart className="h-5 w-5" />} text="Benefits" to="/benefits" />
          </nav>
        </div>
      </div>
    </header>
  );
}
