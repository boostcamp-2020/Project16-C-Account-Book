import React from 'react';

import { joinAccountBook } from '../../../../api/social';
import './join-form.scss';

export default function JoinForm({
  confirmModal,
  setCreate,
  setDatas,
  setName,
  datas,
}) {
  const { setSaveModal, setSaveAction, setModalTitle } = confirmModal;
  const onJoinAccountBook = async event => {
    if (event.key === 'Enter') {
      const res = await joinAccountBook({
        code: event.target.value,
      });
      console.log(res);
      if (res.data) {
        setCreate(false);
        setDatas([
          {
            name: res.data[0].name,
            description: res.data[0].description,
            _id: res.data[0]._id,
          },
          ...datas,
        ]);
      } else {
        setModalTitle(
          () => '유효하지 않은 Invite Code입니다. 다시 확인해 주세요.',
        );
        setSaveModal(() => true);
        setSaveAction(() => () => {});
      }
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <input
      className="input__code"
      type="text"
      name="title"
      placeholder="Enter Invite Code"
      onKeyPress={onJoinAccountBook}
      onChange={onChangeName}
      autoFocus
    />
  );
}
