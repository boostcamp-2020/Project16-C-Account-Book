import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getAccountBookList } from '../../../api/accoun-book-list';
import './accountBookList.scss';

export const AccountBookList = ({ datas, setDatas }) => {
  const history = useHistory();

  const setAccountBookList = async () => {
    const data = await getAccountBookList();

    setDatas(data.reverse());
  };

  const linkToDetail = async event => {
    history.push({
      pathname: '/calendar',
      state: {
        id: event.target.dataset.acbookid,
      },
    });
  };

  const deleteAccountBook = (id = '') => {
    setDatas(datas.filter(data => data._id !== id));
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
            data-acbookid={data._id}
            className="delete__button"
            onClick={() => deleteAccountBook(data._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AccountBookList;
