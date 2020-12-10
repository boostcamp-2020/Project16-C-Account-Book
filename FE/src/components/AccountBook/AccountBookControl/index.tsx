import React from 'react';

import ActionButton from '../../Common/ActionButton';
import './accountBookControl.scss';

export default function AccountBookControl({ setCreateForm }) {
  const createAccountBook = () => {
    setCreateForm('create');
  };
  const joinAccountBook = () => {
    setCreateForm('join');
  };

  return (
    <div className="acbook__container">
      <div className="acbook__title">Account Book List</div>
      <div className="acbook__add__btn">
        <ActionButton type="large" content="Add" action={createAccountBook} />
        <ActionButton type="large" content="Join" action={joinAccountBook} />
      </div>
    </div>
  );
}
