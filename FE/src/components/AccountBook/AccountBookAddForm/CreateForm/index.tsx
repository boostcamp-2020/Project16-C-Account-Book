import React, { useState } from 'react';

import { createAccountBook } from '../../../../api/accoun-book-list';
import { ResponseMessage } from '../../../../util/message';

import './create-form.scss';

export default function CreateForm({
  name,
  setName,
  setCreate,
  datas,
  setDatas,
}) {
  const [description, setDescription] = useState('');

  const onCreateAccountBook = async event => {
    if (event.key === 'Enter') {
      try {
        const res = await createAccountBook({ name, description });
        if (res.status !== ResponseMessage.success) {
          throw new Error();
        }

        setCreate(false);
        setDatas([
          {
            name: res.data.name,
            description: res.data.description,
            _id: res.data._id,
          },
          ...datas,
        ]);
      } catch (error) {
        throw new Error();
      }
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  return (
    <>
      <input
        className="input__name"
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
  );
}
