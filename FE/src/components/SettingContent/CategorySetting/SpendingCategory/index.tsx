import React from 'react';
import { useThemeData } from '../../../../store/Theme/themeHook';

export default function SpendingCategory({
  spendingCategories,
  onClickUnit,
  onClickAddBtn,
}) {
  const theme = useThemeData(store => store.mode);
  return (
    <div
      className={theme === 'dark' ? 'category__list' : 'category__list light'}
    >
      {spendingCategories.map(item => (
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
        data-type="지출"
        onClick={onClickAddBtn}
      >
        <i
          data-type="지출"
          className={
            theme === 'dark' ? 'fas fa-plus-circle' : 'fas fa-plus-circle light'
          }
        />
      </div>
    </div>
  );
}
