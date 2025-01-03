import React, { useState } from 'react';

import { styles } from '../components/DesignEnums/MessageType';

const COUNTRIES = ['USA', 'UK', 'Germany', 'Poland', 'India', 'Japan'];

const financialSummary = {
  employeeCosts: 125000,
  officeCosts: 45000,
  benefitCosts: 30000,
  total: 200000,
};

export function Finances() {
  const [selectedLocation, setSelectedLocation] = useState('USA');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className={`border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 ${styles.ACCENT.focusRing} focus:border-transparent`}
        >
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Employee Costs"
          amount={financialSummary?.employeeCosts || 0}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Office Costs"
          amount={financialSummary?.officeCosts || 0}
          color="bg-green-500"
        />
        <SummaryCard
          title="Benefit Costs"
          amount={financialSummary?.benefitCosts || 0}
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Detailed Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Costs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Office Costs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Benefit Costs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {['Monthly', 'Quarterly', 'Yearly'].map((period) => (
                <tr key={period}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${formatAmount(financialSummary?.employeeCosts || 0, period)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${formatAmount(financialSummary?.officeCosts || 0, period)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${formatAmount(financialSummary?.benefitCosts || 0, period)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${formatAmount(financialSummary?.total || 0, period)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  amount,
  color
}: {
  title: string;
  amount: number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${color} rounded-lg opacity-20`} />
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            ${(amount / 1000).toFixed(1)}k
          </p>
        </div>
      </div>
    </div>
  );
}

function formatAmount(amount: number, period: string): string {
  const multiplier = period === 'Monthly' ? 1 : period === 'Quarterly' ? 3 : 12;
  return ((amount * multiplier) / 1000).toFixed(1) + 'k';
}