import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '../cn';
import { styles, DesignSize } from '../DesignLanguage';

interface PaginationProps {
  /** Current page number (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Optional component size variant */
  size?: DesignSize;
  /** Optional class name for custom styling */
  className?: string;
}

const sizeStyles: Record<DesignSize, string> = {
  SMALL: 'h-8 w-8 text-sm',
  MEDIUM: 'h-10 w-10 text-base',
  LARGE: 'h-12 w-12 text-lg',
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  size = 'MEDIUM',
  className
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 4;
    const showEllipsisEnd = currentPage < totalPages - 3;

    if (showEllipsisStart) {
      pages.push(1);
      pages.push('...');
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(i);
    }

    if (showEllipsisEnd) {
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={cn("flex items-center justify-center space-x-2", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          sizeStyles[size],
          "flex items-center justify-center rounded-lg text-gray-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          styles.ACCENT.backgroundHover,
          styles.ACCENT.focusRing
        )}
      >
        <ChevronLeft className={sizeStyles[size]} />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={`${page}-${index}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={cn(
            sizeStyles[size],
            "flex items-center justify-center rounded-lg transition-colors",
            {
              [cn(styles.ACCENT.background, styles.ACCENT.text, 'font-extrabold')]: page === currentPage,
              [cn(styles.ACCENT.backgroundHover, 'hover:text-white')]: page !== currentPage && page !== '...',
              'cursor-default': page === '...',
            },
            styles.ACCENT.focusRing
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          sizeStyles[size],
          "flex items-center justify-center rounded-lg text-gray-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          styles.ACCENT.backgroundHover,
          styles.ACCENT.focusRing
        )}
      >
        <ChevronRight className={sizeStyles[size]} />
      </button>
    </nav>
  );
};
