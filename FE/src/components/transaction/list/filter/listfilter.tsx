import React, { useCallback } from 'react';
import styles from './listfilter.modules.scss';

const Filter = ({
  selectedCategory,
  selectCategory,
  selectedTypes,
  selectType,
}: {
  selectedCategory: string;
  selectCategory: (value: string) => void;
  selectedTypes: string[];
  selectType: (values: string[]) => void;
}) => {
  const onCategoryClicked = useCallback(
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      const targetElement = e.target as HTMLInputElement;
      if (selectedCategory === targetElement.value) {
        selectCategory('all');
        targetElement.checked = false;
      } else {
        selectCategory(targetElement.value);
      }
    },
    [selectedCategory, selectCategory],
  );

  const onTypeClicked = useCallback(
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      const targetElement = e.target as HTMLInputElement;
      if (selectedTypes.includes(targetElement.value)) {
        const rest = selectedTypes.filter(type => type !== targetElement.value);
        selectType(rest);
      } else {
        selectType([...selectedTypes, targetElement.value]);
      }
    },
    [selectedTypes, selectType],
  );

  return (
    <div className={styles.container}>
      <div className={styles.inoutFilter}>
        <div>
          <input
            type="checkbox"
            name="inout"
            id="in"
            value="수입"
            checked={selectedTypes.includes('수입')}
            onClick={onTypeClicked}
          />
          <label htmlFor="in">
            <span>+ 0</span>
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            name="inout"
            id="out"
            value="지출"
            checked={selectedTypes.includes('지출')}
            onClick={onTypeClicked}
          />
          <label htmlFor="out">
            <span>- 0</span>
          </label>
        </div>
      </div>
      <div className={styles.categoryFilter}>
        <label htmlFor="shopping">
          <input
            type="radio"
            id="shopping"
            name="category"
            value="쇼핑"
            onClick={onCategoryClicked}
          />
          쇼핑
        </label>
        <label htmlFor="movie">
          <input
            type="radio"
            id="movie"
            name="category"
            value="영화"
            onClick={onCategoryClicked}
          />
          영화
        </label>
        <label htmlFor="music">
          <input
            type="radio"
            id="music"
            name="category"
            value="음악"
            onClick={onCategoryClicked}
          />
          음악
        </label>
        <label htmlFor="food">
          <input
            type="radio"
            id="food"
            name="category"
            value="음식"
            onClick={onCategoryClicked}
          />
          음식
        </label>
        <label htmlFor="any">
          <input
            type="radio"
            id="any"
            name="category"
            value="기타"
            onClick={onCategoryClicked}
          />
          기타
        </label>
      </div>
    </div>
  );
};

export default Filter;
