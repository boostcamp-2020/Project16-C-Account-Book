import React, { useState } from 'react';
import './listcontainer.scss';
import { PlusCircleIcon } from '@primer/octicons-react';

import Filter from './filter/listfilter';
import Transactions from './transactions';
import { useTransactionAddModalData } from '../../../store/TransactionFormModal/TransactionFormModalHook';

const ListContainer = () => {
  const [selectedCategories, selectCategories] = useState([]);
  const [selectedTypes, selectType] = useState([]);

  const {
    setTransactionAddModalVisible,
    initInput,
  } = useTransactionAddModalData(store => ({
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
    initInput: store.initInput,
  }));

  const onAddButtonClicked = () => {
    initInput();
    setTransactionAddModalVisible(true);
  };

  return (
    <>
      <div className="transaction__list__container">
        <Filter
          selectedCategories={selectedCategories}
          selectCategories={selectCategories}
          selectedTypes={selectedTypes}
          selectType={selectType}
        />
        <Transactions
          selectedCategories={selectedCategories}
          selectedTypes={selectedTypes}
        />
        <button
          className="transaction__add__button"
          type="button"
          onClick={onAddButtonClicked}
        >
          <PlusCircleIcon className="icon" />
        </button>
      </div>
    </>
  );
};

export default ListContainer;
