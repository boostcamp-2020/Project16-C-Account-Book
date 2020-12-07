import React from 'react';
import './saveModal.scss';

export default function SaveModal({ saveAction, updateData, setSaveModal }) {
  const onClickSaveModalOk = () => {
    saveAction(updateData);
    setSaveModal(false);
  };

  const onClickOverlay = event => {
    if (event.target.classList.contains('save__modal__overlay')) {
      setSaveModal(false);
    }
  };

  const onClickSaveModalCancel = () => {
    setSaveModal(false);
  };

  return (
    <div className="save__modal__overlay" onClick={onClickOverlay}>
      <div className="save__modal__content">
        <div className="save__modal__title">변경사항을 저장 하시겠습니까?</div>
        <button className="save__ok__btn" onClick={onClickSaveModalOk}>
          Ok
        </button>
        <button className="save__cancel__btn" onClick={onClickSaveModalCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
