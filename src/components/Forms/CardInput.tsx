import { controlStyles, styleConstants, styles } from '../DesignLanguage';
import { cn } from '../cn';

export type CardInputLayout = 'SEPARATE' | 'STACKED';

interface CardInputValues {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface CardInputProps extends CardInputValues {
  onChange: (values: CardInputValues) => void;
  className?: string;
  layout?: CardInputLayout;
  disabled?: boolean;
  error?: boolean;
}

const generateInputStyles = ({ 
  disabled, 
  error, 
  value,
  position,
  layout,
}: { 
  disabled?: boolean; 
  error?: boolean;
  value: string;
  position?: 'first' | 'middle' | 'last';
  layout: CardInputLayout;
}) => {
  const baseStyles = cn(
    controlStyles({ disabled, error, value: Boolean(value) }),
    styleConstants.CONTROL_HEIGHT,
    'w-full px-3 py-2 border',
    'focus:outline-none focus:ring-2 focus:border-transparent transition',
  );

  if (layout === 'SEPARATE') {
    return cn(baseStyles, 'rounded-md');
  }

  if (layout === 'STACKED') {
    return cn(
      baseStyles,
      {
        'rounded-t-md border-b-0': position === 'first',
        'rounded-bl-md border-r-0': position === 'middle',
        'rounded-br-md': position === 'last',
      }
    );
  }
};

export const CardInput = ({ 
  cardNumber,
  expiryDate,
  cvv,
  onChange,
  className = '',
  layout = 'SEPARATE',
  disabled = false,
  error = false,
}: CardInputProps) => {
  const labelClassName = cn(styleConstants.LABEL_TEXT_SIZE, 'block font-medium mb-1', styles.ACCENT.text);
  
  const handleCardNumberChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    const formatted = groups.join(' ').slice(0, 19);
    onChange({ cardNumber: formatted, expiryDate, cvv });
  };

  const handleExpiryDateChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const formatted = digits.length >= 2 
      ? `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
      : digits;
    onChange({ cardNumber, expiryDate: formatted, cvv });
  };

  const handleCvvChange = (value: string) => {
    const formatted = value.replace(/\D/g, '').slice(0, 3);
    onChange({ cardNumber, expiryDate, cvv: formatted });
  };

  if (layout === 'STACKED') {
    return (
      <div className={cn(styleConstants.CONTROL_OUTER_WRAPPER, className)}>
        <label className={labelClassName}>Payment Card Details</label>
        <div className="grid gap-0">
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            className={generateInputStyles({ disabled, error, value: cardNumber, position: 'first', layout })}
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="Enter Card Number..."
            maxLength={19}
            disabled={disabled}
            aria-label="Card Number"
          />
          <div className="grid grid-cols-2">
            <input
              id="expiryDate"
              type="text"
              inputMode="numeric"
              className={generateInputStyles({ disabled, error, value: expiryDate, position: 'middle', layout })}
              value={expiryDate}
              onChange={(e) => handleExpiryDateChange(e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              disabled={disabled}
              aria-label="Expiry Date"
            />
            <input
              id="cvv"
              type="password"
              inputMode="numeric"
              className={generateInputStyles({ disabled, error, value: cvv, position: 'last', layout })}
              value={cvv}
              onChange={(e) => handleCvvChange(e.target.value)}
              placeholder="CVV"
              maxLength={3}
              disabled={disabled}
              aria-label="CVV"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('mb-1 grid gap-2', className)}>
      <div>
        <label htmlFor="cardNumber" className={labelClassName}>Card Number</label>
        <input
          id="cardNumber"
          type="text"
          inputMode="numeric"
          className={generateInputStyles({ disabled, error, value: cardNumber, layout })}
          value={cardNumber}
          onChange={(e) => handleCardNumberChange(e.target.value)}
          placeholder="Enter Card Number..."
          maxLength={19}
          disabled={disabled}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className={labelClassName}>Expiry Date</label>
          <input
            id="expiryDate"
            type="text"
            inputMode="numeric"
            className={generateInputStyles({ disabled, error, value: expiryDate, layout })}
            value={expiryDate}
            onChange={(e) => handleExpiryDateChange(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            disabled={disabled}
          />
        </div>
        <div>
          <label htmlFor="cvv" className={labelClassName}>CVV</label>
          <input
            id="cvv"
            type="password"
            inputMode="numeric"
            className={generateInputStyles({ disabled, error, value: cvv, layout })}
            value={cvv}
            onChange={(e) => handleCvvChange(e.target.value)}
            placeholder="123"
            maxLength={3}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};
