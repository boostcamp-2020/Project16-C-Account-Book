import React from 'react';
import './actionButton.scss';
import { useThemeData } from '../../../store/Theme/themeHook';

export default function ActionButton({ type, content, action }) {
  const theme = useThemeData(store => store.mode);
  const onClickAction = () => {
    action();
  };
  return (
    <button
      type="button"
      onClick={onClickAction}
      className={
        theme === 'dark'
          ? `action__button ${type}`
          : `action__button ${type} light`
      }
    >
      {content}
    </button>
  );
}
