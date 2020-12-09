import React from 'react';

export default function IncomeCategory({
  incomeCategories,
  onClickUnit,
  onClickAddBtn,
}) {
  return (
    <div className="category__list">
      {incomeCategories.map(item => (
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
        data-type="수입"
        onClick={onClickAddBtn}
      >
        <i data-type="수입" className="fas fa-plus-circle" />
      </div>
    </div>
  );
}
