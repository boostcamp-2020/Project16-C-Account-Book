import { getFetch } from '../service/fetch';

export const getDefaultMethods = () => {
  const data = getFetch('http://localhost:3000/api/defaultPaymentMethod');
  return data;
};
