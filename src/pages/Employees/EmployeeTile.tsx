import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

import type { Employee } from '../../contract-types/data-contracts';
import { EmployeeSkills } from './EmployeeSkills';
import { Text } from '../../components/Typography/Text';
import { EmployeeCard } from './listing/EmployeeCard';
import { formatCurrency } from '../../contexts/CurrencyContext';
import { A } from '../../components/Typography/A';
import { formatDate, formatDistance } from 'date-fns';
import { SpinnerOverlay } from '../../components/Generic/SpinnerOverlay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee } from '../../api/EmployeeApi.axios';
import { useNotifications } from '../../components/Notifications/NotificationContext';

interface EmployeeTileProps {
  employee: Employee;
  onEdit: () => void;
  // onDelete: () => void;
  footer?: React.ReactNode;
}

export function EmployeeTile({
  employee,
  onEdit,
  // onDelete,
  footer
}: EmployeeTileProps) {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const deleteMutation = useMutation({
    mutationKey: ['employee', 'delete'],
    mutationFn: ({ employeeId }: { employeeId: Employee['id'], name: string }) =>
      deleteEmployee({ employeeId }),
    onSuccess: (_result, { employeeId, name }) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.removeQueries({ queryKey: ['employees', employeeId] });
      addNotification('notice', `Employee ${name} deleted successfully`);
    },
    onError: (err) => {
      addNotification('error', `Failed to delete employee: ${err.message}`);
    }
  });

  return (
    <SpinnerOverlay size="LARGE" align='CENTER' overlay={deleteMutation.isPending}>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">

          <EmployeeCard employee={employee} size="SMALL" />

          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="text-gray-400 hover:text-indigo-600"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => deleteMutation.mutate({
                employeeId: employee.id,
                name: employee.name
              })}
              className="text-gray-400 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <Text size='SMALL' className='block'><strong>monthly salary</strong>:&nbsp;
            {formatCurrency(employee.employment.currentSalary)}
          </Text>
          <Text size='SMALL' className='block'><strong>e-mail</strong>:&nbsp;
            <A size='SMALL' href={`mailto:${employee.email}`}>{employee.email}</A>
          </Text>
          <Text size='SMALL' className='block'><strong>office</strong>:&nbsp;
            {employee.office}
          </Text>
          <Text size='SMALL' className='block'><strong>employment</strong>:&nbsp;
            {formatDate(new Date(employee.employment.startDate), 'MMM dd, yyyy')} -&nbsp;
            {employee.employment.endDate ?
              formatDate(new Date(employee.employment.endDate), 'MMM dd, yyyy') : 'present'}
          </Text>
          <Text size='SMALL' className='block'>(total:&nbsp;
            {formatDistance(new Date(employee.employment.startDate), new Date(employee.employment.endDate || new Date()))}
          )
          </Text>
        </div>

        <div className="mt-4">
          <EmployeeSkills skills={employee.skills} expanded={false} collapseAbove={3} />
        </div>

        {footer || null}
      </div>
    </SpinnerOverlay>
  );
}
