import PaymentModel from '@models/paymentmethod';

const get = async (): Promise<any> => {
  const defaultPaymentMethods = await PaymentModel.get();
  return defaultPaymentMethods;
};

export default { get };
