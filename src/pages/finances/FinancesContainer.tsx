import React, { ReactNode } from 'react'

import { CurrencyFormat } from '../../shared/CurrencyFormat'
import { Table } from '../../shared/table/table';

type FinancesContainerProps = {
  label: string
  header?: ReactNode
}

export const FinancesContainer: React.VFC<FinancesContainerProps> = (props) => {
  const monthly = 1234567890
  const yearly = 9876543210

  return <>
    <h2>{props.label}</h2>
    <Table headers={
      ['Cost Category', 'Total Monthly Expenses', 'Total Yearly Expenses']
    } rows={[
      ['Office Rentals',
        <CurrencyFormat value={monthly} displayType="text" thousandSeparator={true} prefix={'€'} />,
        <CurrencyFormat value={yearly} displayType={'text'} thousandSeparator={true} prefix={'€'} />
      ],
      ['Employee Salaries',
        <CurrencyFormat value={monthly} displayType="text" thousandSeparator={true} prefix={'€'} />,
        <CurrencyFormat value={yearly} displayType={'text'} thousandSeparator={true} prefix={'€'} />
      ],
      ['Employee Benefits',
        <CurrencyFormat value={monthly} displayType="text" thousandSeparator={true} prefix={'€'} />,
        <CurrencyFormat value={yearly} displayType={'text'} thousandSeparator={true} prefix={'€'} />
      ],
      ['Total Expenses',
        <CurrencyFormat value={monthly} displayType="text" thousandSeparator={true} prefix={'€'} />,
        <CurrencyFormat value={yearly} displayType={'text'} thousandSeparator={true} prefix={'€'} />
      ],
    ]} />     
  </>
}
