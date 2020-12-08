import { updateFetch } from '../service/fetch';

export const updateStartDay = ({ accountBookId, startday }) => {
  const data = updateFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}/startday`,
    {
      startday,
    },
  );
  return data;
};
