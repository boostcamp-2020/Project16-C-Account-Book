import { PaymentDoc, DefaultPaymentMethodModel } from './schema';

const get = async (): Promise<PaymentDoc[]> => {
  const defaultPayments = await DefaultPaymentMethodModel.find();
  return defaultPayments;
};

export default { get };
