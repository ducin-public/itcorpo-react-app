import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

interface NotificationBellProps {
  count?: number;
  to: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ count, to }) => {
  return (
    <Link to={to} className="relative">
      <Bell className="h-6 w-6 text-gray-600 hover:text-emerald-600" />
      {count !== undefined && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
};