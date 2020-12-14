import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAccountBookData } from '../../store/AccountBook/accountBookInfoHook';

import SettingButtons from './SettingButtons';
import ThemeButton from '../Common/ThemeButton';
import { useThemeData } from '../../store/Theme/themeHook';
import './settingBar.scss';

export default function SettingBar({ settingType, setSettingType }) {
  const history = useHistory();
  const theme = useThemeData(store => store.mode);
  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const onClickBackBtn = event => {
    history.push({
      pathname: event.target.dataset.type,
      state: {
        id: accountBookId,
      },
    });
  };

  return (
    <header
      className={
        theme === 'dark' ? 'settingbar__header' : 'settingbar__header light'
      }
    >
      <div className="settingbar__buttons">
        <div
          data-type="/calendar"
          className="settingbar__back__navBtn checked"
          onClick={onClickBackBtn}
        >
          <i
            data-type="/calendar"
            className={
              theme === 'dark' ? 'fas fa-arrow-left' : 'fas fa-arrow-left light'
            }
          />
          <span
            className={
              theme === 'dark'
                ? 'nav__accountbook__btn'
                : 'nav__accountbook__btn light'
            }
            data-type="/calendar"
          >
            Account Book
          </span>
        </div>

        <SettingButtons
          settingType={settingType}
          setSettingType={setSettingType}
        />
        <ThemeButton />
      </div>
    </header>
  );
}
