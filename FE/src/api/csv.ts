import { getFetch, postFetch } from '../service/fetch';

export const getTransactionCSV = id => {
  const data = getFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/transaction/csv`,
  );

  return data;
};

export const postTransactionCSV = async (id, body) => {
  const data = await postFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/transaction/csv`,
    body,
  );

  return data;
};
