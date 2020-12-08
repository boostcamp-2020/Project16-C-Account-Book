import React, { useState, useRef, useEffect } from 'react';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';
import { createCategory } from '../../../api/category';
import './categorySetting.scss';

export default function CategorySetting({
  accountBookId,
  setSaveModal,
  setUpdateData,
  setSaveAction,
}) {
  const [modal, setModal] = useState('create');
  const [editContent, setEditContent] = useState('');
  const incomeCategories = useTransactionData(store =>
    store.getIncomeCategories(),
  );
  const spendingCategories = useTransactionData(store =>
    store.getSpendingCategories(),
  );

  const createRef = useRef();
  const editRef = useRef();

  const onClickOverlay = () => {
    setModal('');
  };

  const modalSetting = () => {
    console.log(createRef);
    if (modal === 'create') {
      createRef.current.focus();
    }
    if (modal === 'update') {
      editRef.current.value = editContent;
      editRef.current.focus();
    }
  };

  const onClickAddBtn = () => {
    setModal('create');
  };

  const onClickUnit = event => {
    setModal(() => 'update');
    setEditContent(() => event.target.textContent);
  };

  useEffect(() => {
    modalSetting();
  }, [modal]);

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
            <div className="category__unit__add" onClick={onClickAddBtn}>
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
              <div
                className="category__unit"
                data-categoryid={item._id}
                onClick={onClickUnit}
              >
                {item.name}
              </div>
            ))}
            <div className="category__unit__add" onClick={onClickAddBtn}>
              <i className="fas fa-plus-circle" />
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
                  <button className="category__create__btn">Create</button>
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
                  <button className="category__update__btn">Update</button>
                  <button className="category__delete__btn">Delete</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
