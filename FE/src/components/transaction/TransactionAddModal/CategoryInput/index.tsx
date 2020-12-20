import React, { ChangeEvent, ReactElement } from 'react';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';

import './index.scss';

const CategoryInput = ({
  categoryPool,
}: {
  categoryPool: Array<any>;
}): ReactElement => {
  const { input, setInput } = useTransactionAddModalData(store => ({
    input: store.input,
    setInput: store.setInput,
  }));

  const onCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetElement = e.target as HTMLInputElement;
    const newCategory = {
      name: targetElement.dataset.name,
      icon: targetElement.dataset.icon,
      type: targetElement.dataset.type,
    };
    setInput({ ...input, category: { ...newCategory } });
  };

  const onTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetElement = e.target as HTMLInputElement;

    setInput({
      ...input,
      type: targetElement.value,
      category: { ...input.category, type: targetElement.value },
    });
  };

  return (
    <div className="item category__input">
      <div className="indicator">카테고리</div>

      <div className="row">
        <div className="type__input__conatiner">
          {['수입', '지출'].map(type => (
            <label key={type}>
              <input
                type="radio"
                name="type"
                value={type}
                onChange={onTypeChange}
                checked={type === input.type}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
        <div className="vertical__line" />
        <div
          className="row category__input__container"
          id="category__input__container"
        >
          {categoryPool ? (
            categoryPool
              .filter(({ type }) => type === input.type)
              .map(({ name, icon, type }) => (
                <label key={name}>
                  <input
                    type="radio"
                    name="category"
                    data-name={name}
                    data-icon={icon}
                    data-type={type}
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
    </div>
  );
};

export default CategoryInput;
