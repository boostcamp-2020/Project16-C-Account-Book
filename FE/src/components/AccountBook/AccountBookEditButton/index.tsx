import React from 'react';

import './accountBookEditButton.scss';

export default function AccountBookEditButton({ data, props }) {
  const { datas, setDatas, setName, setDescription } = props;

  const editAccountBook = id => {
    let newArr = [...datas];
    newArr.map(accountBook => {
      if (accountBook._id === id) {
        accountBook['isEdit'] = true;
      }
    });
    setName(data.name);
    setDescription(data.description);
    setDatas(newArr);
  };

  return (
    <button className="edit__button" onClick={() => editAccountBook(data._id)}>
      Edit
    </button>
  );
}
