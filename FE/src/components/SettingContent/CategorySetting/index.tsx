import React, { useState } from 'react';

import { useAccountBookData } from '../../../store/AccountBook/accountBookInfoHook';
import { useThemeData } from '../../../store/Theme/themeHook';

import IncomeCategory from './IncomeCategory';
import SpendingCategory from './SpendingCategory';
import CategoryModal from './CategoryModal';

import './categorySetting.scss';

export default function CategorySetting() {
  const accountBookId = useAccountBookData(store => store.accountBook._id);
  const theme = useThemeData(store => store.mode);
  const [modal, setModal] = useState('');
  const [editContent, setEditContent] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const incomeCategories = useAccountBookData(store =>
    store.getIncomeCategories(),
  );
  const spendingCategories = useAccountBookData(store =>
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
    <div
      className={
        theme === 'dark'
          ? 'category__setting__container'
          : 'category__setting__container light'
      }
    >
      <div
        className={
          theme === 'dark'
            ? 'income__category__setting'
            : 'income__category__setting light'
        }
      >
        <div
          className={
            theme === 'dark' ? 'category__title' : 'category__title light'
          }
        >
          Income Category
        </div>
        {incomeCategories && (
          <IncomeCategory
            incomeCategories={incomeCategories}
            onClickUnit={onClickUnit}
            onClickAddBtn={onClickAddBtn}
          />
        )}
      </div>
      <div
        className={
          theme === 'dark'
            ? 'spending__category__setting'
            : 'spending__category__setting light'
        }
      >
        <div
          className={
            theme === 'dark' ? 'category__title' : 'category__title light'
          }
        >
          Spending Category
        </div>
        {spendingCategories && (
          <SpendingCategory
            spendingCategories={spendingCategories}
            onClickUnit={onClickUnit}
            onClickAddBtn={onClickAddBtn}
          />
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
