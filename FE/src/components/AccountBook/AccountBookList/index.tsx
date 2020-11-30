import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react-lite';

import { AccountBookContext } from '../../../store/AccountBook/account-book.context.tsx';
import styles from './AccountBookList.module.scss';
import { getAccountBookList } from '../../../api/accoun-book-list';
import { postFetch } from '../../../service/fetch';
import { useRootData } from '../../../store/AccountBook/account-book.hook';

export const AccountBookView: ReactElement<{
  datas: any[];
}> = ({ datas }) => {
  return (
    <>
      {datas.map(data => (
        <div className={styles.acbook}>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
        </div>
      ))}
    </>
  );
};

export const AccountBookList = () => {
  const store = React.useContext(AccountBookContext);
  const accountBookInput = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onCreateAccountBook = event => {
    if (event.key === 'Enter') {
      const accountBookBody = {
        name,
        description,
        transaction: [],
      };
      postFetch(`${process.env.BACKEND}/api/accountbook`, accountBookBody);
      store.Create = false;
      setName('');
      setDescription('');
      fetchAccountBooks();
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const cancleCreate = () => {
    store.Create = false;
  };

  const fetchAccountBooks = async () => {
    try {
      const datas = await getAccountBookList();
      store.AccountBooks = datas.reverse();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccountBooks();
  }, []);

  if (!store) throw Error("Store shouldn't be null");

  return useObserver(() => {
    return (
      <div className={styles.acbook__list}>
        {store.Create ? (
          <div className={styles.create__acbook}>
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
            <p className={styles.create__cancle} onClick={cancleCreate}>
              Cancle
            </p>
          </div>
        ) : null}
        <AccountBookView datas={store.AccountBooks} create={store.Create} />
      </div>
    );
  });
};

export default AccountBookList;
