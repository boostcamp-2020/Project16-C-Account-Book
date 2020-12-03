import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useTransactionData } from '../../../store/TransactionData/transactionInfoHook';
import { getAccountBookList } from '../../../api/accoun-book-list';
import './accountBookList.scss';

export const AccountBookList = ({ datas, setDatas }) => {
  const history = useHistory();

  const setAccountBook = useTransactionData(store => store.setAccountBook);

  const setAccountBookList = async () => {
    const data = await getAccountBookList();

    setDatas(data.reverse());
  };

  const linkToDetail = async event => {
    setAccountBook(event.target.dataset.acbookid);
    history.push(`/calendar`);
  };

  const deleteAccountBook = (id = '') => {
    setDatas(datas.filter(data => data._id !== id));
  };

  useEffect(() => {
    setAccountBookList();
  }, []);

  return (
    <>
      {datas.map(data => (
        <div
          key={data._id}
          className="acbook"
          data-acbookid={data._id}
          onClick={linkToDetail}
        >
          <h3 data-acbookid={data._id}>{data.name}</h3>
          <p data-acbookid={data._id}>{data.description}</p>
          <button
            data-acbookid={data._id}
            className="delete__button"
            onClick={() => deleteAccountBook(data._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default AccountBookList;
