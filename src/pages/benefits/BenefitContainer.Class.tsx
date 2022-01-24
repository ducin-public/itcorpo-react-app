
import React, { ReactNode } from 'react'

import { to2 } from '../../utils/math';

import { BenefitDetails } from './BenefitDetails';
import { Benefit } from '../../typedef';
import { getBenefits } from '../../api/BenefitApi';

import { Loader } from '../../shared/Loader';
import { CurrencyFormat } from '../../shared/CurrencyFormat';

type BenefitContainerProps = {
  label: string
  header?: ReactNode
}

type BenefitContainerState = {
  benefits: Benefit[]
  loading: boolean
  completedRate: number
}

export class BenefitContainer extends React.Component<
  BenefitContainerProps,
  BenefitContainerState
>{
  state = {
    benefits: [],
    loading: true,
    completedRate: 0
  } as BenefitContainerState

  costs = 123456789

  componentDidMount(){
    getBenefits()
      .then((benefits) => this.setState({ benefits, loading: false, completedRate: 1 }))
  }

  render(){
    return <>
      <h2>{this.props.label}</h2>
      {this.state.loading && <Loader />}
      count: {this.state.benefits.length}
      {` `}
      ({to2(this.state.completedRate * 100)} %)
      <h3>costs: {<CurrencyFormat value={this.costs} displayType={'text'} thousandSeparator={true} prefix={'€'} />}</h3>
      {this.state.benefits &&
        <ol>
          {this.state.benefits.map(b =>
            <li key={b.id}><BenefitDetails benefit={b} /></li>)}
        </ol>
      }
    </>
  }
}

