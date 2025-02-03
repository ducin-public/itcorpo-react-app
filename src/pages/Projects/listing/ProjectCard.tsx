import { Eye, Edit, Trash2, Users, Calendar } from 'lucide-react';
import { formatDate } from 'date-fns/format';

import { projectStatusDict } from '../ProjectStatus';
import type { ProjectListingItem, ProjectStatus } from '../../../contract-types/data-contracts';
import { Chip } from '../../../components/Generic/Chip';
import { styles, VariantType } from '../../../components/DesignLanguage';

interface ProjectCardProps {
  project: ProjectListingItem;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const statusToVariant: Record<ProjectStatus, VariantType> = {
  'ACTIVE': 'ACCENT',
  'ON_HOLD': 'DEFAULT',
  'COMPLETED': 'SUCCESS',
  'PLANNING': 'UPDATE'
};

export function ProjectCard({ project, onView, onEdit, onDelete }: ProjectCardProps) {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {project.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={onView}
              className="text-gray-400 hover:text-purple-600"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={onEdit}
              className="text-gray-400 hover:text-purple-600"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-purple-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className={`flex items-center space-x-4 text-sm ${styles.DEFAULT.text}`}>
        <Chip 
          variant={statusToVariant[project.status]}
          size='SMALL'
        >{projectStatusDict[project.status]}</Chip>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{project.teamSize} members</span> {/* FIXME */}
        </div>
        {project.endDate && <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Due {formatDate(project.endDate, 'MMM d, yyyy')}</span>
        </div>}
      </div>
    </div>
  );
}