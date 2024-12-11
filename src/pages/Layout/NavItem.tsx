import { NavLink } from 'react-router-dom';

export function NavItem({ icon, text, to }: { icon: React.ReactNode; text: string; to: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors ${
          isActive ? 'text-indigo-600' : ''
        }`
      }
    >
      {icon}
      <span className="font-medium">{text}</span>
    </NavLink>
  );
}
