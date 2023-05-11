
import React, { ReactNode } from 'react'

import { to2 } from '../../utils/math';

import { ProjectDetails } from './ProjectDetails';
import { Project } from '../../api/dto';
import { getProjects } from '../../api/ProjectApi';

import { Loader } from '../../shared/Loader';

type ProjectsPageProps = {
  label: string
  header?: ReactNode
}

type ProjectsPageState = {
  projects: Project[]
  loading: boolean
  completedRate: number
}

export class ProjectsPage extends React.Component<
  ProjectsPageProps,
  ProjectsPageState
>{
  state = {
    projects: [],
    loading: true,
    completedRate: 0
  } as ProjectsPageState

  componentDidMount(){
    getProjects()
      .then((projects) => this.setState({ projects, loading: false, completedRate: 1 }))
  }

  render(){
    return <>
      <h2>{this.props.label}</h2>
      {this.state.loading && <Loader />}
      count: {this.state.projects.length}
      {` `}
      ({to2(this.state.completedRate * 100)} %)
      {this.state.projects &&
        <ol>
          {this.state.projects.map(p =>
            <li key={p.id}><ProjectDetails project={p} /></li>)}
        </ol>
      }
    </>
  }
}

