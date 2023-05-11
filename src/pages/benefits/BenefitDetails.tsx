import { Benefit } from '../../api/dto'

import { CurrencyFormat } from '../../shared/CurrencyFormat';

type BenefitDetailsProps = {
  benefit: Benefit
}

export const BenefitDetails =
  ({ benefit: b }: BenefitDetailsProps) => <div>
    {b.beneficiary.name}
    {` `}
    {b.city}, {b.country}
    <div>
      {b.service}
      {` `}
      (<CurrencyFormat value={b.monthlyFee} />)
      </div>
  </div>
