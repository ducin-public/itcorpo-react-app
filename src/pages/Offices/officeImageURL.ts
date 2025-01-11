import { API_URL } from "../../api/client";
import { Office } from "../../contract-types/data-contracts";

export const officeImageURL = (office: Office) => `${API_URL}/images/offices/${office.imgURL}`
