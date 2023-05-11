import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './pages/home/Home';
import { FinancesPage } from './pages/finances/FinancesPage';
import { OfficesPage } from './pages/offices/OfficesPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { EmployeesPage } from './pages/employees/EmployeesPage';
import { BenefitsPage } from './pages/benefits/BenefitsPage';

import { NavigationBar } from './layout/navigation-bar/NavigationBar';
import { FadeBox } from './shared/fadebox/Fadebox';

function App() {
  return (
    <Router>
      <div>
        <strong>IT Corpo React App</strong>
      </div>
      <div className="App">
        <FadeBox>
          notification message goes here
        </FadeBox>

        <NavigationBar />

        <Route exact path="/" component={Home} />
        <Route exact path="/finances" render={
          () => <FinancesPage label="IT Corpo Finances" />
        } />
        <Route exact path="/offices" render={
          () => <OfficesPage label="IT Corpo Offices" />
        } />
        <Route exact path="/projects" render={
          () => <ProjectsPage label="IT Corpo Projects" />
        } />
        <Route exact path="/employees" render={
          () => <EmployeesPage label="IT Corpo Employees" />
        } />
        <Route exact path="/benefits" render={
          () => <BenefitsPage label="IT Corpo Benefits" />
        } />
      </div>
    </Router>
  );
}

export default App;
