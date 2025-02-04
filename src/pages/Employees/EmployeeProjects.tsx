import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Search } from 'lucide-react';

import { Spinner } from '../../components/Generic/Spinner';
import { ButtonChoice } from '../../components/Generic/ButtonChoice';
import { InvolvementTile } from './ImprovementTile';
import { ProjectEmployeeInvolvement } from '../../contract-types/data-contracts';
import { employeeProjectsListQuery } from '../../api/EmployeeQueries';
import { ActionButtons } from '../../components/Generic/ActionButtons';
import { EmployeeCard } from './EmployeeCard';
import { viewedEmployeesStore } from './ViewedEmployeesStore';
import { observer } from 'mobx-react-lite';

type InvolvementStatus = 'ALL' | 'ACTIVE' | 'PAST';

function filterInvolvements (involvements: ProjectEmployeeInvolvement[], status: InvolvementStatus) {
    switch (status) {
      case 'ACTIVE':
        return involvements.filter(involvement => !involvement.endDate);
      case 'PAST':
        return involvements.filter(involvement => !!involvement.endDate);
      default:
        return involvements;
    }
};

function noDataFoundLabel(status: InvolvementStatus, employeeName: string) {
    const allLabels = {
        ALL: `Employee ${employeeName} was never involved in any projects`,
        ACTIVE: `Employee ${employeeName} is currently not involved in any projects`,
        PAST: `No past projects found for ${employeeName}`,
    } satisfies Record<InvolvementStatus, string>
    return allLabels[status];
}

export const EmployeeProjects = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employeeId = Number(id!);
  const [status, setStatus] = useState<InvolvementStatus>('ACTIVE');

  const { data: involvements, isLoading } = useQuery(employeeProjectsListQuery(employeeId));

  useEffect(() => {
    if (involvements?.employee) {
      viewedEmployeesStore.addViewedEmployee(involvements.employee);
    }
  }, [involvements]);

  if (isLoading) return <Spinner />;
  if (!involvements) return null;

  const { employee, projects } = involvements;

  const filteredProjects = filterInvolvements(projects, status);

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
              icon: Search,
              text: 'View Details',
              onClick: () => navigate(`/employees/${employee.id}/details`)
            }]}
            className="mb-4"
          />

          <EmployeeCard employee={employee} size='LARGE' />

          {/* Filter */}
          <div className="my-6">
            <ButtonChoice
              options={[
                { value: 'ALL', label: 'All Projects' },
                { value: 'ACTIVE', label: 'Active Only' },
                { value: 'PAST', label: 'Past Projects' },
              ]}
              size='SMALL'
              value={status}
              onChange={(value) => setStatus(value as InvolvementStatus)}
            />
          </div>

          {/* Projects List */}
          <div className="space-y-4">
            {filteredProjects?.map((involvement) => (
              <InvolvementTile key={involvement.projectId} involvement={involvement} />
            ))}
            {filteredProjects?.length === 0 && (
              <p className="text-center text-gray-500">
                {noDataFoundLabel(status, employee.name)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
