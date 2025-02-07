import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import type { BenefitCharge } from '../../contract-types/data-contracts';
import { getBenefitCharges } from '../../api/BenefitApi.axios';
import { formatCurrency } from '../../contexts/CurrencyContext';
import { styles } from '../../components/DesignLanguage';
import { Spinner } from '../../components/Generic/Spinner';
import { benefitChargesListQuery } from '../../api/BenefitQueries';

const statusStyles: Record<BenefitCharge['status'], keyof typeof styles> = {
  'PENDING': 'WARNING',
  'PAID': 'SUCCESS',
  'OVERDUE': 'ALERT',
  'CANCELLED': 'DEFAULT',
  'REFUNDED': 'ACCENT'
};

export function BenefitChargesList() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: charges, isLoading } = useQuery(benefitChargesListQuery({ employeeId: id! }));

  if (isLoading) return <Spinner size="LARGE" />;
  if (!charges) return null;

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Benefit Charges</h1>
        <button onClick={() => navigate('/benefits')} className="text-gray-600 hover:text-gray-900">
          Back to Benefits
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Code</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {charges.map((charge) => {
              const style = styles[statusStyles[charge.status]];
              return (
                <tr key={charge.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(charge.billingPeriodStart), 'MMM d, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500">
                      to {format(new Date(charge.billingPeriodEnd), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(charge.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${style.background} ${style.textDark}`}>
                      {charge.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {charge.providerServiceCode}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
