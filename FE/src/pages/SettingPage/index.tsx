import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SettingBar from '../../components/SettingBar';

import UserSetting from '../../components/SettingContent/UserSetting';
import CalendarSetting from '../../components/SettingContent/CalendarSetting';
import CategorySetting from '../../components/SettingContent/CategorySetting';
import CSVSetting from '../../components/SettingContent/CSVSetting';
import useAccountBook from '../../service/useAccountBookSetting';
import SaveModal from '../../components/Common/SaveModal';
import useLoginCheck from '../../service/useLoginCheck';
import useSaveModal from '../../service/useSaveModal';

import { useThemeData } from '../../store/Theme/themeHook';
import './settingPage.scss';

export default function SettingPage() {
  useLoginCheck();

  const theme = useThemeData(store => store.mode);

  const [settingType, setSettingType] = useState('user');
  const confirmModal = useSaveModal();

  const history = useHistory();
  const accountBookId = history.location.state;

  useAccountBook(accountBookId);
  return (
    <div
      className={
        theme === 'dark'
          ? 'setting__page__wrapper'
          : 'setting__page__wrapper light'
      }
    >
      <SettingBar settingType={settingType} setSettingType={setSettingType} />
      {settingType === 'user' && <UserSetting confirmModal={confirmModal} />}
      {settingType === 'calendar' && (
        <CalendarSetting confirmModal={confirmModal} />
      )}

      {settingType === 'category' && <CategorySetting />}
      {settingType === 'csv' && <CSVSetting />}
      {confirmModal.saveModal && (
        <SaveModal
          saveAction={confirmModal.saveAction}
          updateData={confirmModal.updateData}
          setSaveModal={confirmModal.setSaveModal}
          title={confirmModal.modalTitle}
        />
      )}
    </div>
  );
}
