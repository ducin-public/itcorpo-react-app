import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';

import { Button } from '../../components/Generic/Button';
import { viewedEmployeesStore } from './ViewedEmployeesStore';
import { RecentlyViewedEmployeeTile } from './RecentlyViewedEmployeeTile';

export const RecentlyViewedEmployees = observer(() => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Button
          size='SMALL'
          variant='DEFAULT'
          fill='OUTLINED'
          icon={Trash}
          onClick={() => viewedEmployeesStore.clearViewedEmployees()}
        >
          Clear History
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
        {viewedEmployeesStore.getViewedEmployees().map((employee) => (
          <RecentlyViewedEmployeeTile
            key={employee.id}
            employee={employee}
            onClick={() => navigate(`/employees/${employee.id}/details`)}
          />
        ))}
      </div>
    </div>
  );
});