import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import './App.css';

import { Home } from './pages/home/Home';
import { FinancesContainer } from './pages/finances/FinancesContainer';
import { OfficeContainer } from './pages/offices/OfficeContainer';
import { ProjectContainer } from './pages/projects/ProjectContainer';
import { EmployeeContainer } from './pages/employees/EmployeeContainer';
import { BenefitContainer } from './pages/benefits/BenefitContainer';

import { NavigationBar } from './shared/navigation-bar/NavigationBar';
import { FadeBox } from './shared/fadebox/fadebox';

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
          () => <FinancesContainer label="IT Corpo Finances" />
        } />
        <Route exact path="/offices" render={
          () => <OfficeContainer label="IT Corpo Offices" />
        } />
        <Route exact path="/projects" render={
          () => <ProjectContainer label="IT Corpo Projects" />
        } />
        <Route exact path="/employees" render={
          () => <EmployeeContainer label="IT Corpo Employees" />
        } />
        <Route exact path="/benefits" render={
          () => <BenefitContainer label="IT Corpo Benefits" />
        } />
      </div>
    </Router>
  );
}

export default App;
