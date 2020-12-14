import {
  getFetch,
  postFetch,
  updateFetch,
  deleteFetch,
} from '../service/fetch';

export const getAccountBookList = () => {
  const data = getFetch(`${process.env.SERVER_URL}/api/accountbook`);

  return data;
};

export const getTargetAccountBook = (id, year, month) => {
  // /api/accountbook/:accountbookid/transaction/year/:year/month/:month
  const data = getFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/transaction/year/${year}/month/${month}`,
  );

  return data;
};

export const createAccountBook = ({ name, description }) => {
  const res = postFetch(`${process.env.SERVER_URL}/api/accountbook`, {
    name,
    description,
  });

  return res;
};

export const updateAccountBook = ({ accountBookId, name, description }) => {
  const res = updateFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}`,
    {
      name,
      description,
    },
  );

  return res;
};

export const deleteAccountBook = id => {
  const data = deleteFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}`,
    {},
  );

  return data;
};
