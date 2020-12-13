import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SettingBar from '../../components/SettingBar';

import UserSetting from '../../components/SettingContent/UserSetting';
import CalendarSetting from '../../components/SettingContent/CalendarSetting';
import CategorySetting from '../../components/SettingContent/CategorySetting';
import CSVSetting from '../../components/SettingContent/CSVSetting';
import useAccountBook from '../../service/useAccountBookSetting';
import SaveModal from '../../components/SettingContent/SaveModal';
import useLoginCheck from '../../service/useLoginCheck';

import './settingPage.scss';

export default function SettingPage() {
  useLoginCheck();

  const [settingType, setSettingType] = useState('user');
  const [saveModal, setSaveModal] = useState(false);
  const [saveAction, setSaveAction] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [modalTitle, setModalTitle] = useState('');

  const history = useHistory();
  const accountBookId = history.location.state;

  useAccountBook(accountBookId);
  return (
    <div className="setting__page__wrapper">
      <SettingBar
        accountBookId={accountBookId.id}
        settingType={settingType}
        setSettingType={setSettingType}
      />
      {settingType === 'user' && (
        <UserSetting
          accountBookId={accountBookId.id}
          setSaveModal={setSaveModal}
          setSaveAction={setSaveAction}
          setModalTitle={setModalTitle}
        />
      )}
      {settingType === 'calendar' && (
        <CalendarSetting
          accountBookId={accountBookId.id}
          setSaveModal={setSaveModal}
          setSaveAction={setSaveAction}
          setUpdateData={setUpdateData}
          setModalTitle={setModalTitle}
        />
      )}

      {settingType === 'category' && (
        <CategorySetting accountBookId={accountBookId.id} />
      )}
      {settingType === 'csv' && <CSVSetting />}
      {saveModal && (
        <SaveModal
          saveAction={saveAction}
          updateData={updateData}
          setSaveModal={setSaveModal}
          title={modalTitle}
        />
      )}
    </div>
  );
}
