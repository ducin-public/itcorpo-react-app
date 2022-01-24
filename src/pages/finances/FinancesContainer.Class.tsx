import React, { ReactNode } from 'react'

import { CurrencyFormat } from '../../shared/CurrencyFormat'
import { Table } from '../../shared/table/table';

type FinancesContainerProps = {
  label: string
  header?: ReactNode
}

type FinancesContainerState = {
}

export class FinancesContainer extends React.Component<
  FinancesContainerProps,
  FinancesContainerState
>{
  monthly = 1234567890
  yearly = 9876543210

  render(){
    return <>
      <h2>{this.props.label}</h2>
      <Table headers={
        ['Cost Category', 'Total Monthly Expenses', 'Total Yearly Expenses']
      } rows={[
        ['Office Rentals',
          <CurrencyFormat value={this.monthly} displayType="text" thousandSeparator={true} prefix={'€'} />,
          <CurrencyFormat value={this.yearly} displayType={'text'} thousandSeparator={true} prefix={'€'} />
        ],
        ['Employee Salaries',
          <CurrencyFormat value={this.monthly} displayType="text" thousandSeparator={true} prefix={'€'} />,
          <CurrencyFormat value={this.yearly} displayType={'text'} thousandSeparator={true} prefix={'€'} />
        ],
        ['Employee Benefits',
          <CurrencyFormat value={this.monthly} displayType="text" thousandSeparator={true} prefix={'€'} />,
          <CurrencyFormat value={this.yearly} displayType={'text'} thousandSeparator={true} prefix={'€'} />
        ],
        ['Total Expenses',
          <CurrencyFormat value={this.monthly} displayType="text" thousandSeparator={true} prefix={'€'} />,
          <CurrencyFormat value={this.yearly} displayType={'text'} thousandSeparator={true} prefix={'€'} />
        ],
      ]} />     
    </>
  }
}
