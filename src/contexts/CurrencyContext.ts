export const Currencies = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
