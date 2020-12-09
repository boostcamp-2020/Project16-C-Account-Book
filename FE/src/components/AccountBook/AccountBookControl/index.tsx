import React from 'react';

import ActionButton from '../../Common/ActionButton';
import './accountBookControl.scss';

export default function AccountBookControl({ setCreate }) {
  const createAccountBook = () => {
    setCreate(true);
  };

  return (
    <div className="acbook__container">
      <div className="acbook__title">Account Book List</div>
      <div className="acbook__add__btn">
        <ActionButton type="large" content="Add" action={createAccountBook} />
      </div>
    </div>
  );
}
