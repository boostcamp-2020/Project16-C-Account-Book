interface iCategory {
  name: string;
  icon: number;
}

interface iPayment {
  card: number;
  description: string;
}

export interface iTransactionItem {
  _id?: string;
  content: string;
  type: string;
  cost: number;
  category: iCategory;
  payment: iPayment;
}

export interface iTransactionsOfOneDay {
  date: string;
  transactions: Array<iTransactionItem>;
}
