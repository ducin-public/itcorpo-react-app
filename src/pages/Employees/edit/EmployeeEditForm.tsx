import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextInput } from '../../../components/Forms/TextInput';
import { DatePicker } from '../../../components/Forms/DatePicker';
import { Dropdown } from '../../../components/Forms/Dropdown';
import { FormSection } from '../../../components/Forms/FormSection';
import { Button } from '../../../components/Generic/Button';
import { ValidationError } from '../../../components/Forms/ValidationError';
import type { Employee, EmployeeInput } from '../../../contract-types/data-contracts';
import { employeeImageURL } from '../employeeImageURL';
import { FileInput } from '../../../components/Forms/FileInput';
import { useQuery } from '@tanstack/react-query';
import { geoQuery } from '../../../api/GeoQueries';
import { departmentsListQuery } from '../../../api/DepartmentQueries';

interface EmployeeEditFormProps {
  initialData?: EmployeeInput;
  onSubmit: (employee: EmployeeInput) => void;
}

export const EmployeeEditForm = ({ initialData, onSubmit }: EmployeeEditFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<EmployeeInput>>(initialData || {});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: geoData } = useQuery(geoQuery);
  const { data: departmentsData } = useQuery(departmentsListQuery);

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    const newErrorMessages: Record<string, string> = {};
    
    // Identity Information validation
    if (!formData.firstName?.trim()) {
      newErrors.firstName = true;
      newErrorMessages.firstName = 'First name is required';
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = true;
      newErrorMessages.lastName = 'Last name is required';
    }
    if (!formData.nationality) {
      newErrors.nationality = true;
      newErrorMessages.nationality = 'Nationality is required';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = true;
      newErrorMessages.dateOfBirth = 'Date of birth is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = true;
        newErrorMessages.dateOfBirth = 'Employee must be at least 18 years old';
      }
    }

    // Employment Details validation
    if (!formData.departmentId) {
      newErrors.department = true;
      newErrorMessages.department = 'Department is required';
    }
    if (!formData.title) {
      newErrors.title = true;
      newErrorMessages.title = 'Title is required';
    }
    if (!formData.office) {
      newErrors.officeLocation = true;
      newErrorMessages.officeLocation = 'Office location is required';
    }
    if (!formData.salary) {
      newErrors.salary = true;
      newErrorMessages.salary = 'Salary is required';
    }

    // Contract validation
    if (!formData.contractType) {
      newErrors.contractType = true;
      newErrorMessages.contractType = 'Contract type is required';
    }
    if (!formData.hiredAt) {
      newErrors.hiredAt = true;
      newErrorMessages.hiredAt = 'Contract start date is required';
    }
    if (formData.expiresAt && formData.hiredAt && 
        new Date(formData.expiresAt) <= new Date(formData.hiredAt)) {
      newErrors.contractExpirationDate = true;
      newErrorMessages.contractExpirationDate = 'Expiration date must be after hire date';
    }

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData as EmployeeInput); // FIXME
      navigate(-1);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <FormSection label="Identity Information">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TextInput
              label="First Name"
              value={formData.firstName || ''}
              onChange={(value) => setFormData({ ...formData, firstName: value })}
              error={errors.firstName}
              required
            />
            {errors.firstName && (
              <ValidationError>{errorMessages.firstName}</ValidationError>
            )}
          </div>
          
          <div>
            <TextInput
              label="Last Name"
              value={formData.lastName || ''}
              onChange={(value) => setFormData({ ...formData, lastName: value })}
              error={errors.lastName}
              required
            />
            {errors.lastName && (
              <ValidationError>{errorMessages.lastName}</ValidationError>
            )}
          </div>

          <div>
            <Dropdown
              label="Nationality"
              options={geoData ?? {}}
              value={formData.nationality || ''}
              onChange={(value) => setFormData({ ...formData, nationality: value as any })} // FIXME
              error={errors.nationality}
            />
            {errors.nationality && (
              <ValidationError>{errorMessages.nationality}</ValidationError>
            )}
          </div>

          <div>
            <DatePicker
              footer="Date of Birth"
              value={formData.dateOfBirth || ''}
              onChange={(value) => setFormData({ ...formData, dateOfBirth: value })}
              error={errors.dateOfBirth}
              required
            />
            {errors.dateOfBirth && (
              <ValidationError>{errorMessages.dateOfBirth}</ValidationError>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection label="Employment Details">
        <div className="grid grid-cols-2 gap-4">
          <Dropdown
            label="Department"
            options={[]} // TODO: fetch from backend
            value={formData.department || ''}
            onChange={(value) => setFormData({ ...formData, department: value })}
            error={errors.department}
            required
          />
          <TextInput
            label="Title"
            value={formData.title || ''}
            onChange={(value) => setFormData({ ...formData, title: value })}
            error={errors.title}
            required
          />
          <Dropdown
            label="Office Location"
            options={[]} // TODO: fetch from backend
            value={formData.officeLocation || ''}
            onChange={(value) => setFormData({ ...formData, officeLocation: value })}
            error={errors.officeLocation}
            required
          />
          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              className={`w-full h-10 px-3 border rounded-md ${errors.salary ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.salary || ''}
              onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
              required
            />
            {errors.salary && (
              <ValidationError>{errorMessages.salary}</ValidationError>
            )}
          </div>
        </div>
      </FormSection>

      <FormSection label="Profile Image">
        <div className="w-full">
          <FileInput
            label="Profile Image"
            fileType="IMAGE"
            renderThumbnail={(filename) => (
              <img
                src={URL.createObjectURL(new File([filename], filename))}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            onChange={(file) => {
              setFormData({ ...formData, imgURL: URL.createObjectURL(file) });
            }}
            error={errors.imageUrl}
          />
          {errors.imageUrl && (
            <ValidationError>{errorMessages.imageUrl}</ValidationError>
          )}
        </div>
      </FormSection>

      <div className="flex justify-end space-x-4 mt-8">
        <Button
          type="button"
          variant='ACCENT'
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant='DEFAULT'
          fill='OUTLINED'
          onClick={() => setFormData(initialData || {})}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant='WARNING'
          fill='OUTLINED'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};
