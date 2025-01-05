import React from 'react';
import { Trash2, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

import { Benefit } from '../../api/data-contracts';
import { formatCurrency } from '../../contexts/CurrencyContext';

const typeColors = {
  'health': 'bg-blue-100 text-blue-800',
  'dental': 'bg-green-100 text-green-800',
  'vision': 'bg-purple-100 text-purple-800',
  'life': 'bg-yellow-100 text-yellow-800'
};

export function BenefitCard({
  benefit,
  onDelete
}: {
  benefit: Benefit;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[benefit.type]}`}>
            {benefit.service}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 mt-2">
            {benefit.provider}
          </h3>
        </div>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-600"
        >
          <Trash2 className="h-5 w-5" />
        </button>
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
        {benefit.endDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            End Date: {format(new Date(benefit.endDate), 'MMM d, yyyy')}
          </div>
        )}
      </div>
    </div>
  );
}