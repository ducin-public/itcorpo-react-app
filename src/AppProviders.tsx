import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { NotificationProvider } from './components/Notifications/NotificationContext';
import { useRef } from 'react';

type AppProviderProps = {
    children: React.ReactNode;
}

export function AppProviders({ children }: AppProviderProps){
  const queryClient = useRef(new QueryClient())

  return (
    <QueryClientProvider client={queryClient.current}>
      <BrowserRouter>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
