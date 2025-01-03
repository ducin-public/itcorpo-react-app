import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { Spinner } from '../../components/Generic/Spinner';
import { BenefitCard } from './BenefitCard';
import { useNotifications } from '../../contexts/NotificationContext';
import { AddBenefitModal } from './AddBenefitModal';
import { Button } from '../../components/Generic/Button';
import { deleteBenefit, getBenefits } from '../../api/BenefitApi.axios';

export function BenefitList() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const { addNotification } = useNotifications();
  
  const { data: benefits, isLoading } = useQuery({
    queryKey: ['benefits'],
    queryFn: getBenefits
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteBenefit(id);
      addNotification('notice', 'Benefit successfully deleted');
    } catch (error) {
      addNotification('error', `Failed to delete benefit: ${error}`);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Benefits</h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          Add Benefit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits?.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            onDelete={() => handleDelete(benefit.id)}
          />
        ))}
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