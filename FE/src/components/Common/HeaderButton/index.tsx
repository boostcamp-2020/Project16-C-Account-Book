import React from 'react';
import './headerButton.scss';

export default function HeaderButton({ buttonType, isChecked, onClickIcon }) {
  return (
    <div
      className={isChecked ? 'header__navBtn checked' : 'header__navBtn'}
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
      {buttonType === 'transaction' && (
        <i data-type="transaction" className="fas fa-history" />
      )}
      {buttonType === 'chart' && (
        <i data-type="chart" className="far fa-chart-bar" />
      )}
      {buttonType === 'paymentMethod' && <i className="fas fa-credit-card" />}
    </div>
  );
}
