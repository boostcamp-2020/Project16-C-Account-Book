import {
  getFetch,
  postFetch,
  updateFetch,
  deleteFetch,
} from '../service/fetch';

export const createTransaction = async (accountbookId, transaction) => {
  const url = `${process.env.SERVER_URL}/api/accountbook/${accountbookId}/transaction`;
  const res = await postFetch(url, transaction);

  return res;
};

export const updateTransaction = async (accountbookId, transaction) => {
  const url = `${process.env.SERVER_URL}/api/accountbook/${accountbookId}/transaction/${transaction._id}`;
  const res = await updateFetch(url, transaction);

  return res;
};

export const deleteTransaction = async (accountbookId, transactionId) => {
  const url = `${process.env.SERVER_URL}/api/accountbook/${accountbookId}/transaction/${transactionId}`;
  const res = await deleteFetch(url, {});

  return res;
};
