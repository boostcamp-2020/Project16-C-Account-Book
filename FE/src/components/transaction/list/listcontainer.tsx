import React, { useState } from 'react';
import styles from './listcontainer.module.scss';

import Filter from './filter/listfilter';
import Transactions from './transactions/transactions';

const ListContainer = () => {
  const [selectedCategory, selectCategory] = useState('all');
  const [selectedTypes, selectType] = useState(['수입', '지출']);

  return (
    <div className={styles.container}>
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
  );
};

export default ListContainer;
