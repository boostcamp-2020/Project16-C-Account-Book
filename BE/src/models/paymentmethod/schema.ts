import mongoose from 'mongoose';
import PaymentMethod from '@interfaces/payment-method';

export interface PaymentDoc extends PaymentMethod, mongoose.Document {}

export const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  desc: { type: String, default: '' },
});

export const DefaultPaymentMethodModel = mongoose.model<PaymentDoc>(
  'default_payment_methods',
  Schema,
);
