import Category from '@interfaces/category';
import PaymentMethod from '@/interfaces/payment-method';
import { User } from '@interfaces/auth';
import Transaction from '@interfaces/transaction';

export default interface AccountBook {
  name: string;
  startday: string;
  description: string;
  categories: Category[];
  payments: PaymentMethod[];
  users: User[];
  transactions: Transaction[];
}
