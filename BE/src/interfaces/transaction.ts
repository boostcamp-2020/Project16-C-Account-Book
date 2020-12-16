import Category from '@interfaces/category';
import PaymentMethod from '@interfaces/payment-method';

export default interface Transaction {
  content: string;
  type: string;
  category: { category: Category };
  cost: number;
  date: Date;
  payment: { payment: PaymentMethod };
  accountbook: string;
}
