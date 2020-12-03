import React from 'react';

import AccountBookControl from '../../components/AccountBook/AccountBookControl';
import AccountBookList from '../../components/AccountBook/AccountBookList';
import './AccountBookListPage.scss';

export default function AccountBookListPage() {
  return (
    <div className="acbook__list__container">
      <AccountBookControl />
      <AccountBookList />
    </div>
  );
}
