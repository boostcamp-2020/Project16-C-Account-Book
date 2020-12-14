import React from 'react';

import { useThemeData } from '../../../store/Theme/themeHook';

import './theme-button.scss';

export default function ThemeButton(props) {
  const theme = useThemeData(store => store.mode);
  const changeTheme = useThemeData(store => store.changeMode);

  const onClickChangeTheme = () => {
    changeTheme();
  };

  return (
    <>
      {theme === 'dark' ? (
        <>
          <button
            className="theme__change__button"
            onClick={onClickChangeTheme}
          >
            <i className="fas fa-lightbulb" />
          </button>
        </>
      ) : (
        <>
          <button
            className="theme__change__button white"
            onClick={onClickChangeTheme}
          >
            <i className="fas fa-lightbulb" />
          </button>
        </>
      )}
    </>
  );
}
