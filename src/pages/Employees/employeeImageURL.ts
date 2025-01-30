import { API_URL } from "../../api/client";
import { Employee } from "../../contract-types/data-contracts";

export const employeeImageURL = (employee: Pick<Employee, 'imgURL'>) => `${API_URL}/images/avatars/${employee.imgURL}`
