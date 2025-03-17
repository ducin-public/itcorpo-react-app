import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

type NotificationType = 'error' | 'warning' | 'info' | 'notice';

export interface Notification {
  data: unknown
}

interface NotificationContextType {
  notifications: []
  addNotification: () => void
  removeNotification: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {

  return (
    <NotificationContext.Provider value={{
      notifications: [],
      removeNotification: () => {}
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return {
    notifications: [],
    removeNotification: () => {}
  }
}