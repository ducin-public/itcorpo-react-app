import { X } from 'lucide-react';
import React from 'react';

type SidebarScreenProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: React.ReactNode;
};

export const SidebarScreen = ({ isOpen, onClose, children, title }: SidebarScreenProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-1/2 h-full bg-white shadow-[rgba(0,0,0,0.3)_-2px_0px_8px_0px] transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex-1">{title}</div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-[calc(100%-73px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

type SidebarProps = Omit<SidebarScreenProps, 'isOpen' | 'onClose'> & {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
};

export const Sidebar = ({ children, setIsOpen, isOpen, title }: SidebarProps) => {
  return (
    <SidebarScreen 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      title={title}
    >
      {children}
    </SidebarScreen>
  );
};
