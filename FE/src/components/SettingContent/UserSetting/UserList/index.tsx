import React from 'react';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import ActionButton from '../../../Common/ActionButton';
import { dropAccountBook } from '../../../../api/social';
import './userList.scss';
import { useHistory } from 'react-router-dom';
import { useThemeData } from '../../../../store/Theme/themeHook';
import { ResponseMessage } from '../../../../util/message';

export default function UserList({ confirmModal }) {
  const { setSaveModal, setSaveAction, setModalTitle } = confirmModal;

  const theme = useThemeData(store => store.mode);
  const history = useHistory();
  const users = useAccountBookData(store => store.accountBook.users);
  const accountBookId = useAccountBookData(store => store.accountBook._id);

  const dropAction = async () => {
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
  const onClickDropBtn = async () => {
    setModalTitle(() => '정말 이 가계부에서 탈퇴하시겠습니까?');
    setSaveModal(() => true);
    setSaveAction(() => dropAction);
  };

  return (
    <div
      className={theme === 'dark' ? 'user__list__box' : 'user__list__box light'}
    >
      <div
        className={
          theme === 'dark' ? 'user__list__title' : 'user__list__title light'
        }
      >
        User List
        <div className="drop__btn">
          <ActionButton
            content="탈퇴하기"
            type="general"
            action={onClickDropBtn}
          />
        </div>
      </div>
      <div className="user__list__desc">
        You can see users in this Account Book.
      </div>
      <div className="user__list">
        {users &&
          users.map(user => (
            <div key={user.name} className="user__info">
              <img
                src={user.profile}
                className="profile__image"
                alt="profile__avatar"
              />
              <div className="user__name">{user.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
