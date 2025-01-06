import { useState } from 'react';
import { styles } from '../DesignEnums/MessageType';

export type CardInputLayout = 'SEPARATE' | 'STACKED'

interface CardInputProps {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  onChange: (values: { cardNumber: string; expiryDate: string; cvv: string }) => void;
  className?: string;
  layout?: CardInputLayout;
}

export const CardInput = ({ 
  cardNumber, 
  expiryDate, 
  cvv, 
  onChange, 
  className = '',
  layout = 'SEPARATE' 
}: CardInputProps) => {
  const [localCardNumber, setLocalCardNumber] = useState(cardNumber);
  const [localExpiryDate, setLocalExpiryDate] = useState(expiryDate);
  const [localCvv, setLocalCvv] = useState(cvv);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.substr(0, 2)}/${digits.substr(2, 2)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setLocalCardNumber(formatted);
    onChange({ cardNumber: formatted, expiryDate: localExpiryDate, cvv: localCvv });
  };

  const handleExpiryDateChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    setLocalExpiryDate(formatted);
    onChange({ cardNumber: localCardNumber, expiryDate: formatted, cvv: localCvv });
  };

  const handleCvvChange = (value: string) => {
    const formatted = value.replace(/\D/g, '').substr(0, 3);
    setLocalCvv(formatted);
    onChange({ cardNumber: localCardNumber, expiryDate: localExpiryDate, cvv: formatted });
  };

  const inputClassName = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${styles.ACCENT.focusRing} focus:border-transparent`;
  const labelClassName = `${styles.ACCENT.text} block text-sm font-medium mb-1`;

  const getInputClassName = (position?: 'first' | 'middle' | 'last') => {
    if (layout === 'SEPARATE') {
      return inputClassName;
    }

    const baseStackedClass = `w-full px-3 py-2 focus:outline-none focus:ring-2 ${styles.ACCENT.focusRing} focus:border-transparent border border-gray-300`;
    
    switch (position) {
      case 'first':
        return `${baseStackedClass} rounded-t-md border-b-0`;
      case 'middle':
        return `${baseStackedClass} rounded-bl-md border-r-0`;
      case 'last':
        return `${baseStackedClass} rounded-br-md`;
      default:
        return inputClassName;
    }
  };

  if (layout === 'STACKED') {
    return (
      <div className={className}>
        <label className={labelClassName}>Payment Card Details</label>
        <div className="grid gap-0">
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            className={getInputClassName('first')}
            value={localCardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="Card Number"
            maxLength={19}
            aria-label="Card Number"
          />
          <div className="grid grid-cols-2">
            <input
              id="expiryDate"
              type="text"
              inputMode="numeric"
              className={getInputClassName('middle')}
              value={localExpiryDate}
              onChange={(e) => handleExpiryDateChange(e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              aria-label="Expiry Date"
            />
            <input
              id="cvv"
              type="password"
              inputMode="numeric"
              className={getInputClassName('last')}
              value={localCvv}
              onChange={(e) => handleCvvChange(e.target.value)}
              placeholder="CVV"
              maxLength={3}
              aria-label="CVV"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid ${layout === 'SEPARATE' ? 'gap-4' : 'gap-0'} ${className}`}>
      <div>
        <label htmlFor="cardNumber" className={labelClassName}>Card Number</label>
        <input
          id="cardNumber"
          type="text"
          inputMode="numeric"
          className={getInputClassName('first')}
          value={localCardNumber}
          onChange={(e) => handleCardNumberChange(e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
      </div>
      <div className={layout === 'SEPARATE' ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-2'}>
        <div>
          <label htmlFor="expiryDate" className={labelClassName}>Expiry Date</label>
          <input
            id="expiryDate"
            type="text"
            inputMode="numeric"
            className={getInputClassName('middle')}
            value={localExpiryDate}
            onChange={(e) => handleExpiryDateChange(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
          />
        </div>
        <div>
          <label htmlFor="cvv" className={labelClassName}>CVV</label>
          <input
            id="cvv"
            type="password"
            inputMode="numeric"
            className={getInputClassName('last')}
            value={localCvv}
            onChange={(e) => handleCvvChange(e.target.value)}
            placeholder="123"
            maxLength={3}
          />
        </div>
      </div>
    </div>
  );
};
