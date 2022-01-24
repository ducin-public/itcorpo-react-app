import React from 'react'

import { Project } from '../../typedef'

import { CurrencyFormat } from '../../shared/CurrencyFormat';
import ProjectImage from './ProjectImage';

type ProjectDetailsProps = {
  project: Project
}

export const ProjectDetails =
  ({ project: p }: ProjectDetailsProps) => <div>
    <strong>{p.name}</strong>
    {` `}
    (<CurrencyFormat value={p.budget} displayType={'text'} thousandSeparator={true} prefix={'€'} />)
      <div>
      {p.description}
    </div>
    <div>
      <ProjectImage project={p} />
    </div>
  </div>
