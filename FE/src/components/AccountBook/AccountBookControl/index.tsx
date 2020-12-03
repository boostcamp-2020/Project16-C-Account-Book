import React from 'react';
import { PlusCircleIcon } from '@primer/octicons-react';

import './accountBookControl.scss';

export default function AccountBookControl({ setCreate }) {
  const createAccountBook = () => {
    setCreate(true);
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
