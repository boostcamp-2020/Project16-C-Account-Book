import React from 'react';

import './categorySetting.scss';

export default function CategorySetting(props) {
  return (
    <div className="category__setting__container">
      <div className="income__category__setting">
        <div className="category__title">Income Category</div>
      </div>
      <div className="spending__category__setting">
        <div className="category__title">Spending Category</div>
      </div>
    </div>
  );
}
