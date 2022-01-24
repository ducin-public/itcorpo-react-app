import React from 'react'

import { API_URL } from '../../api/config';
import { Employee } from '../../typedef';

import '../../shared/image.css'

type EmployeeImageProps = {
  employee: Employee
}

export const EmployeeImage = ({ employee }: EmployeeImageProps) =>
  <img
    className="thumb small"
    alt={`${employee.firstName} ${employee.lastName}`}
    src={`${API_URL}/images/avatars/${employee.imgURL}`}
  />

export const EmployeeThumbnailImage = ({ employee }: EmployeeImageProps) =>
  <img
    className="avatar-small"
    alt={`${employee.firstName} ${employee.lastName} avatar`}
    src={`${API_URL}/images/avatars/${employee.imgURL}`}
  />
