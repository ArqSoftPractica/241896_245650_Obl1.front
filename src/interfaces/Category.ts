export interface Category {
  id: string;
  name: string;
  description: string;
  image: File | null;
  monthlySpendingLimit: number;
}
