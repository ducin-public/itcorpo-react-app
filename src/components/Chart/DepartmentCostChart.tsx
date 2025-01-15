import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Department, DepartmentCostBreakdown, TimePeriod, departments } from './DepartmentCostSampleData';

export interface Department {
    id: number;
    name: string;
  }
  
export type TimePeriod = 'year' | 'quarter' | 'month';

export interface DepartmentCostBreakdown {
  departmentId: number;
  employeeCosts: {
    baseSalaries: number;
    bonuses: number;
    overtimePay: number;
    contractorFees: number;
  };
  benefitsCosts: {
    healthInsurance: number;
    dentalPlans: number;
    lifestyleSubscriptions: number;
    gymMemberships: number;
    mealAllowance: number;
  };
  operationalCosts: {
    officeRent: number;
    utilities: number;
    equipmentLeasing: number;
    softwareLicenses: number;
    officeSupplies: number;
  };
  projectCosts: {
    travelExpenses: number;
    trainingBudget: number;
    conferenceTickets: number;
    certifications: number;
  };
  metrics: {
    headcount: number;
    projectCount: number;
    avgSalary: number;
    costPerEmployee: number;
  };
}

interface DepartmentCostChartProps {
  data: DepartmentCostBreakdown[];
  departments: Department[];
  onDepartmentClick?: (departmentId: number) => void;
  height?: number;
  selectedDepartmentId?: number;
  timePeriod: TimePeriod;
  onTimePeriodChange: (period: TimePeriod) => void;
  onBackToOverview?: () => void;
}

const COLORS = {
  employeeCosts: '#3B82F6',
  benefitsCosts: '#10B981',
  operationalCosts: '#F59E0B',
  projectCosts: '#6366F1',
};

const TIME_PERIOD_LABELS = {
  year: 'Yearly',
  quarter: 'Quarterly',
  month: 'Monthly',
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const CustomTooltip = ({ active, payload, isDetailMode }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <p className="font-semibold text-lg mb-2">
          {isDetailMode ? data.name : data.departmentName}
        </p>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            Amount: <span className="font-semibold text-gray-900">
              {formatCurrency(data.value)}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Percentage: <span className="font-semibold text-gray-900">
              {data.percentage.toFixed(1)}%
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const DepartmentCostChart = ({
  data,
  departments,
  height = 400,
  selectedDepartmentId,
  timePeriod,
  onTimePeriodChange,
  onDepartmentClick,
  onBackToOverview,
}: DepartmentCostChartProps) => {
  const isDetailMode = selectedDepartmentId !== undefined;
  const selectedDepartment = departments.find(d => d.id === selectedDepartmentId);

  const getOverviewData = () => {
    return data.map(dept => {
      const departmentName = departments.find(d => d.id === dept.departmentId)?.name;
      const totalCost = 
        Object.values(dept.employeeCosts).reduce((sum, val) => sum + val, 0) +
        Object.values(dept.benefitsCosts).reduce((sum, val) => sum + val, 0) +
        Object.values(dept.operationalCosts).reduce((sum, val) => sum + val, 0) +
        Object.values(dept.projectCosts).reduce((sum, val) => sum + val, 0);
      
      return {
        departmentId: dept.departmentId,
        departmentName,
        value: totalCost,
      };
    });
  };

  const getDetailData = (departmentData: DepartmentCostBreakdown) => {
    const categories = [
      {
        name: 'Employee Costs',
        value: Object.values(departmentData.employeeCosts).reduce((sum, val) => sum + val, 0),
        color: COLORS.employeeCosts,
      },
      {
        name: 'Benefits Costs',
        value: Object.values(departmentData.benefitsCosts).reduce((sum, val) => sum + val, 0),
        color: COLORS.benefitsCosts,
      },
      {
        name: 'Operational Costs',
        value: Object.values(departmentData.operationalCosts).reduce((sum, val) => sum + val, 0),
        color: COLORS.operationalCosts,
      },
      {
        name: 'Project Costs',
        value: Object.values(departmentData.projectCosts).reduce((sum, val) => sum + val, 0),
        color: COLORS.projectCosts,
      },
    ];

    const total = categories.reduce((sum, cat) => sum + cat.value, 0);
    return categories.map(cat => ({
      ...cat,
      percentage: (cat.value / total) * 100,
    }));
  };

  const chartData = isDetailMode
    ? getDetailData(data.find(d => d.departmentId === selectedDepartmentId)!)
    : getOverviewData();

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
  chartData.forEach(item => {
    item.percentage = (item.value / totalValue) * 100;
  });

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {isDetailMode && (
              <button
                onClick={onBackToOverview}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-slate-600" />
              </button>
            )}
            <Building2 className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isDetailMode 
                ? `${selectedDepartment?.name} Department Costs`
                : 'Department Cost Overview'}
            </h2>
          </div>
          <p className="text-gray-600">
            {isDetailMode
              ? 'Detailed cost breakdown by category'
              : 'Compare costs across departments'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timePeriod}
            onChange={(e) => onTimePeriodChange(e.target.value as TimePeriod)}
            className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {Object.entries(TIME_PERIOD_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-sm text-slate-600">Total {TIME_PERIOD_LABELS[timePeriod]} Costs</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalValue)}</p>
        </div>
        {isDetailMode && (
          <>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-600">Headcount</p>
              <p className="text-2xl font-bold text-slate-900">
                {data.find(d => d.departmentId === selectedDepartmentId)?.metrics.headcount}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-600">Active Projects</p>
              <p className="text-2xl font-bold text-slate-900">
                {data.find(d => d.departmentId === selectedDepartmentId)?.metrics.projectCount}
              </p>
            </div>
          </>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={Math.min(height / 2 - 20, 180)}
            paddingAngle={2}
            dataKey="value"
            onClick={(data) => {
              console.log(data);
              !isDetailMode && onDepartmentClick?.(data.departmentId);
            }}
            animationDuration={1000}
            animationBegin={0}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={isDetailMode ? entry.color : COLORS.employeeCosts}
                className="transition-opacity duration-200 hover:opacity-80 cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip isDetailMode={isDetailMode} />} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};