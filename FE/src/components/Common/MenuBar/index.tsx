import React, { useRef, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import HeaderButtons from './HeaderButtons';
import HeaderDate from './HeaderDate';
import './menubar.scss';

const MenuBar = ({ id, setModal, pageType }) => {
  const history = useHistory();

  const allBtnRef = useRef();

  const onClickIcon = useCallback(event => {
    history.push({
      pathname: event.target.dataset.type,
      state: {
        id,
      },
    });
  }, []);

  return (
    <header className="menubar__header">
      <div className="menubar__buttons" ref={allBtnRef}>
        <div
          className={pageType === '/' ? 'back__navBtn checked' : 'back__navBtn'}
          data-type="/"
          onClick={onClickIcon}
        >
          <i data-type="/" className="fas fa-arrow-left" />
          <span className="navigation__content" data-type="/">
            List
          </span>
        </div>
        <HeaderButtons id={id} pageType={pageType} setModal={setModal} />
        <div
          className={
            pageType === '/setting'
              ? 'setting__navBtn checked'
              : 'setting__navBtn'
          }
          data-type="setting"
          onClick={onClickIcon}
        >
          <span className="navigation__content" data-type="/setting">
            Setting
          </span>
          <i data-type="/setting" className="fas fa-arrow-right" />
        </div>
      </div>

      <HeaderDate pageType={pageType} />
    </header>
  );
};
export default MenuBar;
