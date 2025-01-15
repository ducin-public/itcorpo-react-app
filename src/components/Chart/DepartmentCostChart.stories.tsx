import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Department, DepartmentCostBreakdown, DepartmentCostChart, TimePeriod } from './DepartmentCostChart';

const meta: Meta<typeof DepartmentCostChart> = {
  title: 'ITCORPO/WIP-Charts/DepartmentCostChart',
  component: DepartmentCostChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DepartmentCostChart>;

const departments: Department[] = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Marketing' },
  { id: 3, name: 'Operations' },
];

const departmentCosts: Record<TimePeriod, DepartmentCostBreakdown[]> = {
  year: [
    {
      departmentId: 1,
      employeeCosts: {
        baseSalaries: 2400000,
        bonuses: 480000,
        overtimePay: 120000,
        contractorFees: 800000
      },
      benefitsCosts: {
        healthInsurance: 240000,
        dentalPlans: 80000,
        lifestyleSubscriptions: 48000,
        gymMemberships: 36000,
        mealAllowance: 96000
      },
      operationalCosts: {
        officeRent: 480000,
        utilities: 60000,
        equipmentLeasing: 180000,
        softwareLicenses: 360000,
        officeSupplies: 24000
      },
      projectCosts: {
        travelExpenses: 180000,
        trainingBudget: 120000,
        conferenceTickets: 60000,
        certifications: 90000
      },
      metrics: {
        headcount: 120,
        projectCount: 15,
        avgSalary: 100000,
        costPerEmployee: 125000
      }
    },
    {
      departmentId: 2,
      employeeCosts: {
        baseSalaries: 1200000,
        bonuses: 240000,
        overtimePay: 60000,
        contractorFees: 400000
      },
      benefitsCosts: {
        healthInsurance: 120000,
        dentalPlans: 40000,
        lifestyleSubscriptions: 24000,
        gymMemberships: 18000,
        mealAllowance: 48000
      },
      operationalCosts: {
        officeRent: 240000,
        utilities: 30000,
        equipmentLeasing: 90000,
        softwareLicenses: 180000,
        officeSupplies: 12000
      },
      projectCosts: {
        travelExpenses: 90000,
        trainingBudget: 60000,
        conferenceTickets: 30000,
        certifications: 45000
      },
      metrics: {
        headcount: 60,
        projectCount: 8,
        avgSalary: 80000,
        costPerEmployee: 100000
      }
    },
    {
      departmentId: 3,
      employeeCosts: {
        baseSalaries: 1800000,
        bonuses: 360000,
        overtimePay: 90000,
        contractorFees: 600000
      },
      benefitsCosts: {
        healthInsurance: 180000,
        dentalPlans: 60000,
        lifestyleSubscriptions: 36000,
        gymMemberships: 27000,
        mealAllowance: 72000
      },
      operationalCosts: {
        officeRent: 360000,
        utilities: 45000,
        equipmentLeasing: 135000,
        softwareLicenses: 270000,
        officeSupplies: 18000
      },
      projectCosts: {
        travelExpenses: 135000,
        trainingBudget: 90000,
        conferenceTickets: 45000,
        certifications: 67500
      },
      metrics: {
        headcount: 90,
        projectCount: 12,
        avgSalary: 90000,
        costPerEmployee: 112500
      }
    }
  ],
  quarter: [
    {
      departmentId: 1,
      employeeCosts: {
        baseSalaries: 600000,
        bonuses: 120000,
        overtimePay: 30000,
        contractorFees: 200000
      },
      benefitsCosts: {
        healthInsurance: 60000,
        dentalPlans: 20000,
        lifestyleSubscriptions: 12000,
        gymMemberships: 9000,
        mealAllowance: 24000
      },
      operationalCosts: {
        officeRent: 120000,
        utilities: 15000,
        equipmentLeasing: 45000,
        softwareLicenses: 90000,
        officeSupplies: 6000
      },
      projectCosts: {
        travelExpenses: 45000,
        trainingBudget: 30000,
        conferenceTickets: 15000,
        certifications: 22500
      },
      metrics: {
        headcount: 120,
        projectCount: 15,
        avgSalary: 100000,
        costPerEmployee: 31250
      }
    },
    {
      departmentId: 2,
      employeeCosts: {
        baseSalaries: 300000,
        bonuses: 60000,
        overtimePay: 15000,
        contractorFees: 100000
      },
      benefitsCosts: {
        healthInsurance: 30000,
        dentalPlans: 10000,
        lifestyleSubscriptions: 6000,
        gymMemberships: 4500,
        mealAllowance: 12000
      },
      operationalCosts: {
        officeRent: 60000,
        utilities: 7500,
        equipmentLeasing: 22500,
        softwareLicenses: 45000,
        officeSupplies: 3000
      },
      projectCosts: {
        travelExpenses: 22500,
        trainingBudget: 15000,
        conferenceTickets: 7500,
        certifications: 11250
      },
      metrics: {
        headcount: 60,
        projectCount: 8,
        avgSalary: 80000,
        costPerEmployee: 25000
      }
    },
    {
      departmentId: 3,
      employeeCosts: {
        baseSalaries: 450000,
        bonuses: 90000,
        overtimePay: 22500,
        contractorFees: 150000
      },
      benefitsCosts: {
        healthInsurance: 45000,
        dentalPlans: 15000,
        lifestyleSubscriptions: 9000,
        gymMemberships: 6750,
        mealAllowance: 18000
      },
      operationalCosts: {
        officeRent: 90000,
        utilities: 11250,
        equipmentLeasing: 33750,
        softwareLicenses: 67500,
        officeSupplies: 4500
      },
      projectCosts: {
        travelExpenses: 33750,
        trainingBudget: 22500,
        conferenceTickets: 11250,
        certifications: 16875
      },
      metrics: {
        headcount: 90,
        projectCount: 12,
        avgSalary: 90000,
        costPerEmployee: 28125
      }
    }
  ],
  month: [
    {
      departmentId: 1,
      employeeCosts: {
        baseSalaries: 200000,
        bonuses: 40000,
        overtimePay: 10000,
        contractorFees: 66667
      },
      benefitsCosts: {
        healthInsurance: 20000,
        dentalPlans: 6667,
        lifestyleSubscriptions: 4000,
        gymMemberships: 3000,
        mealAllowance: 8000
      },
      operationalCosts: {
        officeRent: 40000,
        utilities: 5000,
        equipmentLeasing: 15000,
        softwareLicenses: 30000,
        officeSupplies: 2000
      },
      projectCosts: {
        travelExpenses: 15000,
        trainingBudget: 10000,
        conferenceTickets: 5000,
        certifications: 7500
      },
      metrics: {
        headcount: 120,
        projectCount: 15,
        avgSalary: 100000,
        costPerEmployee: 10417
      }
    },
    {
      departmentId: 2,
      employeeCosts: {
        baseSalaries: 100000,
        bonuses: 20000,
        overtimePay: 5000,
        contractorFees: 33333
      },
      benefitsCosts: {
        healthInsurance: 10000,
        dentalPlans: 3333,
        lifestyleSubscriptions: 2000,
        gymMemberships: 1500,
        mealAllowance: 4000
      },
      operationalCosts: {
        officeRent: 20000,
        utilities: 2500,
        equipmentLeasing: 7500,
        softwareLicenses: 15000,
        officeSupplies: 1000
      },
      projectCosts: {
        travelExpenses: 7500,
        trainingBudget: 5000,
        conferenceTickets: 2500,
        certifications: 3750
      },
      metrics: {
        headcount: 60,
        projectCount: 8,
        avgSalary: 80000,
        costPerEmployee: 8333
      }
    },
    {
      departmentId: 3,
      employeeCosts: {
        baseSalaries: 150000,
        bonuses: 30000,
        overtimePay: 7500,
        contractorFees: 50000
      },
      benefitsCosts: {
        healthInsurance: 15000,
        dentalPlans: 5000,
        lifestyleSubscriptions: 3000,
        gymMemberships: 2250,
        mealAllowance: 6000
      },
      operationalCosts: {
        officeRent: 30000,
        utilities: 3750,
        equipmentLeasing: 11250,
        softwareLicenses: 22500,
        officeSupplies: 1500
      },
      projectCosts: {
        travelExpenses: 11250,
        trainingBudget: 7500,
        conferenceTickets: 3750,
        certifications: 5625
      },
      metrics: {
        headcount: 90,
        projectCount: 12,
        avgSalary: 90000,
        costPerEmployee: 9375
      }
    }
  ]
};

export const Default: Story = {
  render: () => {
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');

    return (
      <div className="space-y-6">
        <DepartmentCostChart
          data={departmentCosts[timePeriod]}
          departments={departments}
          height={500}
          selectedDepartmentId={selectedDepartmentId}
          timePeriod={timePeriod}
          onTimePeriodChange={setTimePeriod}
          onDepartmentClick={setSelectedDepartmentId}
          onBackToOverview={() => setSelectedDepartmentId(undefined)}
        />
      </div>
    );
  }
};
