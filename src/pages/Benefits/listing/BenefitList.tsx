import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import { cancelBenefitSubscription, getBenefitSubscriptions, renewBenefitSubscription } from '../../../api/BenefitApi.axios';

import { Spinner } from '../../../components/Generic/Spinner';
import { BenefitCard } from './BenefitCard';
import { useNotifications } from '../../../components/Notifications/NotificationContext';
import { AddBenefitModal } from '../AddBenefitModal';
import { Button } from '../../../components/Generic/Button';
import { BenefitSearchBar } from '../search/BenefitSearchBar';
import { BenefitSearchFilters, emptyBenefitSearchFilters } from '../search/BenefitSearchFilters';
import { H1 } from '../../../components/Typography/Headings';
import { FlexText } from '../../../components/Typography/FlexText';
import { Text } from '../../../components/Typography/Text';
import { SpinnerOverlay } from '../../../components/Generic/SpinnerOverlay';
import { BenefitSubscription } from '../../../contract-types/data-contracts';

export function BenefitList() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [searchState, setSearchState] = useState<BenefitSearchFilters>(emptyBenefitSearchFilters);
  const { addNotification } = useNotifications();
  const [benefits, setBenefits] = useState<BenefitSubscription[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(true);
    getBenefitSubscriptions().then((benefits) => {
      setBenefits(benefits);
      setIsFetching(false);
    });
  }, [])

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
        <SpinnerOverlay size="LARGE" align='TOP' overlay={isFetching}>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isFetching ? 'pointer-events-none opacity-50' : ''}`}>
            {benefits?.map((benefit) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                onCancel={() => alert(benefit.id)}
                onRenew={() => alert(benefit.id)}
              />
            ))}
          </div>
        </SpinnerOverlay>
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