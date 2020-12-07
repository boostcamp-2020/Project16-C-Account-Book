import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SettingBar from '../../components/SettingBar';

import UserSetting from '../../components/SettingContent/UserSetting';
import CalendarSetting from '../../components/SettingContent/CalendarSetting';
import CategorySetting from '../../components/SettingContent/CategorySetting';
import CSVSetting from '../../components/SettingContent/CSVSetting';
import useAccountBook from '../../service/useAccountBookSetting';

import './settingPage.scss';

export default function SettingPage() {
  const [settingType, setSettingType] = useState('calendar');
  const [saveModal, setSaveModal] = useState(false);
  const [saveAction, setSaveAction] = useState(null);
  const [updateData, setUpdateData] = useState({});

  const history = useHistory();
  const accountBookId = history.location.state;

  const onClickSaveModalOk = () => {
    saveAction(updateData);
    setSaveModal(false);
  };

  const onClickSaveModalCancel = () => {
    setSaveModal(false);
  };

  useAccountBook(accountBookId);
  return (
    <div className="setting__page__wrapper">
      <SettingBar
        accountBookId={accountBookId.id}
        settingType={settingType}
        setSettingType={setSettingType}
      />
      {settingType === 'user' && <UserSetting />}
      {settingType === 'calendar' && (
        <CalendarSetting
          accountBookId={accountBookId.id}
          setSaveModal={setSaveModal}
          setSaveAction={setSaveAction}
          setUpdateData={setUpdateData}
        />
      )}
      {settingType === 'category' && <CategorySetting />}
      {settingType === 'csv' && <CSVSetting />}
      {saveModal && (
        <div className="save__modal__overlay">
          <div className="save__modal__content">
            <div className="save__modal__title">
              변경사항을 저장 하시겠습니까?
            </div>
            <button className="save__ok__btn" onClick={onClickSaveModalOk}>
              Ok
            </button>
            <button
              className="save__cancel__btn"
              onClick={onClickSaveModalCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
