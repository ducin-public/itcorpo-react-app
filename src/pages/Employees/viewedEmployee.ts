import { Employee } from "../../contract-types/data-contracts";

export type ViewedEmployee = Pick<Employee, 'id' | 'name' | 'position' | 'imgURL'>;
