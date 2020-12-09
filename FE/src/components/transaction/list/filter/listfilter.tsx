import React, { ChangeEvent, useCallback } from 'react';
import styles from './listfilter.modules.scss';

import { useTransactionData } from '../../../../store/AccountBook/accountBookInfoHook';
import CommaMaker from '../../../../util/commaForMoney';

const Filter = ({
  selectedCategories,
  selectCategories,
  selectedTypes,
  selectType,
}: {
  selectedCategories: string[];
  selectCategories: (value: string[]) => void;
  selectedTypes: string[];
  selectType: (values: string[]) => void;
}) => {
  const {
    categoryPool,
    filteredPriceIn,
    filteredPriceOut,
  } = useTransactionData(store => ({
    categoryPool: store.accountBook.categories,
    filteredPriceIn: store.filteredPriceIn,
    filteredPriceOut: store.filteredPriceOut,
  }));

  const onCategoryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetElement = e.target as HTMLInputElement;
      if (selectedCategories.includes(targetElement.value)) {
        const rest = selectedCategories.filter(
          category => category !== targetElement.value,
        );
        selectCategories(rest);
      } else {
        selectCategories([...selectedCategories, targetElement.value]);
      }
    },
    [selectedCategories, selectedCategories],
  );

  const onTypeClicked = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const targetElement = e.target as HTMLInputElement;
      if (selectedTypes.includes(targetElement.value)) {
        const rest = selectedTypes.filter(type => type !== targetElement.value);
        selectType(rest);
      } else {
        selectType([...selectedTypes, targetElement.value]);
      }
      console.log('click ', selectedTypes);
    },
    [selectedTypes, selectType],
  );

  return (
    <div className={styles.container}>
      <div className={styles.inoutFilter}>
        {['수입', '지출'].map(type => (
          <label key={type}>
            <input
              type="checkbox"
              name="type"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={onTypeClicked}
            />
            <span>
              {type === '지출'
                ? `-${CommaMaker(filteredPriceOut)}`
                : `+${CommaMaker(filteredPriceIn)}`}
            </span>
          </label>
        ))}
      </div>
      <div className={styles.categoryFilter}>
        {categoryPool
          .filter(
            ({ type }) =>
              selectedTypes.length === 0 || selectedTypes.includes(type),
          )
          .map(({ name }) => (
            <label key={name}>
              <input
                type="checkbox"
                name="category"
                value={name}
                onChange={onCategoryChange}
                checked={selectedCategories.includes(name)}
              />
              <span>{name}</span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default Filter;
