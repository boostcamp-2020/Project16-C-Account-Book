import React, { useState } from 'react';

import AccountBookControl from '../../components/AccountBook/AccountBookControl';
import AccountBookList from '../../components/AccountBook/AccountBookList';
import AccountBookAddForm from '../../components/AccountBook/AccountBookAddForm';
import useLoginChcek from '../../service/useLoginCheck';

import './accountBookListPage.scss';

export default function AccountBookListPage() {
  useLoginChcek();
  const [createForm, setCreateForm] = useState(false);
  const [listDatas, setListDatas] = useState([]);

  const onClickOverlay = event => {
    if (event.target.classList.contains('acbook__container')) {
      setCreateForm(false);
    }
  };
  return (
    <div className="acbook__list__container" onClick={onClickOverlay}>
      <AccountBookControl setCreateForm={setCreateForm} />
      <div className="acbook__list">
        {createForm && (
          <AccountBookAddForm
            setCreate={setCreateForm}
            createForm={createForm}
            datas={listDatas}
            setDatas={setListDatas}
          />
        )}
        <AccountBookList datas={listDatas} setDatas={setListDatas} />
      </div>
    </div>
  );
}
