import React from 'react';

export default function HeaderButton({ buttonType, isChecked, onClickIcon }) {
  return (
    <div
      className={
        isChecked ? 'settingbar__navBtn checked' : 'settingbar__navBtn'
      }
      onClick={onClickIcon}
      data-type={buttonType}
    >
      {buttonType === 'user' && (
        <i data-type={buttonType} className="fas fa-users" />
      )}
      {buttonType === 'calendar' && (
        <i data-type="calendar" className="far fa-calendar-alt" />
      )}
      {buttonType === 'category' && (
        <i data-type="category" className="fas fa-boxes" />
      )}
      {buttonType === 'csv' && (
        <i data-type="csv" className="fas fa-file-csv" />
      )}
    </div>
  );
}
