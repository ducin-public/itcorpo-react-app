import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MessageType, borderStyle, typeIcons } from '../DesignEnums/MessageType';

export interface EntryProps {
  messageType: MessageType;
  label: string;
  children: ReactNode;
  to?: string;
}

export const Entry = ({ messageType, label, children, to }: EntryProps) => {
  // Ensure IconComponent exists and is valid
  if (!typeIcons[messageType]) {
    console.error(`No icon found for message type: ${messageType}`);
    return null;
  }

  const IconComponent = typeIcons[messageType];
  const content = (
    <>
      <div className="flex items-center gap-2">
        <IconComponent className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
        <p className="font-medium">{label}</p>
      </div>
      <p className="text-gray-600 mt-1">{children}</p>
    </>
  );

  if (to) {
    return (
      <Link 
        to={to} 
        className={`block border-l-4 pl-4 ${borderStyle[messageType]} hover:bg-gray-50 transition-colors cursor-pointer`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`block border-l-4 pl-4 ${borderStyle[messageType]}`}>
      {content}
    </div>
  );
};
