export interface Expense {
  id: number;
  date: Date;
  category: { id: number; name: string };
  description: string;
  amount: number;
}
