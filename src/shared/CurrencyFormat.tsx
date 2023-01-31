import currency from 'currency.js'

type CurrencyFormatProps = {
  value: number
}

export const CurrencyFormat: React.FC<CurrencyFormatProps> = ({ value }) => {
  return <>{currency(value, { separator: ',', symbol: '€' }).format()}</>
}
