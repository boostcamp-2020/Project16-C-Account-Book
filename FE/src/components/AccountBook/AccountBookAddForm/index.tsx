import React, { useEffect, useRef, useState } from 'react';

import { postFetch } from '../../../service/fetch';
import './accountBookAddForm.scss';

export default function AccountBookAddForm({
  create,
  setCreate,
  datas,
  setDatas,
}) {
  const accountBookInput = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onCreateAccountBook = event => {
    if (event.key === 'Enter') {
      const accountBookBody = {
        name,
        description,
      };
      //   const response = postFetch(
      //     `${process.env.SERVER_URL}/api/accountbook`,
      // accountBookBody,
      //   );
      setCreate(false);
      setName('');
      setDescription('');
      setDatas([{ name, description }, ...datas]);
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
    <>
      {create ? (
        <div className="create__acbook">
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
          <p className="create__cancle" onClick={cancleCreate}>
            Cancle
          </p>
        </div>
      ) : null}
    </>
  );
}
