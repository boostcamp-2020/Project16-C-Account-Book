import React, { useRef } from 'react';

import './navButton.scss';

export default function NavButton({ chartType, setChartType }) {
  const buttonRef = useRef();

  const onClickCategoryButton = () => {
    setChartType('category');
  };

  const onClickDateButton = () => {
    setChartType('date');
  };

  return (
    <div ref={buttonRef} className="nav__buttons">
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
