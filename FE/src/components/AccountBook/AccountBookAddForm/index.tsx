import React, { useRef, useState, useEffect } from 'react';

import { createAccountBook } from '../../../api/accoun-book-list';
import './accountBookAddForm.scss';

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

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const cancleCreate = () => {
    setCreate(false);
  };

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
            onKeyPress={onCreateAccountBook}
            onChange={onChangeName}
          />
        </>
      )}

      <i className="fas fa-minus-circle" onClick={cancleCreate} />
    </div>
  );
}
