import React from 'react';
import { useToast } from '../contexts/ToastContext';
import { XCircle, AlertCircle, Info, Bell } from 'lucide-react';

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

export function Toast() {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  const Icon = icons[toast.type];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`flex items-center p-4 rounded-lg border ${colors[toast.type]} shadow-lg cursor-pointer`}
        onClick={hideToast}
      >
        <Icon className="h-5 w-5 mr-3" />
        <p className="font-medium">{toast.message}</p>
      </div>
    </div>
  );
}