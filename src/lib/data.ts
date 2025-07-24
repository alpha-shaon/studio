import type { Transaction, Budget } from './types';

export const transactions: Transaction[] = [
  { id: '1', date: '2024-07-15', description: 'Monthly Salary', category: 'Income', amount: 5000, type: 'income' },
  { id: '2', date: '2024-07-16', description: 'Grocery Shopping', category: 'Food', amount: 150.75, type: 'expense' },
  { id: '3', date: '2024-07-16', description: 'Gasoline', category: 'Transport', amount: 45.50, type: 'expense' },
  { id: '4', date: '2024-07-17', description: 'New T-shirt', category: 'Shopping', amount: 29.99, type: 'expense' },
  { id: '5', date: '2024-07-18', description: 'Electricity Bill', category: 'Utilities', amount: 85.00, type: 'expense' },
  { id: '6', date: '2024-07-18', description: 'Movie Night', category: 'Entertainment', amount: 42.00, type: 'expense' },
  { id: '7', date: '2024-07-19', description: 'Lunch with friends', category: 'Food', amount: 65.20, type: 'expense' },
  { id: '8', date: '2024-07-20', description: 'Internet Bill', category: 'Utilities', amount: 60.00, type: 'expense' },
];

export const budgets: Budget[] = [
  { category: 'Food', limit: 500, spent: 215.95 },
  { category: 'Transport', limit: 150, spent: 45.50 },
  { category: 'Shopping', limit: 200, spent: 29.99 },
  { category: 'Utilities', limit: 250, spent: 145.00 },
  { category: 'Entertainment', limit: 100, spent: 42.00 },
  { category: 'Other', limit: 100, spent: 0 },
];
