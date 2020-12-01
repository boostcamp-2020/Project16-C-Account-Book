import React from 'react';
import { PlusCircleIcon } from '@primer/octicons-react';

import './AccountBookControl.scss';
import { AccountBookContext } from '../../../store/AccountBook/account-book.context.tsx';
import { useAccountBookData } from '../../../store/AccountBook/account-book.hook';

export default function AccountBookControl() {
  const store = React.useContext(AccountBookContext);
  // const isCreate = useAccountBookData(store => store.create);

  const createAccountBook = () => {
    store.create = true;
  };

  return (
    <div className="acbook__container">
      <h1 className="acbook__title">가계부 리스트</h1>
      <div className="acbook__control" onClick={createAccountBook}>
        <PlusCircleIcon className="acbook__plus" size={24} />
        <h2>새 가계부 추가</h2>
      </div>
    </div>
  );
}
