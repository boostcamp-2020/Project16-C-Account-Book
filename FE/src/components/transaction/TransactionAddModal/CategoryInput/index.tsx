import React, { ChangeEvent } from 'react';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';

import './index.scss';

const CategoryInput = ({ categoryPool }: { categoryPool: Array<any> }) => {
  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const onCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetElement = e.target as HTMLInputElement;
    const newCategory = {
      name: targetElement.dataset.name,
      icon: targetElement.dataset.icon,
    };
    setInput({ ...input, category: { ...newCategory } });
  };

  return (
    <div className="item category__input">
      <div className="indicator">카테고리</div>

      <div className="row" id="category__input__container">
        {categoryPool ? (
          categoryPool.map(({ name, icon }) => (
            <label key={name}>
              <input
                type="radio"
                name="category"
                data-name={name}
                data-icon={icon}
                onChange={onCategoryChange}
                checked={name === input.category.name}
              />
              <span>{name}</span>
            </label>
          ))
        ) : (
          <h3 className="no__category">카테고리를 설정해주세요.</h3>
        )}
      </div>
    </div>
  );
};

export default CategoryInput;
