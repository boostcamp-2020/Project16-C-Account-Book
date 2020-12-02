import mongoose from 'mongoose';
import { Category, Schema as CategorySchema } from '@models/category/schema';
import {
  PaymentMethod,
  Schema as PaymentMethodSchema,
} from '@models/paymentmethod/schema';

import {
  Transaction,
  Schema as TransactionSchema,
} from '@models/transaction/schema';

export interface AccountBook extends mongoose.Document {
  name: string;
  description: string;
  categories: Category[];
  payments: PaymentMethod[];
  users: [string];
  transactions: Transaction[];
}

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  categories: { type: [CategorySchema], default: [] },
  payments: { type: [PaymentMethodSchema], default: [] },
  users: { type: [String], required: true },
  transactions: { type: [TransactionSchema], default: [] },
});

export const AccountBookModel = mongoose.model<AccountBook>(
  'accountbook',
  Schema,
);
