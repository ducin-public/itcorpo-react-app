import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { cancelBenefit, renewBenefit } from '../../../api/BenefitApi.axios';
import { benefitSubscriptionListQuery } from '../../../api/BenefitQueries';

import { Spinner } from '../../../components/Generic/Spinner';
import { BenefitCard } from './BenefitCard';
import { useNotifications } from '../../../contexts/NotificationContext';
import { AddBenefitModal } from '../AddBenefitModal';
import { Button } from '../../../components/Generic/Button';
import { BenefitSearchBar } from '../search/BenefitSearchBar';
import { BenefitSearchFilters, emptyBenefitSearchFilters } from '../search/BenefitSearchFilters';
import { H1 } from '../../../components/Typography/Headings';
import { FlexText } from '../../../components/Typography/FlexText';
import { Text } from '../../../components/Typography/Text';

export function BenefitList() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [searchState, setSearchState] = useState<BenefitSearchFilters>(emptyBenefitSearchFilters);
  const { addNotification } = useNotifications();
  
  const { data: benefits, isFetching } = useQuery({
    ...benefitSubscriptionListQuery({
      serviceName: searchState.serviceName || undefined,
      employeeId: searchState.beneficiaryEmployee,
      feeFrom: searchState.feeRange.from?.toString(),
      feeTo: searchState.feeRange.to?.toString(),
      status: searchState.selectedStatus ?? 'ALL'
    }),
    placeholderData: (prev) => prev
  });

  const handleCancel = async (benefitId: string) => {
    try {
      // FIXME: mutation
      await cancelBenefit({ benefitId });
      addNotification('notice', 'Benefit subscription cancelled');
    } catch (error) {
      addNotification('error', `Failed to cancel benefit: ${error}`);
    }
  };

  const handleRenew = async (benefitId: string) => {
    try {
      // FIXME: mutation
      await renewBenefit({ benefitId });
      addNotification('notice', 'Benefit subscription renewed');
    } catch (error) {
      addNotification('error', `Failed to renew benefit: ${error}`);
    }
  };

  return (
    <div className='px-2 py-2'>
      <div className="flex justify-between items-center mb-6">
        <FlexText>
          <H1 className='mb-0'>Benefit Subscriptions</H1>
          {benefits && <Text>({benefits.length} results)</Text>}
        </FlexText>
        <Button
        icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2"
        >
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
        {isFetching && 
          <Spinner size='LARGE' layout='OVERLAY' />
        }
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isFetching ? 'pointer-events-none opacity-50' : ''}`}>
          {benefits?.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              onCancel={() => handleCancel(benefit.id)}
              onRenew={() => handleRenew(benefit.id)}
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