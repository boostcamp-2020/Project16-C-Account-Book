import React, { useRef, useEffect } from 'react';

import './navButton.scss';

export default function NavButton({ chartType, setChartType }) {
  const buttonRef = useRef();

  const setButton = () => {
    buttonRef.current.childNodes.forEach(item => {
      if (item.classList.value === chartType) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  };

  const onClickCategoryButton = () => {
    setChartType('category');
  };

  const onClickDateButton = () => {
    setChartType('date');
  };

  useEffect(() => {
    setButton();
  }, [chartType]);

  return (
    <div ref={buttonRef} className="nav__buttons">
      <button
        type="button"
        className="category"
        onClick={onClickCategoryButton}
      >
        By Category
      </button>
      <button type="button" className="date" onClick={onClickDateButton}>
        By Dates
      </button>
    </div>
  );
}
