import { Calendar, DollarSign, XCircle, RefreshCw, Receipt } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { BenefitSubscription } from '../../../contract-types/data-contracts';
import { formatCurrency } from '../../../contexts/CurrencyContext';
import { BenefitServiceChip } from '../BenefitServiceChip';
import { styles } from '../../../components/DesignLanguage';

interface BenefitCardProps {
  benefit: BenefitSubscription;
  onCancel?: () => void;
  onRenew?: () => void;
}

export function BenefitCard({
  benefit,
  onCancel,
  onRenew
}: BenefitCardProps) {
  const isActive = !benefit.cancelledAtDate;
  const navigate = useNavigate();

  return (
    <div className={`${!isActive ? 'bg-gray-100' : 'bg-white'} rounded-lg shadow-sm p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <BenefitServiceChip
            category={benefit.category}
            name={benefit.service.name}
          />
          <h3 className="text-lg font-semibold text-gray-900 mt-2">
            {benefit.service.provider}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {benefit.beneficiary.name}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/benefits/${benefit.id}/charges`)}
            className={`text-gray-400 hover:${styles.ACCENT.text}`}
          >
            <Receipt className="h-5 w-5" />
          </button>
          {isActive ? (
            <button
              onClick={onCancel}
              className={`text-gray-400 hover:${styles.ALERT.text}`}
            >
              <XCircle className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={onRenew}
              className={`text-gray-400 hover:${styles.SUCCESS.text}`}
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="h-4 w-4 mr-2" />
          Monthly Fee: {formatCurrency(benefit.monthlyFee)}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          Start Date: {format(new Date(benefit.subscribedAtDate), 'MMM d, yyyy')}
        </div>
        {benefit.cancelledAtDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            End Date: {format(new Date(benefit.cancelledAtDate), 'MMM d, yyyy')}
          </div>
        )}
      </div>
    </div>
  );
}