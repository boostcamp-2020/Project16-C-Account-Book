import { getFetch, postFetch, deleteFetch } from '../service/fetch';

export const getAccountBookList = () => {
  const data = getFetch(`${process.env.SERVER_URL}/api/accountbook`);

  return data;
};

export const getTargetAccountBook = id => {
  const data = getFetch(`${process.env.SERVER_URL}/api/accountbook/${id}`);

  return data;
};

export const createAccountBook = ({ name, description }) => {
  const res = postFetch(`${process.env.SERVER_URL}/api/accountbook`, {
    name,
    description,
  });

  return res;
};

export const deleteAccountBook = id => {
  const data = deleteFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}`,
    {},
  );

  return data;
};
