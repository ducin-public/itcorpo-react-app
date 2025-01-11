import { Edit, Trash2 } from 'lucide-react';
import type { Employee } from '../../contract-types/data-contracts';
import { Button } from '../../components/Generic/Button';
import { employeeImageURL } from './employeeImageURL';
import { EmployeeSkills } from './EmployeeSkills';

interface EmployeeCardProps {
  employee: Employee;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function EmployeeCard({
  employee,
  onView,
  onEdit,
  onDelete
}: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={employeeImageURL(employee)}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-600">{employee.title}</p>
          </div>
        </div>
        <div className="flex space-x-2">
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

      <div className="mt-4">
        <p className="text-sm text-gray-600">{employee.email}</p>
        <p className="text-sm text-gray-600">{employee.department}</p>
      </div>

      <div className="mt-4">
        <EmployeeSkills skills={employee.skills} expanded={false} collapseAbove={3} />
      </div>

      <Button
        onClick={onView}
        className="mt-4"
      >
        View Details
      </Button>
    </div>
  );
}
