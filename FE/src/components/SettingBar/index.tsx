import React from 'react';
import { useHistory } from 'react-router-dom';

import HeaderButton from '../Common/HeaderButton';
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
          <span className="nav__accountbook__btn" data-type="/calendar">
            Account Book
          </span>
        </div>
        {settingType === 'user' ? (
          <HeaderButton buttonType="user" isChecked onClickIcon={onClickIcon} />
        ) : (
          <HeaderButton
            buttonType="user"
            isChecked={false}
            onClickIcon={onClickIcon}
          />
        )}

        {settingType === 'calendar' ? (
          <HeaderButton
            buttonType="calendar"
            isChecked
            onClickIcon={onClickIcon}
          />
        ) : (
          <HeaderButton
            buttonType="calendar"
            isChecked={false}
            onClickIcon={onClickIcon}
          />
        )}

        {settingType === 'category' ? (
          <HeaderButton
            buttonType="category"
            isChecked
            onClickIcon={onClickIcon}
          />
        ) : (
          <HeaderButton
            buttonType="category"
            isChecked={false}
            onClickIcon={onClickIcon}
          />
        )}

        {settingType === 'csv' ? (
          <HeaderButton buttonType="csv" isChecked onClickIcon={onClickIcon} />
        ) : (
          <HeaderButton
            buttonType="csv"
            isChecked={false}
            onClickIcon={onClickIcon}
          />
        )}
      </div>
    </header>
  );
}
