import React from 'react';

import ActionButton from '../../Common/ActionButton';
import { useThemeData } from '../../../store/Theme/themeHook';
import './index.scss';

export default function AccountBookControl({ setCreateForm }) {
  const theme = useThemeData(store => store.mode);
  const createAccountBook = () => {
    setCreateForm('create');
  };
  const joinAccountBook = () => {
    setCreateForm('join');
  };

  return (
    <div className="acbook__container">
      <div
        className={theme === 'dark' ? 'acbook__title' : 'acbook__title light'}
      >
        Account Book List
      </div>
      <div className="acbook__add__btn">
        <ActionButton type="large" content="Add" action={createAccountBook} />
        <ActionButton type="large" content="Join" action={joinAccountBook} />
      </div>
    </div>
  );
}
