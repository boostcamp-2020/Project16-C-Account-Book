import { PaymentMethod, DefaultPaymentMethodModel } from './schema';

const get = async (): Promise<PaymentMethod[]> => {
  const defaultPayments = await DefaultPaymentMethodModel.find();
  return defaultPayments;
};

export default { get };
