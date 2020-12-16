import React from 'react';

import { joinAccountBook } from '../../../../api/social';
import './join-form.scss';

export default function JoinForm({ setCreate, setDatas, setName, datas }) {
  const onJoinAccountBook = async event => {
    if (event.key === 'Enter') {
      const res = await joinAccountBook({
        code: event.target.value,
      });
      console.log(res.data[0]);
      if (res.status === 200) {
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
        alert('Invalid Invite Code!!');
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
