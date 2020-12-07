import React from 'react';
import { useHistory } from 'react-router-dom';

import './settingBar.scss';

export default function SettingBar(props) {
  const history = useHistory();
  const id = history.location.state;

  const onClickBackBtn = event => {
    history.push({
      pathname: event.target.dataset.type,
      state: {
        id,
      },
    });
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
        <div className="settingbar__navBtn checked">
          <i className="fas fa-users" />
        </div>
        <div className="settingbar__navBtn checked">
          <i className="far fa-calendar-alt" />
        </div>
        <div className="settingbar__navBtn checked">
          <i className="fas fa-boxes" />
        </div>
        <div className="settingbar__navBtn checked">
          <i className="fas fa-file-csv" />
        </div>
      </div>
    </header>
  );
}
