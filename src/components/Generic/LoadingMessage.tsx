import { Loader2 } from 'lucide-react';
import { Paragraph } from '../Typography/Paragraph';
import { styles } from '../DesignLanguage';

interface LoadingMessageProps {
  message?: string;
}

export function LoadingMessage({ message = 'Loading...' }: LoadingMessageProps) {
  return (
    <div className="flex items-center justify-center space-x-2 p-4">
      <Loader2 className={`h-5 w-5 animate-spin ${styles.ACCENT.text}`} />
      <Paragraph size="SMALL" className="text-gray-600">
        {message}
      </Paragraph>
    </div>
  );
}
