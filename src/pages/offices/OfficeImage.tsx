import { API_URL } from '../../api/config';
import { Office } from '../../api/dto';

import '../../shared/image.css'

type OfficeImageProps = {
  office: Office
}

export const OfficeImage = ({ office: o }: OfficeImageProps) =>
  <img
    className="thumb small"
    alt={`${o.city} thumbnail`}
    src={`${API_URL}/images/offices/${o.imgURL}`}
  />
