import React from 'react';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import ActionButton from '../../../Common/ActionButton';
import { dropAccountBook } from '../../../../api/social';
import './userList.scss';
import { useHistory } from 'react-router-dom';

export default function UserList(props) {
  const history = useHistory();
  const users = useAccountBookData(store => store.accountBook.users);
  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const onClickDropBtn = async () => {
    const res = await dropAccountBook({ accountBookId });

    history.push('/');
  };
  return (
    <div className="user__list__box">
      {users &&
        users.map(user => (
          <div className="user__info">
            <div>프로필사진</div>
            <div>{user.name}</div>
          </div>
        ))}
      <ActionButton content="탈퇴하기" type="large" action={onClickDropBtn} />
    </div>
  );
}
