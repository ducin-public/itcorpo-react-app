import { H3 } from '../../components/Typography/Headings';
import { employeeImageURL } from './employeeImageURL';
import { ViewedEmployee } from './viewedEmployee';

interface RecentlyViewedEmployeeTileProps {
  employee: ViewedEmployee;
  onClick: () => void;
}

export function RecentlyViewedEmployeeTile({ employee, onClick }: RecentlyViewedEmployeeTileProps) {
  return (
    <div
      className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img
          src={employeeImageURL(employee)}
          alt={`${employee.name}`}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <H3 className="text-lg mb-1 font-semibold text-gray-900">
            {employee.name}
          </H3>
          <p className="text-sm text-gray-600">{employee.position}</p>
        </div>
      </div>
    </div>
  );
}
