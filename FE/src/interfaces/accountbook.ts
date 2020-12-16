import iCategory from './category';
import iPayment from './payment';
import iUser from './user';
import { iTransaction } from './transaction';

export default interface iAccountbook {
  _id?: string | null;
  code: string | null;
  name: string | null;
  startday: string | null;
  description: string | null;
  categories: iCategory[];
  payments: iPayment[];
  users: iUser[];
  transactions: iTransaction[];
}

export interface iAccountbookInput {
  name: string;
  description: string;
}

export interface iLocation {
  id: string;
}
