import React, { useRef, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useThemeData } from '../../../store/Theme/themeHook';
import HeaderButtons from './HeaderButtons';
import HeaderDate from './HeaderDate';
import ThemeButton from '../ThemeButton';
import './menubar.scss';

const MenuBar = ({ id, setModal, pageType }) => {
  const history = useHistory();
  const theme = useThemeData(store => store.mode);
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
    <header
      className={theme === 'dark' ? 'menubar__header' : 'menubar__header light'}
    >
      <div className="menubar__buttons" ref={allBtnRef}>
        <div
          className={pageType === '/' ? 'back__navBtn checked' : 'back__navBtn'}
          data-type="/"
          onClick={onClickIcon}
        >
          <i
            data-type="/"
            className={
              theme === 'dark' ? 'fas fa-arrow-left' : 'fas fa-arrow-left light'
            }
          />
          <span
            className={
              theme === 'dark'
                ? 'navigation__content'
                : 'navigation__content light'
            }
            data-type="/"
          >
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
          <span
            className={
              theme === 'dark'
                ? 'navigation__content'
                : 'navigation__content light'
            }
            data-type="/setting"
          >
            Setting
          </span>
          <i
            data-type="/setting"
            className={
              theme === 'dark'
                ? 'fas fa-arrow-right'
                : 'fas fa-arrow-right light'
            }
          />
        </div>
        <div className="header__theme">
          <ThemeButton />
        </div>
      </div>

      <HeaderDate id={id} pageType={pageType} />
    </header>
  );
};
export default MenuBar;
