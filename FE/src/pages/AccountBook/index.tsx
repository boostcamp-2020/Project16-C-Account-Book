import React, { useState } from 'react';

import AccountBookControl from '../../components/AccountBook/AccountBookControl';
import AccountBookList from '../../components/AccountBook/AccountBookList';
import AccountBookAddForm from '../../components/AccountBook/AccountBookAddForm';
import useLoginChcek from '../../service/useLoginCheck';

import './accountBookListPage.scss';

export default function AccountBookListPage() {
  const [create, setCreate] = useState(false);
  const [datas, setDatas] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const props = {
    create,
    datas,
    name,
    description,
    setCreate,
    setDatas,
    setName,
    setDescription,
  };

  useLoginChcek();

  return (
    <div className="acbook__list__container">
      <AccountBookControl setCreate={setCreate} />
      <div className="acbook__list">
        <AccountBookAddForm props={props} />
        <AccountBookList props={props} />
      </div>
    </div>
  );
}
