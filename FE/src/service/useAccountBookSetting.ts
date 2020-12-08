import { useEffect } from 'react';

import { useAccountBookData } from '../store/AccountBook/accountBookInfoHook';

const useAccountBook = accountBookId => {
  const setAccountBook = useAccountBookData(store => store.setAccountBook);

  useEffect(() => {
    setAccountBook(accountBookId.id);
  }, []);
};

export default useAccountBook;
