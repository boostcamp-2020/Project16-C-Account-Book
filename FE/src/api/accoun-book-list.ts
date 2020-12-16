import { iAccountbookInput } from '@interfaces/accountbook';
import { iMonthAccountbookResponse } from '@interfaces/fetch';

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

export const getTargetAccountBook = async (
  id: string,
  year: number,
  month: number,
): Promise<iMonthAccountbookResponse> => {
  // /api/accountbook/:accountbookid/year/:year/month/:month

  const data = await getFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/year/${year}/month/${
      month + 1
    }`,
  );

  return data;
};

export const createAccountBook = ({ name, description }: iAccountbookInput) => {
  const res = postFetch(`${process.env.SERVER_URL}/api/accountbook`, {
    name,
    description,
  });

  return res;
};

export const updateAccountBook = ({
  accountBookId,
  name,
  description,
}: iAccountbookInput & { accountBookId: string }) => {
  const res = updateFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}`,
    {
      name,
      description,
    },
  );

  return res;
};

export const deleteAccountBook = (accountBookId: string) => {
  const data = deleteFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}`,
    {},
  );

  return data;
};
