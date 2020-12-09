import { getFetch, postFetch } from '../service/fetch';

export const getTransactionCSV = id => {
  const data = getFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/transaction/csv`,
  );

  return data;
};

export const postTransactionCSV = (id, body) => {
  const data = fetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/transaction/csv`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Cotent-type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    },
  );

  return data;
};
