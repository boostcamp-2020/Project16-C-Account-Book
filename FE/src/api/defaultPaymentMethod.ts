import { getFetch } from '../service/fetch';

export const getDefaultMethods = () => {
  const data = getFetch(`${process.env.SERVER_URL}/api/defaultPaymentMethod`);
  return data;
};
