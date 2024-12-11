import { API_URL } from "../../api/config";
import { Office } from "../../api/dto";

export const officeImageURL = (office: Office) => `${API_URL}/images/offices/${office.imgURL}`
