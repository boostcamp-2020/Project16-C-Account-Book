import { useEffect } from 'react';

import { useAccountBookData } from '../store/AccountBook/accountBookInfoHook';
import { useDateInfoData } from '../store/DateInfo/dateInfoHook';

const useAccountBook = accountBookId => {
  const setAccountBook = useAccountBookData(store => store.setAccountBook);
  const DateInfo = useDateInfoData(store => store.nowCalendarInfo);

  useEffect(() => {
    setAccountBook(accountBookId.id, DateInfo.year, DateInfo.month);
  }, []);
};

export default useAccountBook;
