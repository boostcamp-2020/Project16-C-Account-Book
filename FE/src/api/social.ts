import { postFetch, deleteFetch } from '../service/fetch';

export const joinAccountBook = () => {
  const data = postFetch(
    `${process.env.SERVER_URL}/api/social/accountbook/user`,
    {},
  );
  return data;
};

export const dropAccountBook = ({ accountBookId }) => {
  const data = deleteFetch(
    `${process.env.SERVER_URL}/api/social/accountbook/${accountBookId}/user`,
    {},
  );
  return data;
};
