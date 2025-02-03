import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { H2 } from './components/Typography/Headings';
import { Layout } from './pages/Layout/Layout';
import { NotificationProvider } from './contexts/NotificationContext';
import { ToastProvider } from './contexts/ToastContext';
import { Fadebox } from './components/Generic/Fadebox';
import { Welcome } from './components/Welcome';
import { Locations } from './pages/Locations/Locations';
import { Dashboard } from './pages/Finances/Dashboard';
import { BenefitList } from './pages/Benefits/BenefitList';
import { BenefitChargesList } from './pages/Benefits/BenefitChargesList';
import { EmployeesList } from './pages/Employees/EmployeesList';
import { EmployeeDetails } from './pages/Employees/EmployeeDetails';
import { EmployeesPage } from './pages/Employees/EmployeesPage';
import { EditEmployee } from './pages/Employees/EditEmployee';
import { EmployeeProjects } from './pages/Employees/EmployeeProjects';
import { OfficeList } from './pages/Offices/OfficeList';
import { OfficeDetails } from './pages/Offices/OfficeDetails';
import { ProjectListing } from './pages/Projects/listing/ProjectListing';
import { ProjectDetails } from './pages/Projects/details/ProjectDetails';
import { ProjectPage } from './pages/Projects/ProjectPage';
import { ProjectEdit } from './pages/Projects/edit/ProjectEdit';
import { Error404 } from './Error404';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationProvider>
          <ToastProvider>
            {/* <EmployeeRoutes />
            <ProjectRoutes /> */}
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Welcome />} />

                <Route path="/employees" element={<EmployeesPage />}>
                  <Route index element={<Navigate to='/employees/active' />} />
                  <Route path="active" element={<EmployeesList group='ACTIVE' />} />
                  <Route path="departing" element={<EmployeesList group='DEPARTING' />} />
                  <Route path="involved" element={<EmployeesList group='INVOLVED' />} />
                  <Route path="jobless" element={<EmployeesList group='JOBLESS' />} />
                  <Route path="new-hires" element={<EmployeesList group='NEW_HIRES' />} />
                  <Route path="past" element={<EmployeesList group='PAST' />} />
                  <Route path=":id/details" element={<EmployeeDetails />} />
                  <Route path=":id/edit" element={<EditEmployee />} />
                  <Route path=":id/projects" element={<EmployeeProjects />} />
                </Route>

                <Route path="/projects" element={<ProjectPage />}>
                  <Route index element={<Navigate to='/projects/listing' />} />
                  <Route path="listing" element={<ProjectListing />} />
                  <Route path=":id/details" element={<ProjectDetails />} />
                  <Route path=":id/edit" element={<ProjectEdit />} />
                </Route>

                <Route path="/offices" element={<OfficeList />} />
                <Route path="/offices/:code" element={<OfficeDetails />} />

                <Route path="/benefits" element={<BenefitList />} />
                <Route path="/benefits/:id/charges" element={<BenefitChargesList />} />

                <Route path="/finances" element={<Dashboard />} />

                <Route path="/locations" element={<Locations />} />

                <Route path="*" element={<Error404 />} />
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
