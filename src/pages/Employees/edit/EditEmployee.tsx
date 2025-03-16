import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { EmployeeEditForm } from './EmployeeEditForm';
import { employeeDetailsQuery, useUpdateEmployeeMutation } from '../../../api/EmployeeQueries';
import { SpinnerOverlay } from '../../../components/Generic/SpinnerOverlay';

export const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id!)

  const { data: employee, isLoading } = useQuery(employeeDetailsQuery(employeeId));

  const updateMutation = useUpdateEmployeeMutation();

  return (
    <SpinnerOverlay size="LARGE" align='TOP' overlay={isLoading}>
      {employee && <EmployeeEditForm 
        initialData={employee}
        onSubmit={employee => updateMutation.mutate({
          employeeId: employeeId,
          name: `${employee.firstName} ${employee.lastName}`,
          data: employee
        })}
      />}
    </SpinnerOverlay>
  );
};
