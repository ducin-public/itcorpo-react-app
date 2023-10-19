import React, { createContext, useContext, useMemo, useState } from "react"

// make it PRIVATE
const Currencies = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  PLN: 'zł',
}
type CurrencyCode = keyof typeof Currencies
type ValueOf<T> = T[keyof T]
// make sure ext. -> .tsx

const exchangeRates: Record<keyof typeof Currencies, number> = {
  USD: 1.2,
  EUR: 1,
  GBP: 0.9,
  JPY: 130,
  PLN: 4.5,
}

// 3 items:
// - context itself - object
// - context provider - component
// - context subscriber - hook
// PATTERN: PUB(WRITE)-SUB(READ) / PROXY


// REQUIREMENTS:
// - default currency in API is EUR (drastic simplification)
// - converting is done client-side + its hardcoded (drastic simplification)
// - user needs to be able to CHOOSE a currency
// - user needs to see available currencies
// - after changing the currency, €9,374.00 -> 45,374.00zł converted IN ALL PLACES

// PUBLIC
// design-first approach
type CurrencyContextValue = {
  selectedCurrencyCode: CurrencyCode
  selectedCurrencySymbol: string
  // conversion function: (number, currFROM=EUR, currTO=selected) -> number
  convert(amount: number): number
  // setSelectedCurrencyCode: (code: string) => void // chooseCurrency
  setCurrency(curr: CurrencyCode): void
  availableCurrencies: typeof Currencies
}

// think of SERVICES (SOA)

// context itself - object:
// export const CurrencyContext = createContext<CurrencyContextValue>({
//   selectedCurrencyCode: 'EUR',
//   selectedCurrencySymbol: Currencies.EUR,
//   convert: (amount) => amount,
//   setCurrency: () => { },
//   availableCurrencies: ['EUR', 'USD', 'GBP', 'JPY', 'PLN'],
// })
export const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined)
// const I18nContext = createContext(null)
// const ThemeContext = createContext(null)

// what does context change, compared to props drilling
// what people get WRONG: context is a state management solution
// context is an alternative TRANSPORT solution (alternative to props drilling)

// context provider - component:
export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props

  const [chosenCurrency, setChosenCurrency] = useState<CurrencyCode>('EUR') //
  const ctxValue = useMemo(() => ({
    selectedCurrencyCode: chosenCurrency,
    selectedCurrencySymbol: Currencies[chosenCurrency], // derivative -> redundant useState should NOT be used
    convert: (amount: number) => amount * exchangeRates[chosenCurrency],
    setCurrency: setChosenCurrency,
    availableCurrencies: Currencies,
  }), [chosenCurrency])

  return <CurrencyContext.Provider value={ctxValue}>
    {children}
    {/* <Fadebox /> FIXED CSS position */}
  </CurrencyContext.Provider>
}

// context subscriber - hook
export const useCurrency = () => {
  const ctx = useContext(CurrencyContext)
  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  // modify ctx
  return ctx
}

// const useConvertedCurrencyAmount = (amount: number) => {
//   const { convert, selectedCurrencySymbol } = useCurrency()
//   return `${convert(amount)}${selectedCurrencySymbol}`
// }
