import { Routes, Route, Navigate } from 'react-router-dom';

import { IndexPage } from './pages/Index/IndexPage';
import { Layout } from './pages/Layout/Layout';
import { DashboardPage } from './pages/Finances/DashboardPage';
import { BenefitList } from './pages/Benefits/listing/BenefitList';
import { BenefitChargesList } from './pages/Benefits/BenefitChargesList';
import { EmployeesList } from './pages/Employees/listing/EmployeesList';
import { EmployeeDetails } from './pages/Employees/EmployeeDetails';
import { EmployeesPage } from './pages/Employees/EmployeesPage';
import { EditEmployee } from './pages/Employees/edit/EditEmployee';
import { EmployeeProjects } from './pages/Employees/EmployeeProjects';
import { OfficeList } from './pages/Offices/listing/OfficeList';
import { OfficeDetails } from './pages/Offices/details/OfficeDetails';
import { ProjectListing } from './pages/Projects/listing/ProjectListing';
import { ProjectDetails } from './pages/Projects/details/ProjectDetails';
import { ProjectPage } from './pages/Projects/ProjectPage';
import { ProjectEdit } from './pages/Projects/edit/ProjectEdit';
import { LocationsPage } from './pages/Locations/LocationsPage';
import { Error404 } from './Error404';

export function AppRoutes() {
    return (<Routes>
      {/* <EmployeeRoutes /> */}
      {/* <ProjectRoutes /> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />

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

        <Route path="/finances" element={<DashboardPage />} />

        <Route path="/locations" element={<LocationsPage />} />

        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
