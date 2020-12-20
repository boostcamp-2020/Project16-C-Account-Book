import React, { useEffect } from 'react';

import AccountBookCard from './AccountBookCard';
import { getAccountBookList } from '../../../api/accoun-book-list';

import { ResponseMessage } from '../../../util/message';

import './index.scss';

export const AccountBookList = ({ datas, setDatas, confirmModal }) => {
  const setAccountBookList = async () => {
    try {
      const accountBooks = await getAccountBookList();

      if (accountBooks.status !== ResponseMessage.success) {
        throw new Error();
      }

      setDatas(accountBooks.data);
    } catch (err) {
      throw new Error();
    }
  };

  useEffect(() => {
    setAccountBookList();
  }, []);

  return (
    <>
      {datas.map((acbook, index) => (
        <AccountBookCard
          key={acbook._id}
          confirmModal={confirmModal}
          index={index}
          acbook={acbook}
          setDatas={setDatas}
          datas={datas}
        />
      ))}
    </>
  );
};

export default AccountBookList;
