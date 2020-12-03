import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import getAccountBookList from '../../../api/accoun-book-list';
import './accountBookList.scss';
import AccountBookEditButton from '../AccountBookEditButton';
import AccountBookEditForm from '../AccountBookEditForm';

export const AccountBookList = ({ props }) => {
  const { datas, setDatas } = props;

  const setAccountBookList = async () => {
    const accountBookDatas = await getAccountBookList();

    accountBookDatas.map(data => (data.isEdit = false));
    setDatas(accountBookDatas);
  };

  const history = useHistory();

  const linkToDetail = event => {
    const targetClass = event.target.className;
    if (targetClass !== 'delete__button' && targetClass !== 'edit__button') {
      history.push(`calendar`);
    }
  };

  const deleteAccountBook = id => {
    setDatas(datas.filter(data => data._id !== id));
  };

  useEffect(() => {
    setAccountBookList();
  }, []);

  return (
    <>
      {datas.map((data, index) => (
        <div key={index}>
          {!data.isEdit ? (
            <>
              <div className="acbook" onClick={linkToDetail}>
                <h3>{data.name}</h3>
                <p>{data.description}</p>
                <button
                  className="delete__button"
                  onClick={event => deleteAccountBook(data._id, event)}
                >
                  Delete
                </button>
                <AccountBookEditButton data={data} props={props} />
              </div>
            </>
          ) : (
            <AccountBookEditForm data={data} props={props} />
          )}
        </div>
      ))}
    </>
  );
};

export default AccountBookList;
