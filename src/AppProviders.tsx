import { BrowserRouter } from 'react-router-dom';

import { NotificationProvider } from './components/Notifications/NotificationContext';

type AppProviderProps = {
    children: React.ReactNode;
}

export function AppProviders({ children }: AppProviderProps){
  return (
    <BrowserRouter>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </BrowserRouter>
  );
}
