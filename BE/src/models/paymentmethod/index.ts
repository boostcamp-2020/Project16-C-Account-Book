import { PaymentMethodDoc, DefaultPaymentMethodModel } from './schema';

const get = async (): Promise<PaymentMethodDoc[]> => {
  const defaultPayments = await DefaultPaymentMethodModel.find();
  return defaultPayments;
};

export default { get };
