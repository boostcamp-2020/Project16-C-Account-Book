import { postFetch, updateFetch, deleteFetch } from '../service/fetch';

export const createPaymentMethod = ({ accountBookId, name, desc, color }) => {
  const data = postFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}/payment`,
    {
      name,
      desc,
      color,
    },
  );

  return data;
};

export const updatePaymentMethod = ({
  accountBookdId,
  paymentId,
  name,
  desc,
  color,
}) => {
  const res = updateFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookdId}/payment/${paymentId}`,
    {
      name,
      desc,
      color,
    },
  );

  return res;
};

export const deletePaymentMethod = ({ accountBookId, paymentId }) => {
  const data = deleteFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}/payment/${paymentId}`,
    {},
  );

  return data;
};
