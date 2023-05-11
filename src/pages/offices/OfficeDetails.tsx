import { Office } from '../../api/dto'

import { CurrencyFormat } from '../../shared/CurrencyFormat';

import '../../shared/image.css'
import { OfficeImage } from './OfficeImage';

type OfficeDetailsProps = {
  office: Office
}

export const OfficeDetails =
  ({ office: o }: OfficeDetailsProps) => <div>
    <strong>{o.city}, {o.country}</strong>
    {` `}
    <div>
      {o.address}
    </div>
    {` `}
    (rental: <CurrencyFormat value={o.estate.monthlyRental} />)
      <div>
      <OfficeImage office={o} />
    </div>
  </div>
