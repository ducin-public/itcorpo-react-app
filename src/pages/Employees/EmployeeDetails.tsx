import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';

import { Spinner } from '../../components/Generic/Spinner';
import { viewedEmployeesStore } from './ViewedEmployeesStore';
import { getEmployee } from '../../api/EmployeeApi.axios';
import { formatCurrency } from '../../contexts/CurrencyContext';
import { employeeImageURL } from './employeeImageURL';

export const EmployeeDetails = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: employee, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployee(Number(id!)),
    onSuccess: (data) => {
      viewedEmployeesStore.addViewedEmployee(data);
    },
  });

  if (isLoading) return <Spinner />;
  if (!employee) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-6">
            <img
              src={employeeImageURL(employee)}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-lg text-gray-600">{employee.title}</p>
              <p className="text-sm text-gray-500">{employee.department}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Email:</span>{' '}
                  <span className="text-gray-900">{employee.email}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Phone:</span>{' '}
                  <span className="text-gray-900">{employee.personalInfo.phone}</span>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Hire Date:</span>{' '}
                  <span className="text-gray-900">
                    {format(new Date(employee.hiredAt), 'MMM d, yyyy')}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Salary:</span>{' '}
                  <span className="text-gray-900">{formatCurrency(employee.salary)}/year</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
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

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Address</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{employee.personalInfo.address.street}</p>
              <p>
                {employee.personalInfo.address.city}, {employee.personalInfo.address.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});