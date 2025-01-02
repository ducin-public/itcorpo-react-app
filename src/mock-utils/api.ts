import { 
  Employee, 
  Project, 
  Office, 
  Benefit, 
  FinancialSummary 
} from '.';
import { 
  generateEmployee, 
  generateProject, 
  generateOffice, 
  generateBenefit,
  generateFinancialSummary,
  delay 
} from './mockData';

// Simulate API endpoints with delayed responses
export const api = {
  employees: {
    list: async (): Promise<Employee[]> => {
      await delay();
      return Array.from({ length: 20 }, generateEmployee);
    },
    get: async (id: string): Promise<Employee> => {
      await delay();
      return generateEmployee();
    },
    create: async (data: Partial<Employee>): Promise<Employee> => {
      await delay();
      return { ...generateEmployee(), ...data };
    },
    update: async (id: string, data: Partial<Employee>): Promise<Employee> => {
      await delay();
      return { ...generateEmployee(), ...data, id };
    },
    delete: async (id: string): Promise<void> => {
      await delay();
    }
  },
  
  offices: {
    list: async (): Promise<Office[]> => {
      await delay();
      return Array.from({ length: 5 }, generateOffice);
    },
    get: async (id: string): Promise<Office> => {
      await delay();
      return generateOffice();
    },
    create: async (data: Partial<Office>): Promise<Office> => {
      await delay();
      return { ...generateOffice(), ...data };
    },
    update: async (id: string, data: Partial<Office>): Promise<Office> => {
      await delay();
      return { ...generateOffice(), ...data, id };
    },
    delete: async (id: string): Promise<void> => {
      await delay();
    }
  },
  
  benefits: {
    list: async (): Promise<Benefit[]> => {
      await delay();
      const employees = await api.employees.list();
      return employees.map(emp => generateBenefit(emp.id));
    },
    get: async (id: string): Promise<Benefit> => {
      await delay();
      return generateBenefit(id);
    },
    create: async (data: Partial<Benefit>): Promise<Benefit> => {
      await delay();
      return { ...generateBenefit(data.employeeId!), ...data };
    },
    update: async (id: string, data: Partial<Benefit>): Promise<Benefit> => {
      await delay();
      return { ...generateBenefit(data.employeeId!), ...data, id };
    },
    delete: async (id: string): Promise<void> => {
      await delay();
    }
  },
  
  finances: {
    getSummary: async (location: string): Promise<FinancialSummary> => {
      await delay();
      return generateFinancialSummary(location);
    }
  }
};