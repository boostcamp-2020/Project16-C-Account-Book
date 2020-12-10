import React, { useRef, useState, useEffect } from 'react';

import { createAccountBook } from '../../../api/accoun-book-list';
import { joinAccountBook } from '../../../api/social';
import './index.scss';

export default function AccountBookAddForm({
  setCreate,
  createForm,
  datas,
  setDatas,
}) {
  const accountBookInput = useRef();
  const inviteCodeInput = useRef();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onCreateAccountBook = async event => {
    if (event.key === 'Enter') {
      const res = await createAccountBook({ name, description });

      setCreate(false);
      setDatas([{ name, description, _id: res.data._id }, ...datas]);
    }
  };

  const onJoinAccountBook = async event => {
    if (event.key === 'Enter') {
      const res = await joinAccountBook({
        code: inviteCodeInput.current.value,
      });
      console.log(res);
      setCreate(false);
      setDatas([{ name, description, _id: res.data._id }, ...datas]);
    }
  };
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const cancleCreate = () => {
    setCreate(false);
  };

  useEffect(() => {
    if (createForm === 'create') {
      accountBookInput.current.focus();
    }
    if (createForm === 'join') {
      inviteCodeInput.current.focus();
    }
  }, [createForm]);
  return (
    <div className="create__acbook">
      {createForm === 'create' ? (
        <>
          <input
            className="input__name"
            ref={accountBookInput}
            value={name}
            type="text"
            name="title"
            placeholder="Enter AccountBook Title"
            onKeyPress={onCreateAccountBook}
            onChange={onChangeName}
            autoFocus
          />
          <textarea
            className="input__description"
            value={description}
            type="text"
            name="description"
            placeholder="Enter AccountBook Description"
            onKeyPress={onCreateAccountBook}
            onChange={onChangeDescription}
          />
        </>
      ) : (
        <>
          <input
            className="input__code"
            ref={inviteCodeInput}
            type="text"
            name="title"
            placeholder="Enter Invite Code"
            onKeyPress={onJoinAccountBook}
            onChange={onChangeName}
            autoFocus
          />
        </>
      )}

      <i className="fas fa-minus-circle" onClick={cancleCreate} />
    </div>
  );
}
