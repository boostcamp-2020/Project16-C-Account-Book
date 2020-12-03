import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import getAccountBookList from '../../../api/accoun-book-list';
import './accountBookList.scss';
import { postFetch } from '../../../service/fetch';

export const AccountBookList = ({ datas, setDatas }) => {
  const setAccountBookList = async () => {
    const data = await getAccountBookList();
    setDatas(data);
  };

  const history = useHistory();
  const linkToDetail = () => {
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
      {datas ? (
        <>
          {datas.map(data => (
            <>
              <div className="acbook" onClick={() => linkToDetail()}>
                <h3>{data.name}</h3>
                <p>{data.description}</p>
              </div>
              <button
                className="delete__button"
                onClick={() => deleteAccountBook(data._id)}
              >
                Delete
              </button>
            </>
          ))}
        </>
      ) : null}
    </>
  );
};

export default AccountBookList;
