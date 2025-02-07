import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployeeById, updateEmployee } from '../../../api/EmployeeApi.axios';
import { EmployeeEditForm } from './EmployeeEditForm';
import { Spinner } from '../../../components/Generic/Spinner';
import { useNotifications } from '../../../components/Notifications/NotificationContext';
import type { Employee } from '../../../contract-types/data-contracts';
import { employeeDetailsQuery } from '../../../api/EmployeeQueries';
import { SpinnerOverlay } from '../../../components/Generic/SpinnerOverlay';

export const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id!)
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { data: employee, isLoading } = useQuery(employeeDetailsQuery(employeeId));

  const updateMutation = useMutation({
    mutationFn: (data: Employee) => updateEmployee({ employeeId }, data as any), // FIXME
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      addNotification('info', 'Employee updated successfully');
    },
    onError: (error) => {
      addNotification('error', `Failed to update employee: ${error.message}`);
    }
  });

  return (
    <SpinnerOverlay size="LARGE" align='TOP' overlay={isLoading}>
      <EmployeeEditForm 
        initialData={employee}
        onSubmit={employee => updateMutation.mutate(employee)}
      />
    </SpinnerOverlay>
  );
};
