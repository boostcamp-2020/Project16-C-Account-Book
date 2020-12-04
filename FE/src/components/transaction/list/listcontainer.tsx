import React, { useState } from 'react';
import './listcontainer.scss';
import { PlusCircleIcon } from '@primer/octicons-react';

import Filter from './filter/listfilter';
import Transactions from './transactions';

const ListContainer = ({
  setTransactionAddModal,
}: {
  setTransactionAddModal: (value: boolean) => void;
}) => {
  const [selectedCategory, selectCategory] = useState('all');
  const [selectedTypes, selectType] = useState(['수입', '지출']);

  const onAddButtonClicked = () => {
    setTransactionAddModal(true);
  };

  return (
    <>
      <div className="transaction__list__container">
        <Filter
          selectedCategory={selectedCategory}
          selectCategory={selectCategory}
          selectedTypes={selectedTypes}
          selectType={selectType}
        />
        <Transactions
          selectedCategory={selectedCategory}
          selectedTypes={selectedTypes}
        />
      </div>
      <button
        className="transaction__add__button"
        type="button"
        onClick={onAddButtonClicked}
      >
        <PlusCircleIcon className="icon" />
        거래내역 추가
      </button>
    </>
  );
};

export default ListContainer;
