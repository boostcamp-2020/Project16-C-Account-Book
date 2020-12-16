import { PaymentDoc } from '@/models/paymentmethod/schema';

import PaymentModel from '@/models/paymentmethod';

const get = async (): Promise<PaymentDoc[]> => {
  const defaultPaymentMethods = await PaymentModel.get();
  return defaultPaymentMethods;
};

export default { get };
