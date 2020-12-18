import React, { useState } from 'react';

import AccountBookControl from '../../components/AccountBook/AccountBookControl';
import AccountBookList from '../../components/AccountBook/AccountBookList';
import AccountBookAddForm from '../../components/AccountBook/AccountBookAddForm';
import useLoginChcek from '../../service/useLoginCheck';
import SaveModal from '../../components/Common/SaveModal';
import useSaveModal from '../../service/useSaveModal';
import ThemeButton from '../../components/Common/ThemeButton';
import { useThemeData } from '../../store/Theme/themeHook';

import './index.scss';

export default function AccountBookListPage() {
  useLoginChcek();
  const [createForm, setCreateForm] = useState(false);
  const [listDatas, setListDatas] = useState([]);
  const confirmModal = useSaveModal();
  const theme = useThemeData(store => store.mode);

  const onClickOverlay = event => {
    if (event.target.classList.contains('acbook__container')) {
      setCreateForm(false);
    }
  };

  return (
    <div
      className={
        theme === 'dark'
          ? 'acbook__list__container'
          : 'acbook__list__container light'
      }
      onClick={onClickOverlay}
    >
      <div className="acbook__list__theme">
        <ThemeButton />
      </div>

      <AccountBookControl setCreateForm={setCreateForm} />
      <div className="acbook__list">
        {createForm && (
          <AccountBookAddForm
            confirmModal={confirmModal}
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
