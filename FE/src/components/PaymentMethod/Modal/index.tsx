import React, { useState } from 'react';

import AddTemplate from '../AddTemplate';
import CardContainer from '../CardContainer';
import NewMethod from '../NewMethod';
import ActionButton from '../../Common/ActionButton';
import SaveModal from '../../Common/SaveModal';
import useSaveModal from '../../../service/useSaveModal';
import './modal.scss';

export default function PaymentModal({
  setModal,
  defaultMethod,
}): React.ReactElement {
  const [addFormModal, setAddFormModal] = useState(false);
  const confirmModal = useSaveModal();

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

        <CardContainer confirmModal={confirmModal} />
      </div>
      {addFormModal && <NewMethod defaultMethod={defaultMethod} />}
      {addFormModal && <AddTemplate setAddFormModal={setAddFormModal} />}
      {confirmModal.saveModal && (
        <SaveModal
          saveAction={confirmModal.saveAction}
          updateData={confirmModal.updateData}
          setSaveModal={confirmModal.setSaveModal}
          title={confirmModal.modalTitle}
        />
      )}
    </>
  );
}
