import React from 'react';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';

import './userList.scss';

export default function UserList(props) {
  const users = useAccountBookData(store => store.accountBook.users);

  return (
    <div className="user__list__box">
      {users &&
        users.map(user => (
          <div className="user__info">
            <div>프로필사진</div>
            <div>{user.name}</div>
          </div>
        ))}
    </div>
  );
}
