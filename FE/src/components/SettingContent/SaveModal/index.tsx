import React from 'react';


import ActionButton from '../../Common/ActionButton';
import './saveModal.scss';

export default function SaveModal({ saveAction, updateData, setSaveModal }) {
  const onClickSaveModalOk = () => {
    saveAction(updateData);
    setSaveModal(false);
  };

  const onClickOverlay = event => {
    setSaveModal(false);
  };

  const onClickSaveModalCancel = () => {
    setSaveModal(false);
  };

  return (
    <div className="save__modal__overlay" onClick={onClickOverlay}>
      <div className="save__modal__content" onClick={e => e.stopPropagation()}>
        <div className="save__modal__title">변경사항을 저장 하시겠습니까?</div>

        <div className="save__ok__btn">
          <ActionButton
            type="general"
            content="Ok"
            action={onClickSaveModalOk}
          />
        </div>
        <div className="save__cancel__btn">
          <ActionButton
            type="general"
            content="Cancel"
            action={onClickSaveModalCancel}
          />
        </div>
      </div>
    </div>
  );
}
