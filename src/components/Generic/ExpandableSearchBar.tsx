import React, { createContext, useContext, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import { styles } from '../DesignLanguage';

type SearchBarMode = 'COLLAPSED' | 'EXPANDED';

interface ExpandableSearchBarContextType {
  mode: SearchBarMode;
  toggleMode: () => void;
}

const ExpandableSearchBarContext = createContext<ExpandableSearchBarContextType | undefined>(undefined);

interface ExpandableSearchBarProps {
  children: React.ReactNode;
}

export function ExpandableSearchBar({ children }: ExpandableSearchBarProps) {
  const [mode, setMode] = useState<SearchBarMode>('COLLAPSED');

  const toggleMode = () => setMode(mode === 'COLLAPSED' ? 'EXPANDED' : 'COLLAPSED');

  return (
    <ExpandableSearchBarContext.Provider value={{ mode, toggleMode }}>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        {children}
      </div>
    </ExpandableSearchBarContext.Provider>
  );
}

interface BaseRowProps {
  children: React.ReactNode;
  className?: string;
}

function BaseRow({ children, className = '' }: BaseRowProps) {
  return (
    <div className={`flex gap-4 mt-4 ${className}`}>
      {children}
    </div>
  );
}

function ToggleButton() {
  const context = useContext(ExpandableSearchBarContext);
  if (!context) throw new Error('Must be used within ExpandableSearchBar');

  return (
    <button
      onClick={context.toggleMode}
      className={`w-12 h-12 mt-5 p-2 rounded-full transition-transform ${
        context.mode === 'EXPANDED' ? 'rotate-90' : ''
      } ${styles.ACCENT.textHover}`}
    >
      <ChevronRight className="h-8 w-8" />
    </button>
  );
}

interface ExpandedContentProps {
  children: React.ReactNode;
}

function ExpandedContent({ children }: ExpandedContentProps) {
  const context = useContext(ExpandableSearchBarContext);
  if (!context) throw new Error('Must be used within ExpandableSearchBar');

  if (context.mode !== 'EXPANDED') return null;

  return (
    <div className="flex items-start space-x-4 pt-4 border-t border-gray-100">
      {children}
    </div>
  );
}

ExpandableSearchBar.BaseRow = BaseRow;
ExpandableSearchBar.ToggleButton = ToggleButton;
ExpandableSearchBar.ExpandedContent = ExpandedContent;
