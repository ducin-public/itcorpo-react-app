import { faker } from '@faker-js/faker';
import { 
  Employee, 
  Project, 
  Office, 
  Benefit, 
  BenefitType,
  FinancialSummary 
} from '../types';

const SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'Java', 'SQL', 'AWS', 'Docker', 'Kubernetes',
  'GraphQL', 'REST API', 'MongoDB', 'Redis', 'CI/CD'
];

const COUNTRIES = ['USA', 'UK', 'Germany', 'France', 'Japan', 'Canada', 'Australia'];

const BENEFIT_PROVIDERS = {
  health: ['Blue Cross', 'Aetna', 'UnitedHealth'],
  dental: ['Delta Dental', 'MetLife', 'Guardian'],
  vision: ['VSP', 'EyeMed', 'Davis Vision'],
  life: ['Prudential', 'MetLife', 'AIG']
};

export function generateEmployee(): Employee {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.helpers.arrayElement(COUNTRIES),
      zipCode: faker.location.zipCode()
    },
    department: faker.commerce.department(),
    position: faker.person.jobTitle(),
    skills: faker.helpers.arrayElements(SKILLS, { min: 3, max: 8 }),
    salary: faker.number.int({ min: 50000, max: 150000 }),
    hireDate: faker.date.past().toISOString(),
    profileImage: faker.image.avatar()
  };
}

export function generateProject(): Project {
  const employees = Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, generateEmployee);
  
  return {
    id: faker.string.uuid(),
    name: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    budget: faker.number.int({ min: 50000, max: 1000000 }),
    startDate: faker.date.past().toISOString(),
    endDate: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(['planning', 'active', 'completed', 'on-hold']),
    employees
  };
}

export function generateOffice(): Office {
  return {
    id: faker.string.uuid(),
    name: faker.company.name() + ' Office',
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.helpers.arrayElement(COUNTRIES),
      zipCode: faker.location.zipCode()
    },
    capacity: faker.number.int({ min: 50, max: 500 }),
    monthlyCost: faker.number.int({ min: 10000, max: 100000 }),
    image: faker.image.urlLoremFlickr({ category: 'office' }),
    amenities: faker.helpers.arrayElements([
      'Gym', 'Cafeteria', 'Game Room', 'Parking',
      'Conference Rooms', 'Lounge', 'Bike Storage'
    ])
  };
}

export function generateBenefit(employeeId: string): Benefit {
  const type = faker.helpers.arrayElement(['health', 'dental', 'vision', 'life'] as BenefitType[]);
  
  return {
    id: faker.string.uuid(),
    type,
    provider: faker.helpers.arrayElement(BENEFIT_PROVIDERS[type]),
    description: faker.lorem.sentence(),
    monthlyFee: faker.number.int({ min: 100, max: 1000 }),
    coverageDetails: faker.lorem.paragraph(),
    employeeId,
    startDate: faker.date.past().toISOString(),
    endDate: faker.helpers.arrayElement([null, faker.date.future().toISOString()])
  };
}

export function generateFinancialSummary(location: string): FinancialSummary {
  const employeeCosts = faker.number.int({ min: 100000, max: 1000000 });
  const officeCosts = faker.number.int({ min: 50000, max: 500000 });
  const benefitCosts = faker.number.int({ min: 20000, max: 200000 });
  
  return {
    period: faker.date.recent().toISOString(),
    employeeCosts,
    officeCosts,
    benefitCosts,
    total: employeeCosts + officeCosts + benefitCosts,
    location
  };
}

export function delay(ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}