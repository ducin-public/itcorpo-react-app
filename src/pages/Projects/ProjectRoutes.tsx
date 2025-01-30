import { Navigate, Route, Routes } from 'react-router-dom';

import { ProjectListing } from './listing/ProjectListing';
import { ProjectDetails } from './details/ProjectDetails';
import { ProjectPage } from './ProjectPage';

export function ProjectRoutes() {
  return <Routes>
    <Route path="/projects" element={<ProjectPage />}>
      <Route index element={<Navigate to='/projects/listing' />} />
      <Route path="listing" element={<ProjectListing />} />
      <Route path=":id/details" element={<ProjectDetails />} />
    </Route>
  </Routes>
}
