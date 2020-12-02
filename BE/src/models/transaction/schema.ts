import mongoose from 'mongoose';
import { Category, Schema as CategorySchema } from '@models/category/schema';
import {
  PaymentMethod,
  Schema as PaymentSchema,
} from '@models/paymentmethod/schema';

export interface Transaction extends mongoose.Document {
  content: string;
  type: string;
  category: { category: Category };
  cost: number;
  date: Date;
  payment: { payment: PaymentMethod };
}

export const Schema = new mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, required: true },
  cost: { type: Number, required: true },
  category: { type: CategorySchema, required: true },
  date: { type: Date, required: true },
  payment: { type: PaymentSchema, required: true },
});

export const TransactionModel = mongoose.model<Transaction>(
  'transactions',
  Schema,
);
