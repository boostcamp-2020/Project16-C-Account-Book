import iCategory from './category';
import iPayment from './payment';

export interface iTransaction {
  _id?: string;
  content: string;
  type: string;
  cost: number;
  date: string;
  category: iCategory;
  payment: iPayment;
}

export const initialTransaction = {
  _id: '',
  content: '',
  type: '',
  cost: 0,
  date: '',
  category: {
    _id: '',
    name: '',
    icon: 0,
    type: '',
  },
  payment: {
    _id: '',
    name: '',
    desc: '',
    color: '',
  },
};
