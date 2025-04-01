export interface SalesData {
  month: string;
  sales: number;
  returns: number;
}

export interface ProductPerformance {
  name: string;
  sales: number;
  stock: number;
  profit: number;
}

export interface ExpenseData {
  category: string;
  amount: number;
  color: string;
}

export interface CustomerStats {
  title: string;
  value: number;
  percentage: number;
  trend: 'up' | 'down';
}

export interface RecentTransaction {
  id: string;
  date: string;
  customer: string;
  amount: number;
  type: 'sale' | 'purchase' | 'return';
  status: 'completed' | 'pending' | 'cancelled';
}