import mongoose from 'mongoose';

export interface DefaultPaymentMethod extends mongoose.Document {
  name: string;
  color: string;
}

const DefaultPaymentMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

export const DefaultPaymentMethodModel = mongoose.model<DefaultPaymentMethod>(
  'default_payment_methods',
  DefaultPaymentMethodSchema,
);
