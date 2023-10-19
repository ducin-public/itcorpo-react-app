import React, { ReactNode } from 'react'

import { to2 } from '../../utils/math';

import { EmployeeRow } from './EmployeeRow';
import { Employee } from '../../api/dto';
import { getEmployees } from '../../api/EmployeeApi';

import { Loader } from '../../shared/Loader';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CurrencyFormat } from '../../shared/CurrencyFormat';

type EmployeesPageProps = {
  label: string
  header?: ReactNode
}

type EmployeesPageState = {
  employees: Employee[]
  loading: boolean
  completedRate: number
  displayAdditionalSummaries: boolean
  sidebarCollapsed: boolean
}

export class EmployeesPage extends React.Component<
  EmployeesPageProps,
  EmployeesPageState
>{
  state = {
    employees: [],
    loading: true,
    completedRate: 0,
    displayAdditionalSummaries: false,
    sidebarCollapsed: true
  } as EmployeesPageState

  componentDidMount(){
    getEmployees()
      .then((employees) => this.setState({ employees, loading: false, completedRate: 1 }))
  }

  onEmployeeBenefitClicked(e: Employee){
    console.log('🍕', e)
  }

  onEmployeeDeleted(e: Employee){
    console.log('☠️️️', e)
  }

  onEmployeeMoneyBumped(e: Employee){
    console.log('💰', e)
  }

  calculateTotalSalary() {
    return this.state.employees.reduce((sum, e) => sum + e.salary, 0)
  }

  toggleDisplayAdditionalSummaries = () => {
    this.setState(state => ({
      ...state,
      displayAdditionalSummaries: !state.displayAdditionalSummaries
    }))
  }

  toggleSidebarCollapsed = () => {
    this.setState(state => ({ sidebarCollapsed: !state.sidebarCollapsed }))
  }

  render(){
    return <>
      <h2>{this.props.label}</h2>
      <Sidebar
        collapsed={this.state.sidebarCollapsed}
        onCloseClick={this.toggleSidebarCollapsed}>
          RECENTLY VIEWED EMPLOYEES DISPLAYED HERE
      </Sidebar>
      {/* <RoundButton onClick={this.toggleSidebarCollapsed} /> */}
      <span className="icon" role="img" aria-label="toggle sidebar" onClick={this.toggleSidebarCollapsed}>📖</span>

      {this.state.loading && <Loader />}
      count: {this.state.employees.length}
      {` `}
      ({to2(this.state.completedRate * 100)} %)
      <input id="displaySummary" type="checkbox" onClick={this.toggleDisplayAdditionalSummaries} />
      <label htmlFor="displaySummary">display additional costs</label>
      <ul>
        <li>monthly salary cost: {` `}
          <CurrencyFormat value={this.calculateTotalSalary()} /></li>
        {this.state.displayAdditionalSummaries && <>
          <li>quarterly salary cost: {` `}
            <CurrencyFormat value={this.calculateTotalSalary() * 3} /></li>
          <li>yearly salary cost: {` `}
            <CurrencyFormat value={this.calculateTotalSalary() * 12} /></li>
        </>}
      </ul>
      {this.state.employees &&
        <ol>
        {this.state.employees.map(e =>
          <li key={e.id}><EmployeeRow employee={e}
            onBenefitClick={this.onEmployeeBenefitClicked}
            onDeleteClick={this.onEmployeeDeleted}
            onMoneyClick={this.onEmployeeMoneyBumped}  
          /></li>)}
        </ol>
      }
    </>
  }
}
