import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

interface Toast {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'notice';
}

interface ToastContextType {
  toast: Toast | null;
  showToast: (message: string, type: Toast['type']) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const hideToast = useCallback(() => {
    setToast(null);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  const showToast = useCallback((message: string, type: Toast['type']) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    setToast({ id: uuid(), message, type });

    const newTimeoutId = window.setTimeout(() => {
      hideToast();
    }, 5000);

    setTimeoutId(newTimeoutId);
  }, [hideToast, timeoutId]);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}