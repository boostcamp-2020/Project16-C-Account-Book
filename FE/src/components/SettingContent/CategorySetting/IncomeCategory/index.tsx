import React from 'react';

import { useThemeData } from '../../../../store/Theme/themeHook';

export default function IncomeCategory({
  incomeCategories,
  onClickUnit,
  onClickAddBtn,
}) {
  const theme = useThemeData(store => store.mode);
  return (
    <div className="category__list">
      {incomeCategories.map(item => (
        <div
          key={item._id}
          className={
            theme === 'dark' ? 'category__unit' : 'category__unit light'
          }
          data-categoryid={item._id}
          data-type={item.type}
          onClick={onClickUnit}
        >
          {item.name}
        </div>
      ))}
      <div
        className={
          theme === 'dark' ? 'category__unit__add' : 'category__unit__add light'
        }
        data-type="수입"
        onClick={onClickAddBtn}
      >
        <i
          data-type="수입"
          className={
            theme === 'dark' ? 'fas fa-plus-circle' : 'fas fa-plus-circle light'
          }
        />
      </div>
    </div>
  );
}
