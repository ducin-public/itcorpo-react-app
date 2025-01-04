import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Layout } from './pages/Layout/Layout';
import { EmployeesList } from './pages/Employees/EmployeesList';
import { ProjectList } from './pages/Projects/ProjectList';
import { OfficeList } from './pages/Offices/OfficeList';
import { BenefitList } from './pages/Benefits/BenefitList';
import { Dashboard } from './pages/Finances/Dashboard';
import { EmployeeDetails } from './pages/Employees/EmployeeDetails';
import { ProjectDetails } from './pages/Projects/ProjectDetails';
import { OfficeDetails } from './pages/Offices/OfficeDetails';
import { RecentlyViewedEmployees } from './pages/Employees/TODO-RecentlyViewedEmployees';
import { NotificationProvider } from './contexts/NotificationContext';
import { ToastProvider } from './contexts/ToastContext';
import { Welcome } from './components/Welcome';
import { Fadebox } from './components/Generic/Fadebox';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: (error) =>
      // toast.error(`Something went wrong: ${error.message}`),
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Welcome />} />
                <Route path="/employees" element={<EmployeesList />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
                <Route path="/recently-viewed" element={<RecentlyViewedEmployees />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/offices" element={<OfficeList />} />
                <Route path="/offices/:id" element={<OfficeDetails />} />
                <Route path="/benefits" element={<BenefitList />} />
                <Route path="/finances" element={<Dashboard />} />
              </Route>
            </Routes>
          </ToastProvider>
        </NotificationProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
      <Fadebox>
        <div>Your content here</div>
      </Fadebox>
    </QueryClientProvider>
  );
}

export default App;