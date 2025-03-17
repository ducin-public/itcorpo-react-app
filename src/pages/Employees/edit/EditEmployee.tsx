import { useParams } from 'react-router-dom';

import { EmployeeEditForm } from './EmployeeEditForm';
import { SpinnerOverlay } from '../../../components/Generic/SpinnerOverlay';
import { useEffect, useState } from 'react';
import { getEmployeeById } from '../../../api/EmployeeApi.axios';
import { Employee } from '../../../contract-types/data-contracts';

export const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id!)

    const [employee, setEmployee] = useState<Employee>();
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
      setIsFetching(true);
      getEmployeeById({ employeeId: Number(id!) }).then((benefits) => {
        setEmployee(benefits);
        setIsFetching(false);
      });
    }, [])
  // getEmployeeById


  return (
    <SpinnerOverlay size="LARGE" align='TOP' overlay={isFetching}>
      {employee && <EmployeeEditForm 
        initialData={employee as any}
        onSubmit={employee => console.log({
          employeeId: employeeId,
          name: `${employee.firstName} ${employee.lastName}`,
          data: employee
        })}
      />}
    </SpinnerOverlay>
  );
};
