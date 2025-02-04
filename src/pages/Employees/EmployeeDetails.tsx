import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, LayoutList } from 'lucide-react';
import { format, formatDistance } from 'date-fns';
import { observer } from 'mobx-react-lite';

import { Spinner } from '../../components/Generic/Spinner';
import { viewedEmployeesStore } from './ViewedEmployeesStore';
import { getEmployeeById } from '../../api/EmployeeApi.axios';
import { formatCurrency } from '../../contexts/CurrencyContext';
import { DetailsSection } from '../../components/Generic/DetailsSection';
import { contractTypeDict, nationalityDict } from './EmployeeDictionaries';
import { H3 } from '../../components/Typography/Headings';
import { ActionButtons } from '../../components/Generic/ActionButtons';
import { EmployeeCard } from './listing/EmployeeCard';
import { employeeDetailsQuery } from '../../api/EmployeeQueries';

const MultiParagraphText = ({ text }: { text: string }) => {
  return (
    <div>
      {text.split('\n').map((paragraph, index) => (
        <p key={index} className="text-gray-900">{paragraph}</p>
      ))}
    </div>
  );
}

export const EmployeeDetails = observer(() => {
  const { id } = useParams();
  const employeeId = Number(id!);
  const navigate = useNavigate();

  const { data: employee, isLoading } = useQuery(employeeDetailsQuery(employeeId));

  useEffect(() => {
    if (employee) {
      viewedEmployeesStore.addViewedEmployee(employee);
    }
  }, [employee]);

  if (isLoading) return <Spinner />;
  if (!employee) return null;

  const personalInformationLines = [
    { label: 'Email', value: employee.email },
    { label: 'Phone', value: employee.personalInfo.phone },
    { label: 'Address', value:
      <>
        { employee.personalInfo.address.street }
        <div>{ employee.personalInfo.address.city }, { employee.personalInfo.address.country }</div>
      </>
    },
    { label: 'Nationality', value: nationalityDict[employee.nationality] },
  ];

  const officeDetailsLines = [
    {
      label: 'Office',
      value: employee.office
    },
    {
      label: 'Keycard ID',
      value: employee.keycardId
    }
  ]

  const employmentDetailsLines = [
    {
      label: 'Employment',
      value: contractTypeDict[employee.employment.contractType]
    },
    {
      label: 'Employment Start Date',
      value: format(new Date(employee.employment.startDate), 'MMM d, yyyy')
    },
    ...(employee.employment.endDate ? [{
      label: 'Employment Termination Date',
      value: format(new Date(employee.employment.endDate), 'MMM d, yyyy')
    }] : []),
    {
      label: 'Duration',
      value: formatDistance(new Date(employee.employment.startDate), new Date(employee.employment.endDate || new Date()))
    },
    {
      label: 'Salary',
      value: `${formatCurrency(employee.employment.currentSalary)} /month`
    },
    {
      label: 'Bank Account',
      value: employee.account
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">

          <ActionButtons
            actions={[{
              icon: ArrowLeft,
              text: 'Back to Employee Search',
              onClick: () => navigate(`/employees`)
            }, {
              text: 'Projects involved in',
              icon: LayoutList,
              onClick: () => navigate(`/employees/${employee.id}/projects`)
            }]}
            className="mb-4"
          />

          <EmployeeCard employee={employee} size='LARGE' />

          <div className="mt-6 grid grid-cols-2 gap-6">
            <DetailsSection
              title="Personal Information"
              lines={personalInformationLines}
            />
            
            <DetailsSection
              title="Employment Details"
              lines={employmentDetailsLines}
            />

            <DetailsSection
              title="Office Details"
              lines={officeDetailsLines}
            />
          </div>

          <div className="mt-6">
            <H3>Skills</H3>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <H3>Biography</H3>
            <div className="flex flex-wrap gap-2">
              <MultiParagraphText text={employee.bio} />
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
});