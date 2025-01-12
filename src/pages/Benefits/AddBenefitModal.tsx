import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createBenefit } from '../../api/BenefitApi.axios';
import { Benefit } from '../../contract-types/data-contracts';
import { styleConstants, styles } from '../../components/DesignLanguage';

interface AddBenefitForm {
  type: Benefit['service'];
  provider: string;
  description: string;
  monthlyFee: number;
  coverageDetails: string;
  employeeId: string;
  startDate: string;
}

export function AddBenefitModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<AddBenefitForm>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AddBenefitForm) => createBenefit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['benefits'] });
      onSuccess();
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Benefit</h2>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <div className="space-y-4">
            <div>
              <label className={`${styleConstants.LABEL_TEXT_SIZE} block font-medium text-gray-700`}>Type</label>
              <select
                {...register('type', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="health">Health</option>
                <option value="dental">Dental</option>
                <option value="vision">Vision</option>
                <option value="life">Life</option>
              </select>
            </div>

            <div>
              <label className={`${styleConstants.LABEL_TEXT_SIZE} block font-medium text-gray-700`}>Provider</label>
              <input
                type="text"
                {...register('provider', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Fee</label>
              <input
                type="number"
                {...register('monthlyFee', { required: true, min: 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Benefit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}