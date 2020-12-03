import React, { useState } from 'react';

import AccountBookControl from '../../components/AccountBook/AccountBookControl';
import AccountBookList from '../../components/AccountBook/AccountBookList';
import AccountBookAddForm from '../../components/AccountBook/AccountBookAddForm';
import useLoginChcek from '../../service/useLoginCheck';

import './accountBookListPage.scss';

export default function AccountBookListPage() {
  const [isCreate, setIsCreate] = useState(false);
  const [listDatas, setListDatas] = useState([]);

  useLoginChcek();

  return (
    <div className="acbook__list__container">
      <AccountBookControl setCreate={setIsCreate} />
      <div className="acbook__list">
        {isCreate && (
          <AccountBookAddForm
            setCreate={setIsCreate}
            datas={listDatas}
            setDatas={setListDatas}
          />
        )}
        <AccountBookList datas={listDatas} setDatas={setListDatas} />
      </div>
    </div>
  );
}
