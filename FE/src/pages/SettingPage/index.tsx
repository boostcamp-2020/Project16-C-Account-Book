import React, { useState } from 'react';

import SettingBar from '../../components/SettingBar';

import './settingPage.scss';

export default function SettingPage() {
  const [settingType, setSettingType] = useState('users');
  return (
    <div className="setting__page__wrapper">
      <SettingBar settingType={settingType} setSettingType={setSettingType} />
    </div>
  );
}
