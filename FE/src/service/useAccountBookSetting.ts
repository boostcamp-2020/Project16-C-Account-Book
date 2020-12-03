import { useEffect } from 'react';

import { useTransactionData } from '../store/TransactionData/transactionInfoHook';

const useDefaultPayment = accountBookId => {
  const setAccountBook = useTransactionData(store => store.setAccountBook);

  useEffect(() => {
    setAccountBook(accountBookId.id);
  }, []);
};

export default useDefaultPayment;
