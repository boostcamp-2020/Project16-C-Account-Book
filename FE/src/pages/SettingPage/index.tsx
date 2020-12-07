import React, { useState } from 'react';

import SettingBar from '../../components/SettingBar';

import UserSetting from '../../components/SettingContent/UserSetting';
import CalendarSetting from '../../components/SettingContent/CalendarSetting';
import CategorySetting from '../../components/SettingContent/CategorySetting';
import CSVSetting from '../../components/SettingContent/CSVSetting';

import './settingPage.scss';

export default function SettingPage() {
  const [settingType, setSettingType] = useState('user');
  return (
    <div className="setting__page__wrapper">
      <SettingBar settingType={settingType} setSettingType={setSettingType} />
      {settingType === 'user' && <UserSetting />}
      {settingType === 'calendar' && <CalendarSetting />}
      {settingType === 'category' && <CategorySetting />}
      {settingType === 'csv' && <CSVSetting />}
    </div>
  );
}
