import { Payment, PaymentModel } from './schema';

const get = async (): Promise<Payment[]> => {
  const defaultPayments = await PaymentModel.find();
  return defaultPayments;
};

export default { get };
