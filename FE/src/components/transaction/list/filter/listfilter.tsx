import React, { ChangeEvent, ReactElement, useCallback } from 'react';
import './listfilter.scss';

import { iFilterProps } from '@interfaces/transaction-components';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { useThemeData } from '../../../../store/Theme/themeHook';
import CommaMaker from '../../../../util/commaForMoney';

const TransactionsFilter = ({
  selectedCategories,
  selectCategories,
  selectedTypes,
  selectType,
}: iFilterProps): ReactElement => {
  const theme = useThemeData(store => store.mode);
  const {
    categoryPool,
    filteredPriceIn,
    filteredPriceOut,
  } = useAccountBookData(store => ({
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
    },
    [selectedTypes, selectType],
  );

  return (
    <div
      className={
        theme === 'dark'
          ? 'acbook__filter__container'
          : 'acbook__filter__container light'
      }
    >
      <div
        className={
          theme === 'dark'
            ? 'acbook__list__inoutFilter'
            : 'acbook__list__inoutFilter light'
        }
      >
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
                ? `-${CommaMaker(filteredPriceOut)}원`
                : `+${CommaMaker(filteredPriceIn)}원`}
            </span>
          </label>
        ))}
      </div>
      <div
        className={
          theme === 'dark'
            ? 'acbook__list__categoryFilter'
            : 'acbook__list__categoryFilter light'
        }
      >
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
              <span
                className={
                  theme === 'dark' ? 'category__title' : 'category__title light'
                }
              >
                {name}
              </span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default TransactionsFilter;
