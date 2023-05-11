
import React, { ReactNode, useState, useEffect } from 'react'

import { to2 } from '../../utils/math';

import { ProjectDetails } from './ProjectDetails';
import { Project } from '../../api/dto';
import { getProjects } from '../../api/ProjectApi';

import { Loader } from '../../shared/Loader';

type ProjectsPageProps = {
  label: string
  header?: ReactNode
}

export const ProjectsPage: React.FC<ProjectsPageProps> = (props) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setLoading] = useState(true)
  const [completedRate, setCompletedRate] = useState(0)

  useEffect(() => {
    getProjects()
      .then((projects) => {
        setProjects(projects)
        setLoading(false)
        setCompletedRate(1)
      })
  }, [])

  return <>
    <h2>{props.label}</h2>
    {isLoading && <Loader />}
    count: {projects.length}
    {` `}
    ({to2(completedRate * 100)} %)
    {projects &&
      <ol>
        {projects.map(p =>
          <li key={p.id}><ProjectDetails project={p} /></li>)}
      </ol>
    }
  </>
}

