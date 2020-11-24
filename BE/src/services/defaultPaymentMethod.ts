import { DefaultPaymentMethodModel } from '@/models/defaultPaymentMethod';

const get = async (): Promise<any> => {
  const defaultPaymentMethods = await DefaultPaymentMethodModel.find();
  return defaultPaymentMethods;
};

export default { get };
