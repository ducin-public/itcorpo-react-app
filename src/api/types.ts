export type Nationality = "US" | "UK" | "FR" | "DE" | "NL" | "PL" | "IT" | "ES";

export type BenefitServiceType = "lunch-card" | "healthcare" | "sport-system" | "cafeteria.io";

export type DateString = string;
export type Email = string;
export type Phone = string;
export type Money = number;

export type Skill = string;

export type ContractType = "contract" | "permanent";

export type Employee = {
  "@@type": "EMPLOYEE"
  readonly "id": number;
  "nationality": Nationality,
  "departmentId": number;
  "keycardId": string;
  "account": string;
  "salary": Money;
  "office": [string, string];
  "firstName": string;
  "lastName": string;
  "title": string;
  "contractType": ContractType;
  "email": Email;
  "hiredAt": DateString;
  "expiresAt": DateString;
  "personalInfo": {
    "age": number;
    "phone": Phone;
    "email": Email;
    "dateOfBirth": DateString;
    "address": {
      "street": string;
      "city": string;
      "country": string;
    };
  },
  "skills": Skill[];
  "bio": string;
};

export type Project = {
  "@@type": "PROJECT"
  "id": string;
  "name": string;
  "budget": Money;
  "startDate": string;
  "endDate": string;
  "team": {
    "id": number;
    "name": string;
  }[];
  "manager": number;
  "description": string;
};

export type Office = {
  "@@type": "OFFICE"
  "country": string;
  "city": string;
  "address": string;
  "estate": {
    "owner": string;
    "phone": Phone;
    "monthlyRental": number;
  };
};

export declare const employees: Employee[];
export declare const projects: Project[];
export declare const offices: Office[];

export const exampleEmployee = employees[0]
export const exampleProject = projects[0]
export const exampleOffice = offices[0]
