import React from 'react';

import './index.scss';

const CategoryInput = ({
  categoryPool,
  onCategoryChange,
}: {
  categoryPool: Array<any>;
  onCategoryChange: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}) => {
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
                onClick={onCategoryChange}
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
