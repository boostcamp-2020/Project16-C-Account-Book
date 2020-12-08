import { postFetch, updateFetch, deleteFetch } from '../service/fetch';

export const createCategory = ({ accountBookId, name, type, icon }) => {
  const data = postFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}/category`,
    {
      name,
      type,
      icon,
    },
  );
  return data;
};

export const updateCategory = ({
  accountBookId,
  categoryId,
  name,
  type,
  icon,
}) => {
  const data = updateFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}/category/${categoryId}`,
    {
      name,
      type,
      icon,
    },
  );
  return data;
};

export const deleteCategory = ({ accountBookId, categoryId }) => {
  const data = deleteFetch(
    `${process.env.SERVER_URL}/api/accountbook/${accountBookId}/category/${categoryId}`,
    {},
  );
  return data;
};
