import { getAccountBookList } from '../../api/accoun-book-list';

export const createStore = () => {
  const store = {
    accountBooks: getAccountBookList(),
    create: false,
    array: [],
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
