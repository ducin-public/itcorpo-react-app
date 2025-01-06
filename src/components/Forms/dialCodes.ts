export type CountryDialCode = {
    code: string;
    dialCode: string;
}

export type CountryDialCodeFormat = CountryDialCode & {
  name: string;
  flag: string;
  format: string;
};

export const countriesDialCodes: CountryDialCodeFormat[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States', dialCode: '+1', format: 'XXX XXX XXXX' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', dialCode: '+44', format: 'XXXX XXXXXX' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany', dialCode: '+49', format: 'XXXX XXXXXXX' },
  { code: 'FR', flag: '🇫🇷', name: 'France', dialCode: '+33', format: 'X XX XX XX XX' },
  { code: 'IT', flag: '🇮🇹', name: 'Italy', dialCode: '+39', format: 'XXX XXX XXXX' },
  { code: 'ES', flag: '🇪🇸', name: 'Spain', dialCode: '+34', format: 'XXX XXX XXX' },
  { code: 'PL', flag: '🇵🇱', name: 'Poland', dialCode: '+48', format: 'XXX XXX XXX' },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands', dialCode: '+31', format: 'XX XXXXXXXX' },
  { code: 'BE', flag: '🇧🇪', name: 'Belgium', dialCode: '+32', format: 'XXX XX XX XX' },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden', dialCode: '+46', format: 'XX XXX XXXX' },
  { code: 'NO', flag: '🇳🇴', name: 'Norway', dialCode: '+47', format: 'XXX XX XXX' },
  { code: 'DK', flag: '🇩🇰', name: 'Denmark', dialCode: '+45', format: 'XXXX XXXX' },
  { code: 'FI', flag: '🇫🇮', name: 'Finland', dialCode: '+358', format: 'XX XXX XXXX' },
  { code: 'CH', flag: '🇨🇭', name: 'Switzerland', dialCode: '+41', format: 'XX XXX XXXX' },
  { code: 'AT', flag: '🇦🇹', name: 'Austria', dialCode: '+43', format: 'XXX XXXXXX' },
  { code: 'IE', flag: '🇮🇪', name: 'Ireland', dialCode: '+353', format: 'XX XXX XXXX' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', dialCode: '+1', format: 'XXX XXX XXXX' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', dialCode: '+61', format: 'XXX XXX XXX' },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand', dialCode: '+64', format: 'X XXX XXXX' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan', dialCode: '+81', format: 'XX XXXX XXXX' },
];
