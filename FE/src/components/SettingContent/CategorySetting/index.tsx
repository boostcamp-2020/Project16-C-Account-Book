import React from 'react';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';

import './categorySetting.scss';

export default function CategorySetting(props) {
  const incomeCategories = useTransactionData(store =>
    store.getIncomeCategories(),
  );
  const spendingCategories = useTransactionData(store =>
    store.getSpendingCategories(),
  );

  return (
    <div className="category__setting__container">
      <div className="income__category__setting">
        <div className="category__title">Income Category</div>
        {incomeCategories && (
          <div className="category__list">
            {incomeCategories.map(item => (
              <div className="category__unit" data-categoryid={item._id}>
                {item.name}
              </div>
            ))}
            <div className="category__unit__add">
              <i className="fas fa-plus-circle" />
            </div>
          </div>
        )}
      </div>
      <div className="spending__category__setting">
        <div className="category__title">Spending Category</div>
        {spendingCategories && (
          <div className="category__list">
            {spendingCategories.map(item => (
              <div className="category__unit" data-categoryid={item._id}>
                {item.name}
              </div>
            ))}
            <div className="category__unit__add">
              <i className="fas fa-plus-circle" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
