import React from 'react';

import UserList from './UserList';
import InviteCode from './InviteCode';
import './userSetting.scss';

export default function UserSetting(props) {
  return (
    <div className="user__setting__container">
      <UserList />
      <InviteCode />
    </div>
  );
}
