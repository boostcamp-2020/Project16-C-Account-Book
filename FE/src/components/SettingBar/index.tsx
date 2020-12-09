import React from 'react';
import { useHistory } from 'react-router-dom';

import './settingBar.scss';

export default function SettingBar({
  accountBookId,
  settingType,
  setSettingType,
}) {
  const history = useHistory();

  const onClickBackBtn = event => {
    history.push({
      pathname: event.target.dataset.type,
      state: {
        id: accountBookId,
      },
    });
  };

  const onClickIcon = event => {
    setSettingType(event.target.dataset.type);
  };

  return (
    <header className="settingbar__header">
      <div className="settingbar__buttons">
        <div
          data-type="/calendar"
          className="settingbar__back__navBtn checked"
          onClick={onClickBackBtn}
        >
          <i data-type="/calendar" className="fas fa-arrow-left" />
          <span data-type="/calendar">Account Book</span>
        </div>
        <div
          className={
            settingType === 'user'
              ? 'settingbar__navBtn checked'
              : 'settingbar__navBtn'
          }
          onClick={onClickIcon}
          data-type="user"
        >
          <i data-type="user" className="fas fa-users" />
        </div>
        <div
          className={
            settingType === 'calendar'
              ? 'settingbar__navBtn checked'
              : 'settingbar__navBtn'
          }
          onClick={onClickIcon}
          data-type="calendar"
        >
          <i data-type="calendar" className="far fa-calendar-alt" />
        </div>
        <div
          className={
            settingType === 'category'
              ? 'settingbar__navBtn checked'
              : 'settingbar__navBtn'
          }
          onClick={onClickIcon}
          data-type="category"
        >
          <i data-type="category" className="fas fa-boxes" />
        </div>
        <div
          className={
            settingType === 'csv'
              ? 'settingbar__navBtn checked'
              : 'settingbar__navBtn'
          }
          onClick={onClickIcon}
          data-type="csv"
        >
          <i data-type="csv" className="fas fa-file-csv" />
        </div>
      </div>
    </header>
  );
}
