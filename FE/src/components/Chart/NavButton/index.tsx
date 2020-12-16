import React, { useRef } from 'react';
import { useThemeData } from '../../../store/Theme/themeHook';
import './navButton.scss';

export default function NavButton({ chartType, setChartType }) {
  const buttonRef = useRef();
  const theme = useThemeData(store => store.mode);

  const onClickCategoryButton = () => {
    setChartType('category');
  };

  const onClickDateButton = () => {
    setChartType('date');
  };

  return (
    <div
      ref={buttonRef}
      className={theme === 'dark' ? 'nav__buttons' : 'nav__buttons light'}
    >
      <button
        type="button"
        className={chartType === 'category' ? 'category selected' : 'category'}
        onClick={onClickCategoryButton}
      >
        By Category
      </button>
      <button
        type="button"
        className={chartType === 'date' ? 'date selected' : 'date'}
        onClick={onClickDateButton}
      >
        By Dates
      </button>
    </div>
  );
}
