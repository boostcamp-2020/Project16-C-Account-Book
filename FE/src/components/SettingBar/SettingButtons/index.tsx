import React from 'react';
import HeaderButton from '../../Common/HeaderButton';

import './setting-buttons.scss';

export default function SettingButtons({ settingType, setSettingType }) {
  const onClickIcon = event => {
    setSettingType(event.target.dataset.type);
  };

  return (
    <>
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
    </>
  );
}
