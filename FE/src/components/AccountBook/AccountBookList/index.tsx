import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import { AccountBookContext } from '../../../store/AccountBook/account-book.context.tsx';
import './AccountBookList.scss';
import { postFetch } from '../../../service/fetch';
import { useAccountBookData } from '../../../store/AccountBook/account-book.hook';

export const AccountBookView: ReactElement<{
  datas: any[];
}> = ({ datas }) => {
  console.log('observe');
  const store = React.useContext(AccountBookContext);
  const history = useHistory();
  const linkToDetail = (id = '') => {
    history.push(`calendar/${id}`);
  };

  const deleteAccountBook = (id = '') => {
    datas = datas.filter(data => data._id !== id);
    console.log(datas);
    store.array = datas;
  };

  return (
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
  );
};

export const AccountBookList = () => {
  const store = React.useContext(AccountBookContext);
  const accountBookInput = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [datas, setDatas] = useState([]);

  const accountBookData = useAccountBookData(store => store.accountBooks);
  console.log(accountBookData);

  const getAccountBookList = async () => {
    const data = await accountBookData;
    console.log(data);
    setDatas(data);
    store.array = data;
  };

  const onCreateAccountBook = event => {
    if (event.key === 'Enter') {
      const accountBookBody = {
        name,
        description,
        transaction: [],
      };
      // postFetch(`${process.env.BACKEND}/api/accountbook`, accountBookBody);
      store.create = false;
      setName('');
      setDescription('');
      setDatas([{ name, description, transaction: [] }, ...datas]);
      store.array = [{ name, description, transaction: [] }, ...datas];
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const cancleCreate = () => {
    store.create = false;
  };

  useEffect(() => {
    console.log('useEffect');
    getAccountBookList();
  }, []);

  if (!store) throw Error("Store shouldn't be null");

  return useObserver(() => {
    return (
      <div className="acbook__list">
        {store.create ? (
          <div className="create__acbook">
            <input
              className="input__name"
              ref={accountBookInput}
              value={name}
              type="text"
              name="title"
              placeholder="Enter AccountBook Title"
              onKeyPress={onCreateAccountBook}
              onChange={onChangeName}
            />
            <textarea
              className="input__description"
              value={description}
              type="text"
              name="description"
              placeholder="Enter AccountBook Description"
              onKeyPress={onCreateAccountBook}
              onChange={onChangeDescription}
            />
            <p className="create__cancle" onClick={cancleCreate}>
              Cancle
            </p>
          </div>
        ) : null}
        {datas ? <AccountBookView datas={store.array} /> : null}
      </div>
    );
  });
};

export default AccountBookList;
