import { XCircle, AlertCircle, Info, Bell } from 'lucide-react';

import { useNotifications } from './NotificationContext';
import { cn } from '../cn';

const icons = {
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  notice: Bell,
};

const colors = {
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  notice: 'bg-green-50 text-green-800 border-green-200',
};

export function Notifications() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 flex flex-col items-end w-1/2">
      {notifications.map((notification) => {
        const Icon = icons[notification.type];
        return (
          <div
            key={notification.id}
            className={cn(
              `flex items-center p-4 rounded-lg border shadow-lg w-fit max-w-full`,
              colors[notification.type]
            )}
          >
            <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <p className="font-medium">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 hover:opacity-75"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
