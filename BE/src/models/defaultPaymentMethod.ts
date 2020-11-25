import mongoose from 'mongoose';

export interface DefaultPaymentMethod extends mongoose.Document {
  name: string;
  color: string;
}

const DefaultPaymentMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
});

const DefaultPaymentMethodModel = mongoose.model<DefaultPaymentMethod>(
  'default_payment_methods',
  DefaultPaymentMethodSchema,
);

const getAllPaymentMethods = () => {
  try {
    return DefaultPaymentMethodModel.find();
  } catch (error) {
    return { statusCode: 500 };
  }
};

export default { getAllPaymentMethods };
