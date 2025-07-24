export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: 'Income' | 'Food' | 'Transport' | 'Shopping' | 'Utilities' | 'Entertainment' | 'Other';
  amount: number;
  type: 'income' | 'expense';
};

export type Budget = {
  category: Exclude<Transaction['category'], 'Income'>;
  limit: number;
  spent: number;
};
