import React, { useState, useRef, useEffect } from 'react';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';
import { createCategory } from '../../../api/category';
import './categorySetting.scss';

export default function CategorySetting({ accountBookId }) {
  const [modal, setModal] = useState('');
  const [editContent, setEditContent] = useState('');
  const [categoryType, setCategoryType] = useState('');

  const incomeCategories = useTransactionData(store =>
    store.getIncomeCategories(),
  );
  const spendingCategories = useTransactionData(store =>
    store.getSpendingCategories(),
  );
  const changeCategories = useTransactionData(store => store.setCategories);

  const createRef = useRef();
  const editRef = useRef();

  const onClickOverlay = () => {
    setModal('');
  };

  const modalSetting = () => {
    if (modal === 'create') {
      createRef.current.focus();
    }
    if (modal === 'update') {
      editRef.current.value = editContent;
      editRef.current.focus();
    }
  };

  const onClickAddBtn = event => {
    console.log(event.target.dataset.type);
    setModal(() => 'create');
    setCategoryType(() => event.target.dataset.type);
  };

  const onClickUnit = event => {
    setModal(() => 'update');
    setEditContent(() => event.target.textContent);
  };

  const onClickCreateBtn = () => {
    createCategory({
      accountBookId,
      name: createRef.current.value,
      type: categoryType,
      icon: 1,
    });

    changeCategories({
      name: createRef.current.value,
      type: categoryType,
      icon: 1,
    });

    setModal(() => '');
  };

  useEffect(() => {
    modalSetting();
  }, [modal, incomeCategories, spendingCategories]);

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
        <div className="category__modal__overlay" onClick={onClickOverlay}>
          <div className="category__modal" onClick={e => e.stopPropagation()}>
            {modal === 'create' ? (
              <>
                <div className="modal__title">Create</div>
                <div className="modal__contents">
                  <input
                    ref={createRef}
                    type="text"
                    className="create__category__input"
                    placeholder="Enter Category Name"
                  />
                  <button
                    className="category__create__btn"
                    onClick={onClickCreateBtn}
                  >
                    Create
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal__title">Edit</div>
                <div className="modal__contents">
                  <input
                    ref={editRef}
                    type="text"
                    className="edit__category__input"
                  />
                  <div className="category__edit__btns">
                    <button className="category__update__btn">Update</button>
                    <button className="category__delete__btn">Delete</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
