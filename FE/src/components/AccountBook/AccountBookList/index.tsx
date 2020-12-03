import React, { useEffect, isValidElement } from 'react';

import { useHistory } from 'react-router-dom';

import {
  getAccountBookList,
  deleteAccountBook,
} from '../../../api/accoun-book-list';
import './accountBookList.scss';

export const AccountBookList = ({ datas, setDatas }) => {
  const history = useHistory();

  const setAccountBookList = async () => {
    const accountBooks = await getAccountBookList();

    setDatas(accountBooks.data.reverse());
  };

  const linkToDetail = async event => {
    if (!event.target.classList.contains('delete__button')) {
      history.push({
        pathname: '/calendar',
        state: {
          id: event.target.dataset.acbookid,
        },
      });
    }
  };

  const onClickDelete = async event => {
    const accountBookId = event.target.dataset.id;
    const res = await deleteAccountBook(accountBookId);
    setDatas(datas.filter(data => data._id !== accountBookId));
  };

  useEffect(() => {
    setAccountBookList();
  }, []);

  return (
    <div className="acbook__list">
      {datas.map((data, index) => (
        <div
          key={data._id}
          className="acbook"
          data-acbookid={data._id}
          onClick={linkToDetail}
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <h3 data-acbookid={data._id}>{data.name}</h3>
          <p data-acbookid={data._id}>{data.description}</p>
          <button
            className="delete__button"
            data-id={data._id}
            onClick={onClickDelete}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AccountBookList;
