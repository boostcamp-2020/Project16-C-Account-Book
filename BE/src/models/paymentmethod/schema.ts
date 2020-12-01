import mongoose from 'mongoose';

export interface PaymentMethod extends mongoose.Document {
  name: string;
  color: string;
  desc: string;
}

export const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  desc: { type: String, default: '' },
});

export const DefaultPaymentMethodModel = mongoose.model<PaymentMethod>(
  'default_payment_methods',
  Schema,
);
