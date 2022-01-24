
import React, { ReactNode, useState, useEffect } from 'react'

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

export const BenefitContainer: React.VFC<BenefitContainerProps> = (props) => {
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [isLoading, setLoading] = useState(true)
  const [completedRate, setCompletedRate] = useState(0)
  const costs = 123456789

  useEffect(() => {
    getBenefits()
      .then((benefits) => {
        setBenefits(benefits)
        setLoading(false)
        setCompletedRate(1)
      })
  }, [])

  return <>
    <h2>{props.label}</h2>
    {isLoading && <Loader />}
    count: {benefits.length}
    {` `}
    ({to2(completedRate * 100)} %)
    <h3>costs: {<CurrencyFormat value={costs} displayType={'text'} thousandSeparator={true} prefix={'€'} />}</h3>
    {benefits &&
      <ol>
        {benefits.map(b =>
          <li key={b.id}><BenefitDetails benefit={b} /></li>)}
      </ol>
    }
  </>
}

