import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { Spinner } from '../../components/Generic/Spinner';
import { BenefitCard } from './BenefitCard';
import { useNotifications } from '../../contexts/NotificationContext';
import { AddBenefitModal } from './AddBenefitModal';
import { Button } from '../../components/Generic/Button';
import { deleteBenefit, getBenefits } from '../../api/BenefitApi.axios';
import { BenefitSearchBar } from './BenefitSearchBar';
import { BenefitSearchState } from './BenefitSearchCriteria';

export function BenefitList() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [searchState, setSearchState] = useState<BenefitSearchState>({
    serviceName: '',
    selectedEmployees: [],
    selectedCategories: [], // new field
    feeRange: {},
    selectedStatus: 'ACTIVE'
  });
  const { addNotification } = useNotifications();
  
  const { data: benefits, isLoading, isFetching } = useQuery({
    queryKey: ['benefits', searchState],
    queryFn: () => getBenefits(({
      serviceName: searchState.serviceName || undefined,
      employeeIds: searchState.selectedEmployees.join(',') || undefined,
      categories: searchState.selectedCategories.join(',') || undefined, // new parameter
      feeFrom: searchState.feeRange.from?.toString(),
      feeTo: searchState.feeRange.to?.toString(),
      status: searchState.selectedStatus ?? 'ALL'
    }))
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteBenefit(id);
      addNotification('notice', 'Benefit successfully deleted');
    } catch (error) {
      addNotification('error', `Failed to delete benefit: ${error}`);
    }
  };

  return (
    <div className='px-2 py-2'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Benefit Subscriptions</h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          Add Benefit
        </Button>
      </div>

      <div className="mb-6">
        <BenefitSearchBar
          searchState={searchState}
          onCriteriaUpdate={setSearchState}
        />
      </div>

      <div className="relative min-h-[200px]">
        {(isLoading || isFetching) && <Spinner size='LARGE' layout='OVERLAY' />}
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isFetching ? 'pointer-events-none opacity-50' : ''}`}>
          {benefits?.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              onDelete={() => handleDelete(benefit.id)}
            />
          ))}
        </div>
      </div>

      {isAddModalOpen && (
        <AddBenefitModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false);
            addNotification('notice', 'Benefit successfully added');
          }}
        />
      )}
    </div>
  );
}