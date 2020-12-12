import React, { useRef, useEffect } from 'react';

import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import ActionButton from '../../../Common/ActionButton';
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../../../api/category';

import { ResponseMessage } from '../../../../util/message';

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

  const incomeCategories = useAccountBookData(store =>
    store.getIncomeCategories(),
  );
  const spendingCategories = useAccountBookData(store =>
    store.getSpendingCategories(),
  );

  const changeCategories = useAccountBookData(store => store.createCategories);
  const updateTarget = useAccountBookData(store => store.updateCategory);
  const deleteTarget = useAccountBookData(store => store.deleteCategory);

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
  const onClickCreateBtn = async () => {
    try {
      const res = await createCategory({
        accountBookId,
        name: createRef.current.value,
        type: categoryType,
        icon: 1,
      });

      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }

      changeCategories(res.data);

      setModal(() => '');
    } catch (error) {
      throw new Error();
    }
  };

  const onClickUpdateBtn = async () => {
    try {
      const res = await updateCategory({
        accountBookId,
        categoryId,
        name: editRef.current.value,
        type: categoryType,
        icon: 1,
      });
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }

      updateTarget({
        categoryId,
        name: editRef.current.value,
        type: categoryType,
        icon: 1,
      });

      setModal(() => '');
    } catch (error) {
      throw new Error();
    }
  };

  const onClickDeleteBtn = async () => {
    try {
      const res = await deleteCategory({ accountBookId, categoryId });
      if (res.status !== ResponseMessage.success) {
        throw new Error();
      }

      deleteTarget({ categoryId });
      setModal(() => '');
    } catch (error) {
      throw new Error();
    }
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

              <ActionButton
                type="general"
                content="Create"
                action={onClickCreateBtn}
              />
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
                <ActionButton
                  type="general"
                  content="Update"
                  action={onClickUpdateBtn}
                />
                <ActionButton
                  type="general"
                  content="Delete"
                  action={onClickDeleteBtn}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
