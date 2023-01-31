import React, { ReactNode, useEffect, useState } from 'react'

import { to2 } from '../../utils/math';

import { EmployeeRow } from './EmployeeRow';
import { Employee } from '../../typedef';
import { getEmployees } from '../../api/EmployeeApi';

import { Loader } from '../../shared/Loader';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { CurrencyFormat } from '../../shared/CurrencyFormat';

type EmployeeContainerProps = {
  label: string
  header?: ReactNode
}

export const EmployeeContainer: React.VFC<EmployeeContainerProps> = (props) => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setLoading] = useState(true)
  const [completedRate, setCompletedRate] = useState(0)
  const [displayAdditionalSummaries, setDisplayAdditionalSummaries] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  // implement "reload" button

  useEffect(() => {
    getEmployees()
      .then((employees) => {
        setEmployees(employees)
        setLoading(false)
        setCompletedRate(1)
      })
  }, [])

  const onEmployeeBenefitClicked = (e: Employee) => {
    console.log('🍕', e)
  }

  const onEmployeeDeleted = (e: Employee) => {
    console.log('☠️️️', e)
  }

  const onEmployeeMoneyBumped = (e: Employee) => {
    console.log('💰', e)
  }

  const calculateTotalSalary = () => {
    return employees.reduce((sum, e) => sum + e.salary, 0)
  }

  const toggleDisplayAdditionalSummaries = () => {
    setDisplayAdditionalSummaries(display => !display)
  }

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(collapsed => !collapsed)
  }

  return <>
    <h2>{props.label}</h2>
    <Sidebar
      collapsed={sidebarCollapsed}
      onCloseClick={toggleSidebarCollapsed}>
        RECENTLY VIEWED EMPLOYEES DISPLAYED HERE
    </Sidebar>
    {/* <RoundButton onClick={this.toggleSidebarCollapsed} /> */}
    <span className="icon" role="img" aria-label="toggle sidebar" onClick={toggleSidebarCollapsed}>📖</span>

    {isLoading && <Loader />}
    count: {employees.length}
    {` `}
    ({to2(completedRate * 100)} %)
    <input id="displaySummary" type="checkbox" onClick={toggleDisplayAdditionalSummaries} />
    <label htmlFor="displaySummary">display additional costs</label>
    <ul>
      <li>monthly salary cost: {` `}
        <CurrencyFormat value={calculateTotalSalary()} /></li>
      {displayAdditionalSummaries && <>
        <li>quarterly salary cost: {` `}
          <CurrencyFormat value={calculateTotalSalary() * 3} /></li>
        <li>yearly salary cost: {` `}
          <CurrencyFormat value={calculateTotalSalary() * 12} /></li>
      </>}
    </ul>
    {employees &&
      <ol>
      {employees.map(e =>
        <li key={e.id}><EmployeeRow employee={e}
          onBenefitClick={onEmployeeBenefitClicked}
          onDeleteClick={onEmployeeDeleted}
          onMoneyClick={onEmployeeMoneyBumped}  
        /></li>)}
      </ol>
    }
  </>
}
