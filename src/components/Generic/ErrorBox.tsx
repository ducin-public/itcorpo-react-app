import React from 'react';
import { AlertCircle } from 'lucide-react';
import { styles } from '../DesignLanguage/ColorVariants';

type ErrorBoxProps = {
  label?: React.ReactNode;
  message?: React.ReactNode;
  icon?: React.ReactNode;
};

const ErrorBox: React.FC<ErrorBoxProps> = ({
  label = 'Error',
  message,
  icon = <AlertCircle className="w-6 h-6 text-red-600" />,
}) => {
  return (
    <div className={`flex items-center p-4 border-l-4 ${styles.ALERT.border} bg-red-50 rounded-lg shadow-md`}>
      <div className="mr-3">
        {icon}
      </div>
      <div>
        <div className={`text-lg font-semibold ${styles.ALERT.text}`}>
          {label}
        </div>
        {message && <div className="text-sm text-red-700 mt-1">{message}</div>}
      </div>
    </div>
  );
};

export { ErrorBox };
