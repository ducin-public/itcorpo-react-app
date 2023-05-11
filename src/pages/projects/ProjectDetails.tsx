import { Project } from '../../api/dto'

import { CurrencyFormat } from '../../shared/CurrencyFormat';
import ProjectImage from './ProjectImage';

type ProjectDetailsProps = {
  project: Project
}

export const ProjectDetails =
  ({ project: p }: ProjectDetailsProps) => <div>
    <strong>{p.name}</strong>
    {` `}
    (<CurrencyFormat value={p.budget} />)
      <div>
      {p.description}
    </div>
    <div>
      <ProjectImage project={p} />
    </div>
  </div>
