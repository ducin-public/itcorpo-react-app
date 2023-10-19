import React from "react";
import currency from 'currency.js'
import { useCurrency } from "../providers/Currencies";

type CurrencyFormatProps = {
  value: number
}

export const CurrencyFormat: React.FC<CurrencyFormatProps> = ({ value }) => {
  const { convert, selectedCurrencySymbol } = useCurrency()
  return <>{currency(convert(value), { separator: ',', symbol: selectedCurrencySymbol }).format()}</>
}