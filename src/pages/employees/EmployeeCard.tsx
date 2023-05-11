import React, { useState, memo } from 'react'

import { Employee } from '../../api/dto'

import { CurrencyFormat } from '../../shared/CurrencyFormat'
import { EmployeeImage } from './EmployeeImage';
import { flag } from '../../providers/Country';

type EmployeeCardProps = {
  employee: Employee
  onBenefitClick: (e: Employee) => void
  onDeleteClick: (e: Employee) => void
  onMoneyClick: (e: Employee) => void
}

export const EmployeeCard = memo(
  ({ employee: e, onDeleteClick, onMoneyClick, onBenefitClick }: EmployeeCardProps) => {
    const [skillsDisplayed, setSkillsDisplayed] = useState(false)
    return <div>
      <h2>{e.firstName} {e.lastName}</h2>
      {e.title}
      <div>
        <EmployeeImage employee={e} />
      </div>
      <ul>
        <li>
          earning: <CurrencyFormat value={e.salary} />,
          {` `}
          {e.contractType}
        </li>
        <li>hired: { e.hiredAt.toLocaleString() }</li>
        <li>office: {e.office.join(', ')} {flag(e.nationality)}</li>
      </ul>

      <h3 style={{ cursor: "pointer" }} onClick={() => setSkillsDisplayed(!skillsDisplayed)}>Skills</h3> 
      <ul style={{ display: skillsDisplayed ? 'inherit' : 'none' }}>
        {e.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
      </ul>

      <a href={'mailto:' + e.personalInfo.email}>{e.personalInfo.email}</a>
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
  }
)