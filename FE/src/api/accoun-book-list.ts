import { getFetch } from '../service/fetch';

export const getAccountBookList = () => {
  const data = getFetch(`${process.env.SERVER_URL}/api/accountbook`);

  return data;
};

export const getTargetAccountBook = id => {
  const data = getFetch(
    `${process.env.SERVER_URL}/api/accountbook?accountbookid=${id}`,
  );
  return data;
};
