
import React, { ReactNode } from 'react'

import { OfficeDetails } from './OfficeDetails';
import { Office } from '../../typedef';
import { getOffices } from '../../api/OfficeApi';

import { Loader } from '../../shared/Loader';

type OfficeContainerProps = {
  label: string
  header?: ReactNode
}

type OfficeContainerState = {
  offices: Office[]
  loading: boolean
}

export class OfficeContainer extends React.Component<
  OfficeContainerProps,
  OfficeContainerState
>{
  state = {
    offices: [],
    loading: true,
  } as OfficeContainerState

  componentDidMount(){
    getOffices()
      .then((offices) => this.setState({ offices, loading: false }))
  }

  render(){
    return <>
      <h2>{this.props.label}</h2>
      {this.state.loading && <Loader />}
      count: {this.state.offices.length}
      {this.state.offices &&
        <ol>
          {this.state.offices.map(p =>
            <li key={p.city}><OfficeDetails office={p} /></li>)}
        </ol>
      }
    </>
  }
}

