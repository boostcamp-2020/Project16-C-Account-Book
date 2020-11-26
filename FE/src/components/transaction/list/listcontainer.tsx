import React from 'react';
import styles from './listcontainer.module.scss';

import Filter from './filter/listfilter';
import Transactions from './transactions/transactions';

const ListContainer = props => {
  return (
    <div className={styles.container}>
      <Filter />
      <Transactions />
    </div>
  );
};

export default ListContainer;
