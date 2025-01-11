import { API_URL } from "../../api/client";
import { Employee } from "../../contract-types/data-contracts";

export const employeeImageURL = (employee: Employee) => `${API_URL}/images/avatars/${employee.imgURL}`
