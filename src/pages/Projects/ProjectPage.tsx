import { Outlet } from 'react-router-dom';
import { ProjectSearchProvider } from './search/ProjectSearchContext';

export const ProjectPage = () => {
  return <ProjectSearchProvider>
    <Outlet />
  </ProjectSearchProvider>
};
