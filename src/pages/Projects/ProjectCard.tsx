import React, { useState } from 'react';
import { Edit, Trash2, Users, Eye } from 'lucide-react';
import { Project } from '../../types';
import { formatCurrency } from '../../mock-utils/format';

const statusColors = {
  'planning': 'bg-yellow-100 text-yellow-800',
  'active': 'bg-green-100 text-green-800',
  'completed': 'bg-blue-100 text-blue-800',
  'on-hold': 'bg-red-100 text-red-800'
};

export function ProjectCard({
  project,
  onView,
  onEdit,
  onDelete
}: {
  project: Project;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {project.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="text-sm text-gray-600">
                Budget: {formatCurrency(project.budget)}
              </span>
              <span className="text-sm text-gray-600 flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {project.employees.length} members
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onView}
              className="text-gray-400 hover:text-indigo-600"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={onEdit}
              className="text-gray-400 hover:text-indigo-600"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Team Members</h4>
            <div className="grid grid-cols-2 gap-4">
              {project.employees.map((employee) => (
                <div key={employee.id} className="flex items-center space-x-3">
                  <img
                    src={employee.profileImage}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{employee.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}