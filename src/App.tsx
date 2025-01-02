import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Layout } from './pages/Layout/Layout';
import { Employees } from './pages/Employees/Employees';
import { Projects } from './pages/Projects';
import { OfficeList } from './pages/Offices/OfficeList';
import { Benefits } from './pages/Benefits';
import { Finances } from './pages/Finances';
import { EmployeeDetails } from './pages/Employees/EmployeeDetails';
import { ProjectDetails } from './pages/Projects/ProjectDetails';
import { OfficeDetails } from './pages/Offices/OfficeDetails';
import { RecentlyViewedEmployees } from './pages/RecentlyViewedEmployees';
import { NotificationProvider } from './contexts/NotificationContext';
import { ToastProvider } from './contexts/ToastContext';
import { Welcome } from './components/Welcome';
import { FadeBox } from './components/fadebox/fadebox';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Welcome />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
                <Route path="/recently-viewed" element={<RecentlyViewedEmployees />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/offices" element={<OfficeList />} />
                <Route path="/offices/:id" element={<OfficeDetails />} />
                <Route path="/benefits" element={<Benefits />} />
                <Route path="/finances" element={<Finances />} />
              </Route>
            </Routes>
          </ToastProvider>
        </NotificationProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
      <FadeBox>
        <div>Your content here</div>
      </FadeBox>
    </QueryClientProvider>
  );
}

export default App;