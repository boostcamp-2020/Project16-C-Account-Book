import { useEffect } from 'react';

import { useAccountBookData } from '../store/AccountBook/accountBookInfoHook';
import { useDateInfoData } from '../store/DateInfo/dateInfoHook';

const useAccountBook = accountBookId => {
  const setAccountBook = useAccountBookData(store => store.setAccountBook);
  const { year, month } = useDateInfoData(store => ({
    year: store.year,
    month: store.month,
  }));
  useEffect(() => {
    setAccountBook(accountBookId.id, year, month);
  }, []);
};

export default useAccountBook;
