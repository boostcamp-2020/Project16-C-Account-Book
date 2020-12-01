export interface iTransactionItem {
  category: string;
  description: string;
  payment: string;
  cost: number;
}

export interface iTransactionsOfOneDay {
  day: number;
  transactions: Array<iTransactionItem>;
}
