import { useEffect } from 'react';

import { useTransactionData } from '../store/AccountBook/accountBookInfoHook';

const useAccountBook = accountBookId => {
  const setAccountBook = useTransactionData(store => store.setAccountBook);

  useEffect(() => {
    setAccountBook(accountBookId.id);
  }, []);
};

export default useAccountBook;
