import { API_URL } from "../../api/client";
import { Office } from "../../api/data-contracts";

export const officeImageURL = (office: Office) => `${API_URL}/images/offices/${office.imgURL}`
