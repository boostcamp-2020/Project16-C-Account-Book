import mongoose from 'mongoose';
import { CategoryDoc, Schema as CategorySchema } from '@models/category/schema';
import {
  PaymentDoc,
  Schema as PaymentMethodSchema,
} from '@models/paymentmethod/schema';
import {
  TransactionDoc,
  Schema as TransactionSchema,
} from '@models/transaction/schema';
import { UserDoc, Schema as UserSchema } from '@models/user/schema';
import AccountBook from '@interfaces/accountbook';

export interface AccountBookDoc extends AccountBook, mongoose.Document {
  name: string;
  description: string;
  categories: CategoryDoc[];
  payments: PaymentDoc[];
  users: UserDoc[];
  transactions: TransactionDoc[];
}

interface AccountBookMod extends mongoose.Model<AccountBookDoc> {
  transactions(): Promise<any>;
}
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  categories: { type: [CategorySchema], default: [] },
  payments: { type: [PaymentMethodSchema], default: [] },
  users: { type: [UserSchema], required: true },
  transactions: { type: [TransactionSchema], default: [] },
});

Schema.statics.transactions = async function (_id: string) {
  const accountbook = await this.find({ _id });
  return accountbook.transactions;
};

export const AccountBookModel = mongoose.model<AccountBookDoc, AccountBookMod>(
  'accountbooks',
  Schema,
);
