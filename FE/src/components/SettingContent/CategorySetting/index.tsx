import React, { useState } from 'react';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';

import CategoryModal from './CategoryModal';

import './categorySetting.scss';

export default function CategorySetting({ accountBookId }) {
  const [modal, setModal] = useState('');
  const [editContent, setEditContent] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const incomeCategories = useTransactionData(store =>
    store.getIncomeCategories(),
  );
  const spendingCategories = useTransactionData(store =>
    store.getSpendingCategories(),
  );

  const onClickAddBtn = event => {
    setModal(() => 'create');
    setCategoryType(() => event.target.dataset.type);
  };

  const onClickUnit = event => {
    setModal(() => 'update');
    setEditContent(() => event.target.textContent);
    setCategoryType(() => event.target.dataset.type);
    setCategoryId(() => event.target.dataset.categoryid);
  };

  return (
    <div className="category__setting__container">
      <div className="income__category__setting">
        <div className="category__title">Income Category</div>
        {incomeCategories && (
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
        )}
      </div>
      <div className="spending__category__setting">
        <div className="category__title">Spending Category</div>
        {spendingCategories && (
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
        )}
      </div>
      {modal && (
        <CategoryModal
          modal={modal}
          setModal={setModal}
          accountBookId={accountBookId}
          categoryType={categoryType}
          categoryId={categoryId}
          editContent={editContent}
        />
      )}
    </div>
  );
}
