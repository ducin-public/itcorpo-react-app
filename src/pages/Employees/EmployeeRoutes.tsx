import { Navigate, Route, Routes } from 'react-router-dom';

import { EmployeesList } from './EmployeesList';
import { EmployeeDetails } from './EmployeeDetails';
import { EmployeesPage } from './EmployeesPage';
import { EditEmployee } from './EditEmployee';
import { EmployeeProjects } from './EmployeeProjects';

export function EmployeeRoutes() {
  return <Routes>
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
  </Routes>
}
