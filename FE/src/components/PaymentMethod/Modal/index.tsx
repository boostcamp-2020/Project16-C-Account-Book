import React, { useState } from 'react';

import AddTemplate from '../AddTemplate';
import CardContainer from '../CardContainer';
import NewMethod from '../NewMethod';
import ActionButton from '../../Common/ActionButton';
import SaveModal from '../../Common/SaveModal';
import './modal.scss';

export default function PaymentModal({
  setModal,
  defaultMethod,
}): React.ReactElement {
  const [addFormModal, setAddFormModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [saveAction, setSaveAction] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [modalTitle, setModalTitle] = useState('');

  const onClickNew = () => {
    setAddFormModal(() => !addFormModal);
  };

  const onClickOverlay = event => {
    if (event.target.dataset.overlay) setModal(false);
  };

  return (
    <>
      <div className="modal__wrapper" data-overlay onClick={onClickOverlay}>
        <span className="payment__title">Payment Method</span>
        <div className="payment__add__btn">
          <ActionButton type="large" content="Add" action={onClickNew} />
        </div>

        <CardContainer
          setSaveModal={setSaveModal}
          setSaveAction={setSaveAction}
          setUpdateData={setUpdateData}
          setModalTitle={setModalTitle}
        />
      </div>
      {addFormModal && <NewMethod defaultMethod={defaultMethod} />}
      {addFormModal && <AddTemplate setAddFormModal={setAddFormModal} />}
      {saveModal && (
        <SaveModal
          saveAction={saveAction}
          updateData={updateData}
          setSaveModal={setSaveModal}
          title={modalTitle}
        />
      )}
    </>
  );
}
