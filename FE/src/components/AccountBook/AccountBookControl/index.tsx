import React from 'react';
import { PlusCircleIcon } from '@primer/octicons-react';

import './accountBookControl.scss';

export default function AccountBookControl({ setCreate }) {
  const createAccountBook = () => {
    setCreate(true);
  };

  return (
    <div className="acbook__container">
      <div className="acbook__title">Account Book List</div>

      <button
        type="button"
        onClick={createAccountBook}
        className="new__accountbook"
      >
        Add
      </button>
    </div>
  );
}
