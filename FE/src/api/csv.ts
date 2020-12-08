import { getFetch, postFetch } from '../service/fetch';

export const getTransactionCSV = id => {
  const data = getFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/transaction/csv`,
  );

  return data;
};

export const postTransactionCSV = (id, formData) => {
  const data = fetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/transaction/csv`,
    {
      method: 'POST',
      body: formData,
      headers: {
        'Cotent-type': 'multipart/form-data',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    },
  );

  return data;
};
