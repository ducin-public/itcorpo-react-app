import { apiClient } from './client';
import type { Geo, Expense, ExpenseInput } from './data-contracts';

export const getExpenses = () => {
  return apiClient.get<Expense[]>('/expenses')
    .then(res => res.data);
};

export const getExpense = (id: string) => {
  return apiClient.get<Expense>(`/expenses/${id}`)
    .then(res => res.data);
};

export const createExpense = (expense: ExpenseInput) => {
  return apiClient.post<Expense>('/expenses', expense)
    .then(res => res.data);
};

export const updateExpense = (id: string, expense: Partial<ExpenseInput>) => {
  return apiClient.patch<Expense>(`/expenses/${id}`, expense)
    .then(res => res.data);
};

export const deleteExpense = (id: string) => {
  return apiClient.delete(`/expenses/${id}`)
    .then(res => res.data);
};
