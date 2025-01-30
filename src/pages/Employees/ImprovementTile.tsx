import { useNavigate } from 'react-router-dom';
import { format, formatDistance } from 'date-fns';
import { LayoutList } from 'lucide-react';

import { ActionButtons } from '../../components/Generic/ActionButtons';
import { ProjectEmployeeInvolvement } from '../../contract-types/data-contracts';
import { engagementLevelDict } from './EmployeeDictionaries';
import { DetailsSection } from '../../components/Generic/DetailsSection';

interface InvolvementTileProps {
  involvement: ProjectEmployeeInvolvement;
}

export const InvolvementTile = ({ involvement }: InvolvementTileProps) => {
  const navigate = useNavigate();
  const startDate = new Date(involvement.startDate);
  const endDate = involvement.endDate ? new Date(involvement.endDate) : null;
  const duration = formatDistance(startDate, endDate || new Date());

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start">
        <DetailsSection
          title="Project Details"
          lines={[
            { label: 'Project Name', value: involvement.projectName },
            { label: 'Role', value: engagementLevelDict[involvement.engagementLevel] },
            { label: 'Since', value: format(startDate, 'MMM d, yyyy') },
            { label: 'Duration', value: duration },
            ...(endDate ? [{ label: 'Until', value: format(endDate, 'MMM d, yyyy') }] : []),
          ]}
        />
        
        <ActionButtons
          actions={[{
            icon: LayoutList,
            text: 'Project Details',
            onClick: () => navigate(`/projects/${involvement.projectId}`),
          }]}
        />
      </div>
    </div>
  );
};
