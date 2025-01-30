import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployeeById, updateEmployee } from '../../api/EmployeeApi.axios';
import { EmployeeEditForm } from './EmployeeEditForm';
import { Spinner } from '../../components/Generic/Spinner';
import { useNotifications } from '../../contexts/NotificationContext';
import type { Employee } from '../../contract-types/data-contracts';

export const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id!)
  const { addNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { data: employee, isLoading } = useQuery({
    queryKey: ['employees', employeeId],
    queryFn: () => getEmployeeById({ employeeId }),
    enabled: !!id
  });

  const updateMutation = useMutation({
    mutationFn: (data: Employee) => updateEmployee({ employeeId }, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      addNotification('info', 'Employee updated successfully');
    },
    onError: (error) => {
      addNotification('error', `Failed to update employee: ${error.message}`);
    }
  });

  if (isLoading) {
    return <Spinner size="LARGE" layout="OVERLAY" />;
  }

  return (
    <EmployeeEditForm 
      initialData={employee}
      onSubmit={employee =>updateMutation.mutate(employee)}
    />
  );
};
