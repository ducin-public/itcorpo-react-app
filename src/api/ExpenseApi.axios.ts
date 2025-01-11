import { apiClient } from './client';
import { Expenses } from '../contract-types/ExpensesRoute';
import type { Expense, ExpenseInput } from '../contract-types/data-contracts';

/**
 * GET /expenses
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Expenses/operation/getExpenses
 * @see {@link Expense}
 * @returns {Promise<Expenses.GetExpenses.ResponseBody>}
 */
export const getExpenses = () => {
  return apiClient.get<Expenses.GetExpenses.ResponseBody>('/expenses')
    .then(res => res.data);
};

/**
 * GET /expenses/{expenseId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Expenses/operation/getExpenseById
 * @see {@link Expense}
 * @returns {Promise<Expenses.GetExpenseById.ResponseBody>}
 */
export const getExpenseById = ({ expenseId }: Expenses.GetExpenseById.RequestParams) => {
  return apiClient.get<Expenses.GetExpenseById.ResponseBody>(`/expenses/${expenseId}`)
    .then(res => res.data);
};

/**
 * POST /expenses
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Expenses/operation/createExpense
 * @see {@link ExpenseInput}
 * @see {@link Expense}
 * @returns {Promise<Expenses.CreateExpense.ResponseBody>}
 */
export const createExpense = (expenseData: Expenses.CreateExpense.RequestBody) => {
  return apiClient.post<Expenses.CreateExpense.ResponseBody>('/expenses', expenseData)
    .then(res => res.data);
};

/**
 * PATCH /expenses/{expenseId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Expenses/operation/updateExpense
 * @see {@link ExpenseInput}
 * @see {@link Expense}
 * @returns {Promise<Expenses.UpdateExpense.ResponseBody>}
 */
export const updateExpense = (
  { expenseId }: Expenses.UpdateExpense.RequestParams,
  expenseData: Expenses.UpdateExpense.RequestBody
) => {
  return apiClient.patch<Expenses.UpdateExpense.ResponseBody>(`/expenses/${expenseId}`, expenseData)
    .then(res => res.data);
};

/**
 * DELETE /expenses/{expenseId}
 * @see https://ducin-public.github.io/itcorpo-api/#tag/Expenses/operation/deleteExpense
 * @returns {Promise<Expenses.DeleteExpense.ResponseBody>}
 */
export const deleteExpense = ({ expenseId }: Expenses.DeleteExpense.RequestParams) => {
  return apiClient.delete<Expenses.DeleteExpense.ResponseBody>(`/expenses/${expenseId}`)
    .then(res => res.data);
};
