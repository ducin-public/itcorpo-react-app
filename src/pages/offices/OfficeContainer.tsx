
import React, { ReactNode, useState, useEffect } from 'react'

import { OfficeDetails } from './OfficeDetails';
import { Office } from '../../typedef';
import { getOffices } from '../../api/OfficeApi';

import { Loader } from '../../shared/Loader';

type OfficeContainerProps = {
  label: string
  header?: ReactNode
}

export const OfficeContainer: React.VFC<OfficeContainerProps> = (props) => {
  const [offices, setOffices] = useState<Office[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getOffices()
      .then((offices) => {
        setOffices(offices)
        setLoading(false)
      })
  }, [])

  return <>
    <h2>{props.label}</h2>
    {isLoading && <Loader />}
    count: {offices.length}
    {offices &&
      <ol>
        {offices.map(p =>
          <li key={p.city}><OfficeDetails office={p} /></li>)}
      </ol>
    }
  </>
}

