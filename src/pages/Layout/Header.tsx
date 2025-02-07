import { Building2, Users, FolderKanban, DollarSign, Home, Pizza, Globe2, Server } from 'lucide-react';
import { NavItem } from './NavItem';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-[64px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Server className={`h-8 w-8 text-purple-600`} />
            <h1 className="text-xl font-bold text-gray-900">
              <NavLink to="/">ITCorpo</NavLink>
            </h1>
          </div>
          <nav className="flex space-x-4 px-3">
            <NavItem icon={<Home className="h-5 w-5" />} text="Home" to="/" />
            <NavItem icon={<DollarSign className="h-5 w-5" />} text="Finances" to="/finances" />
            <NavItem icon={<Users className="h-5 w-5" />} text="Employees" to="/employees" />
            <NavItem icon={<FolderKanban className="h-5 w-5" />} text="Projects" to="/projects" />
            <NavItem icon={<Building2 className="h-5 w-5" />} text="Offices" to="/offices" />
            <NavItem icon={<Pizza className="h-5 w-5" />} text="Benefits" to="/benefits" />
            <NavItem icon={<Globe2 className="h-5 w-5" />} text="Locations" to="/locations" />
          </nav>
        </div>
      </div>
    </header>
  );
}
