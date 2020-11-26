import DefaultPaymentMethodModel from '@/models/defaultPaymentMethod';

const get = async (): Promise<any> => {
  const defaultPaymentMethods = await DefaultPaymentMethodModel.getAllPaymentMethods();
  return defaultPaymentMethods;
};

export default { get };
