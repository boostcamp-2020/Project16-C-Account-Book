import Category from '@interfaces/category';
import PaymentMethod from '@/interfaces/payment-method';
import { User } from '@interfaces/auth';

export default interface AccountBook {
  name: string;
  code: string;
  startday: string;
  description: string;
  categories: Category[];
  payments: PaymentMethod[];
  users: User[];
}
