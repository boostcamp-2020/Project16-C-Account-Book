import React, { useState } from 'react';

import AccountBookControl from '../../components/AccountBook/AccountBookControl';
import AccountBookList from '../../components/AccountBook/AccountBookList';
import AccountBookAddForm from '../../components/AccountBook/AccountBookAddForm';
import useLoginChcek from '../../service/useLoginCheck';
import SaveModal from '../../components/Common/SaveModal';
import useSaveModal from '../../service/useSaveModal';
import './index.scss';

export default function AccountBookListPage() {
  useLoginChcek();
  const [createForm, setCreateForm] = useState(false);
  const [listDatas, setListDatas] = useState([]);
  const confirmModal = useSaveModal();

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
        <AccountBookList
          datas={listDatas}
          setDatas={setListDatas}
          confirmModal={confirmModal}
        />
      </div>
      {confirmModal.saveModal && (
        <SaveModal
          saveAction={confirmModal.saveAction}
          updateData={confirmModal.updateData}
          setSaveModal={confirmModal.setSaveModal}
          title={confirmModal.modalTitle}
        />
      )}
    </div>
  );
}
