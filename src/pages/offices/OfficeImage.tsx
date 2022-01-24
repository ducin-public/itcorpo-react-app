import React from 'react';

import { API_URL } from '../../api/config';
import { Office } from '../../typedef';

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
