
import React, { ReactNode } from 'react'

import { OfficeDetails } from './OfficeDetails';
import { Office } from '../../api/dto';
import { getOffices } from '../../api/OfficeApi';

import { Loader } from '../../shared/Loader';

type OfficesPageProps = {
  label: string
  header?: ReactNode
}

type OfficesPageState = {
  offices: Office[]
  loading: boolean
}

export class OfficesPage extends React.Component<
  OfficesPageProps,
  OfficesPageState
>{
  state = {
    offices: [],
    loading: true,
  } as OfficesPageState

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

