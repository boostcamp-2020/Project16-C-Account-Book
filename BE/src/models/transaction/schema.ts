import mongoose from 'mongoose';
import { Schema as CategorySchema } from '@models/category/schema';
import { Schema as PaymentSchema } from '@models/paymentmethod/schema';
import Transaction from '@interfaces/transaction';

export interface TransactionDoc extends Transaction, mongoose.Document {}

export const Schema = new mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, required: true },
  cost: { type: Number, required: true },
  category: { type: CategorySchema, required: true },
  date: { type: String, required: true },
  payment: { type: PaymentSchema, required: true },
});

Schema.methods.getObjectId = function (): string {
  return this._id;
};

export const TransactionModel = mongoose.model<TransactionDoc>(
  'transactions',
  Schema,
);
