import React from 'react';

import UserList from './UserList';
import InviteCode from './InviteCode';
import './userSetting.scss';

export default function UserSetting({
  accountBookId,
  setSaveModal,
  setSaveAction,

  setModalTitle,
}) {
  return (
    <div className="user__setting__container">
      <UserList
        accountBookId={accountBookId}
        setSaveModal={setSaveModal}
        setSaveAction={setSaveAction}
        setModalTitle={setModalTitle}
      />
      <InviteCode />
    </div>
  );
}
