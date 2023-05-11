import React, { ReactNode } from 'react'

import { CurrencyFormat } from '../../shared/CurrencyFormat'
import { Table } from '../../shared/table/Table';

type FinancesPageProps = {
  label: string
  header?: ReactNode
}

export const FinancesPage: React.FC<FinancesPageProps> = (props) => {
  const monthly = 1234567890
  const yearly = 9876543210

  return <>
    <h2>{props.label}</h2>
    <Table headers={
      ['Cost Category', 'Total Monthly Expenses', 'Total Yearly Expenses']
    } rows={[
      ['Office Rentals',
        <CurrencyFormat value={monthly} />,
        <CurrencyFormat value={yearly} />
      ],
      ['Employee Salaries',
        <CurrencyFormat value={monthly} />,
        <CurrencyFormat value={yearly} />
      ],
      ['Employee Benefits',
        <CurrencyFormat value={monthly} />,
        <CurrencyFormat value={yearly} />
      ],
      ['Total Expenses',
        <CurrencyFormat value={monthly} />,
        <CurrencyFormat value={yearly} />
      ],
    ]} />     
  </>
}
