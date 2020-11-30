import mongoose from 'mongoose';

export interface Payment extends mongoose.Document {
  name: string;
  color: string;
}

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

export const PaymentModel = mongoose.model<Payment>(
  'default_payment_methods',
  Schema,
);
