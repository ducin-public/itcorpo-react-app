import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format, formatDistance } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

import { formatCurrency } from '../../../contexts/CurrencyContext';
import { EditableProjectName } from './EditableProjectName';
import { ProjectTeamMembers } from './ProjectTeamMembers';
import { ProjectStatusChange } from './ProjectStatusChange';
import { Spinner } from '../../../components/Generic/Spinner';
import { DetailsSection } from '../../../components/Generic/DetailsSection';
import { ActionButtons } from '../../../components/Generic/ActionButtons';
import { projectTeamQuery } from '../../../api/ProjectQueries';

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: projectInvolvement, isLoading: isLoading } = useQuery(projectTeamQuery(id!));

  if (isLoading) return <Spinner />;
  if (!projectInvolvement) return null;

  const { project, team } = projectInvolvement;

  const projectDetailsLines = [
    {
      label: 'Budget',
      value: formatCurrency(project.budget)
    },
    {
      label: 'Start Date',
      value: format(new Date(project.startDate), 'MMM d, yyyy')
    },
    ...(project.endDate ? [{
      label: 'End Date',
      value: format(new Date(project.endDate), 'MMM d, yyyy')
    }] : []),
    {
      label: 'Duration',
      value: formatDistance(new Date(project.startDate), new Date(project.endDate || new Date()))
    },
  ];

  const teamMembersLines = [
    {
      label: 'Total Team Members',
      value: team.length
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">

          <ActionButtons
            actions={[{
              icon: ArrowLeft,
              text: 'Back to Project Search',
              onClick: () => navigate(`/projects`)
            }]}
            className="mb-4"
          />

          <div className="flex justify-between items-start mb-6">
            <EditableProjectName id={project.id} name={project.name} />
          </div>

          <p className="text-gray-600 mb-6">{project.description}</p>

          <div className="grid grid-cols-2 gap-6 mb-2">
            <DetailsSection
              title="Project Details"
              lines={projectDetailsLines}
            />
            <DetailsSection
              title="Team Members"
              lines={teamMembersLines}
            />
          </div>
          <div className="py-4">
            <ProjectStatusChange project={project} />
          </div>

          {team && (
            <ProjectTeamMembers
              project={projectInvolvement.project}
              team={projectInvolvement.team}
            />
          )}
        </div>
      </div>
    </div>
  );
}