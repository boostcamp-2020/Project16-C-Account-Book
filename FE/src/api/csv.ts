import { getFetch, postFetch } from '../service/fetch';

export default function getTransactionCSV(id) {
  const data = getFetch(
    `${process.env.SERVER_URL}/api/accountbook/${id}/transaction/csv`,
  );

  return data;
}
