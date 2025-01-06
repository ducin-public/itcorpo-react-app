import { X } from 'lucide-react';
import React, { useState } from 'react';

type SidebarScreenProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const SidebarScreen = ({ isOpen, onClose, children }: SidebarScreenProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-6 pt-16 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

type SidebarProps = Omit<SidebarScreenProps, 'isOpen' | 'onClose'> & {
  trigger: React.ReactNode;
};

export const Sidebar = ({ children, trigger }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      <SidebarScreen isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </SidebarScreen>
    </>
  );
};
