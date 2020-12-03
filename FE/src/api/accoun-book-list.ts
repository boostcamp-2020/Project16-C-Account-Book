import { getFetch, postFetch } from '../service/fetch';

export const getAccountBookList = async () => {
  const backendPath = process.env.BACKEND;
  const data = await getFetch(`${backendPath}/api/accountbook`);
  return data.reverse();
};
