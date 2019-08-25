import React from 'react'

import { Employee } from '../../typedef'

import { EmployeeThumbnailImage } from './EmployeeImage'
import { CurrencyFormat } from '../../shared/CurrencyFormat'

type EmployeeDetailsProps = {
  employee: Employee
  onBenefitClick: (e: Employee) => void
  onDeleteClick: (e: Employee) => void
  onMoneyClick: (e: Employee) => void
}

export const EmployeeDetails =
  ({ employee: e, onBenefitClick, onDeleteClick, onMoneyClick }: EmployeeDetailsProps) => <div>
    <EmployeeThumbnailImage employee={e} />
    {e.firstName} {e.lastName},
    {` `}
    {e.title}
    {` `}
    (<CurrencyFormat value={e.salary} displayType={'text'} thousandSeparator={true} prefix={'€'} />)
    <div>
      <button onClick={() => onBenefitClick(e)}>
        <span role="img" aria-label="benefits">🍕</span>
      </button>
      <button onClick={() => onDeleteClick(e)}>
        <span role="img" aria-label="delete">☠️</span>
      </button>
      <button onClick={() => onMoneyClick(e)}>
        <span role="img" aria-label="money">💰</span>
      </button>
    </div>
  </div>
