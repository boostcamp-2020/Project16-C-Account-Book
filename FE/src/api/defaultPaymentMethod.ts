import { getFetch } from '../service/fetch';

export const getDefaultMethods = () => {
  const serverUrl = process.env.SERVER_URL;
  const data = getFetch(serverUrl + '/api/defaultPaymentMethod');
  return data;
};
