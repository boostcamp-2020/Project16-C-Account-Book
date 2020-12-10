import { getFetch } from '../service/fetch';

export const getInviteCode = ({ accountBookId }) => {
  const data = getFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}/code`,
  );
  return data;
};
