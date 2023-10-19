import React, { ChangeEvent, useState } from 'react'
// import { Currencies, CurrencyContext, useCurrency } from '../../providers/Currencies'

// T, U, V, W, X, Y, Z
// TCode, TSymbol, TExchange

type DropdownProps<TKey extends string> = {
  items: { [key in TKey]: string } // COvariant (TS)
  onChanged: (key: TKey) => void // CONTRAVARIANT (TS)
}

export function Dropdown<TKey extends string>(props: DropdownProps<TKey>){
// export const Dropdown = <TKey>(props: DropdownProps<TKey>) => {
  // const currency = useContext(CurrencyContext) // WRONG
  // const currency = useCurrency()

  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as TKey
    props.onChanged(value)
    setValue(value)
  }

  return (
    <select value={ value } onChange={handleChange}>
      <option></option>
      {Object.entries(props.items).map(([key, value]) =>
        <option key={key} value={key}>{String(value)}</option>)}
    </select>
  )
}
