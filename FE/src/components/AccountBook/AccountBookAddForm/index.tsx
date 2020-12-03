import React, { useRef, useState } from 'react';
import { createAccountBook } from '../../../api/accoun-book-list';
import './accountBookAddForm.scss';

export default function AccountBookAddForm({ setCreate, datas, setDatas }) {
  const accountBookInput = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onCreateAccountBook = async event => {
    if (event.key === 'Enter') {
      const res = await createAccountBook({ name, description });
      setCreate(false);
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
  );
}
