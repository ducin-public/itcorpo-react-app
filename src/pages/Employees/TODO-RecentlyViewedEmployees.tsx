import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Generic/Button';
import { viewedEmployeesStore } from './ViewedEmployeesStore';
import { Trash } from 'lucide-react';

export const RecentlyViewedEmployees = observer(() => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recently Viewed Employees</h1>
        <Button
          icon={Trash}
          onClick={() => viewedEmployeesStore.clearViewedEmployees()}
        >
          Clear History
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {viewedEmployeesStore.viewedEmployees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/employees/${employee.id}`)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={employee.profileImage}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-600">{employee.position}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
});