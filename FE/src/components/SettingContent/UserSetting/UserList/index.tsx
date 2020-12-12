import React from 'react';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import ActionButton from '../../../Common/ActionButton';
import { dropAccountBook } from '../../../../api/social';
import './userList.scss';
import { useHistory } from 'react-router-dom';
import { ResponseMessage } from 'src/util/message';

export default function UserList(props) {
  const history = useHistory();
  const users = useAccountBookData(store => store.accountBook.users);
  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const onClickDropBtn = async () => {
    try {
      const res = await dropAccountBook({ accountBookId });
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }
      history.push('/');
    } catch (error) {
      throw new Error();
    }
  };
  return (
    <div className="user__list__box">
      <div className="user__list__title">User List</div>
      <div className="user__list__desc">
        You can see users in this Account Book
      </div>
      <div className="drop__btn">
        <ActionButton
          content="탈퇴하기"
          type="general"
          action={onClickDropBtn}
        />
      </div>
      {users &&
        users.map(user => (
          <div className="user__info">
            <img src={user.profile} className="profile__image" />
            <div className="user__name">{user.name}</div>
          </div>
        ))}
    </div>
  );
}
