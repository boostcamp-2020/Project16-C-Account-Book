import React, { useRef, useEffect } from 'react';

import { useTransactionData } from '../../../../store/AccountBook/accountBookInfoHook';

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../../../api/category';

import './categoryModal.scss';

export default function CategoryModal({
  modal,
  setModal,
  accountBookId,
  categoryType,
  categoryId,
  editContent,
}) {
  const createRef = useRef();
  const editRef = useRef();

  const incomeCategories = useTransactionData(store =>
    store.getIncomeCategories(),
  );
  const spendingCategories = useTransactionData(store =>
    store.getSpendingCategories(),
  );

  const changeCategories = useTransactionData(store => store.createCategories);
  const updateTarget = useTransactionData(store => store.updateCategory);
  const deleteTarget = useTransactionData(store => store.deleteCategory);

  const modalSetting = () => {
    if (modal === 'create') {
      createRef.current.focus();
    }
    if (modal === 'update') {
      editRef.current.value = editContent;
      editRef.current.focus();
    }
  };

  const onClickOverlay = () => {
    setModal('');
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

  const onClickUpdateBtn = () => {
    updateCategory({
      accountBookId,
      categoryId,
      name: editRef.current.value,
      type: categoryType,
      icon: 1,
    });

    updateTarget({
      categoryId,
      name: editRef.current.value,
      type: categoryType,
      icon: 1,
    });

    setModal(() => '');
  };

  const onClickDeleteBtn = () => {
    deleteCategory({ accountBookId, categoryId });
    deleteTarget({ categoryId });
    setModal(() => '');
  };

  useEffect(() => {
    modalSetting();
  }, [modal, incomeCategories, spendingCategories]);

  return (
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
                <button
                  className="category__update__btn"
                  onClick={onClickUpdateBtn}
                >
                  Update
                </button>
                <button
                  className="category__delete__btn"
                  onClick={onClickDeleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
