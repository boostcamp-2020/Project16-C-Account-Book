import React from 'react';
import { useThemeData } from '../../../store/Theme/themeHook';
import './headerButton.scss';

export default function HeaderButton({ buttonType, isChecked, onClickIcon }) {
  const theme = useThemeData(store => store.mode);

  return (
    <div
      className={isChecked ? 'header__navBtn checked' : 'header__navBtn'}
      onClick={onClickIcon}
      data-type={buttonType}
    >
      {buttonType === 'user' && (
        <i
          data-type={buttonType}
          className={theme === 'dark' ? 'fas fa-users' : 'fas fa-users light'}
        />
      )}
      {buttonType === 'calendar' && (
        <i
          data-type="calendar"
          className={
            theme === 'dark'
              ? 'far fa-calendar-alt'
              : 'far fa-calendar-alt light'
          }
        />
      )}
      {buttonType === 'category' && (
        <i
          data-type="category"
          className={theme === 'dark' ? 'fas fa-boxes' : 'fas fa-boxes light'}
        />
      )}
      {buttonType === 'csv' && (
        <i
          data-type="csv"
          className={
            theme === 'dark' ? 'fas fa-file-csv' : 'fas fa-file-csv light'
          }
        />
      )}
      {buttonType === 'transaction' && (
        <i
          data-type="transaction"
          className={
            theme === 'dark' ? 'fas fa-history' : 'fas fa-history light'
          }
        />
      )}
      {buttonType === 'chart' && (
        <i
          data-type="chart"
          className={
            theme === 'dark' ? 'far fa-chart-bar' : 'far fa-chart-bar light'
          }
        />
      )}
      {buttonType === 'paymentMethod' && (
        <i
          className={
            theme === 'dark' ? 'fas fa-credit-card' : 'fas fa-credit-card light'
          }
        />
      )}
    </div>
  );
}
