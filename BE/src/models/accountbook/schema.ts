import mongoose from 'mongoose';
import { Schema as CategorySchema } from '@models/category/schema';
import { Schema as PaymentMethodSchema } from '@models/paymentmethod/schema';
import { Schema as TransactionSchema } from '@models/transaction/schema';
import { Schema as UserSchema } from '@models/user/schema';
import AccountBook from '@interfaces/accountbook';

export interface AccountBookDoc extends AccountBook, mongoose.Document {}

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  categories: { type: [CategorySchema], default: [] },
  payments: { type: [PaymentMethodSchema], default: [] },
  users: { type: [UserSchema], required: true },
  transactions: { type: [TransactionSchema], default: [] },
});

export const AccountBookModel = mongoose.model<AccountBookDoc>(
  'accountbooks',
  Schema,
);
