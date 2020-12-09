import React from 'react';
import './actionButton.scss';

export default function ActionButton({ type, content, action }) {
  const onClickAction = () => {
    action();
  };
  return (
    <button
      type="button"
      onClick={onClickAction}
      className={`action__button ${type}`}
    >
      {content}
    </button>
  );
}
