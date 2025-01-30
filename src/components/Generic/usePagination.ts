import { useCallback, useState } from 'react';

export interface PaginationState {
  page: number;
  pageSize: number;
}

export interface UsePaginationProps {
  totalItems: number;
  maxPageSize: number;
  initialPage?: number;
}

export function usePagination({ 
  totalItems, 
  initialPage = 1,
  maxPageSize
}: UsePaginationProps) {
  const [state, setState] = useState<PaginationState>({
    page: initialPage,
    pageSize: maxPageSize
  });

  const totalPages = totalItems ? Math.ceil(totalItems / state.pageSize) : undefined;

  const setPage = useCallback((page: number) => {
    setState(prev => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setState(prev => ({ ...prev, pageSize }));
  }, []);

  return {
    ...state,
    totalPages,
    setPage,
    setPageSize,
  };
}
