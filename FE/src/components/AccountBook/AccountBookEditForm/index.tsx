import React, { useRef, useEffect } from 'react';

import './accountBookEditForm.scss';

export default function AccountBookEditForm({ data, props }) {
  const { datas, setDatas, name, setName, description, setDescription } = props;
  const accountBookInput = useRef();

  const onEditAccountBook = event => {
    if (event.key === 'Enter') {
      const id = event.target.dataset.id;
      const accountBookBody = {
        name,
        description,
      };
      //   const response = updateFetch(
      //     `${process.env.SERVER_URL}/api/accountbook/${id}`,
      // accountBookBody,
      //   );
      let newArr = [...datas];
      newArr.map(accountBook => {
        if (accountBook._id === id) {
          accountBook['isEdit'] = false;
          accountBook['name'] = name;
          accountBook['description'] = description;
        }
      });
      setName('');
      setDescription('');
      setDatas(newArr);
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const cancleEdit = id => {
    let newArr = [...datas];
    newArr.map(data => {
      if (data._id === id) {
        data['isEdit'] = false;
      }
    });
    setDatas(newArr);
  };

  useEffect(() => {
    accountBookInput.current.focus();
  }, []);

  return (
    <div className="edit__acbook">
      <input
        className="input__name"
        ref={accountBookInput}
        value={name}
        type="text"
        name="title"
        onKeyPress={onEditAccountBook}
        onChange={onChangeName}
        data-id={data._id}
      />
      <textarea
        className="input__description"
        value={description}
        type="text"
        name="description"
        onKeyPress={onEditAccountBook}
        onChange={onChangeDescription}
        data-id={data._id}
      />
      <p className="edit__cancle" onClick={() => cancleEdit(data._id)}>
        Cancle
      </p>
    </div>
  );
}
