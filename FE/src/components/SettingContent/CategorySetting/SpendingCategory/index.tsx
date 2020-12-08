import React from 'react';

export default function SpendingCategory({
  spendingCategories,
  onClickUnit,
  onClickAddBtn,
}) {
  return (
    <div className="category__list">
      {spendingCategories.map(item => (
        <div
          className="category__unit"
          data-categoryid={item._id}
          data-type={item.type}
          onClick={onClickUnit}
        >
          {item.name}
        </div>
      ))}
      <div
        className="category__unit__add"
        data-type="지출"
        onClick={onClickAddBtn}
      >
        <i data-type="지출" className="fas fa-plus-circle" />
      </div>
    </div>
  );
}
