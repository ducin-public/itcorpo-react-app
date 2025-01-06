import { NavLink } from 'react-router-dom';

import { styles } from '../../components/DesignLanguage';

export function NavItem({ icon, text, to }: { icon: React.ReactNode; text: string; to: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 ${styles.DEFAULT.text} ${styles.ACCENT.textHover} transition-colors ${
          isActive ? styles.ACCENT.text : ''
        }`
      }
    >
      {icon}
      <span className="font-medium">{text}</span>
    </NavLink>
  );
}
