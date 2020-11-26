import React from 'react';
import styles from './transaction.module.scss';

import Date from './components/date/date';
import Menubar from './components/menubar/menubar';
import ListContainer from './components/list/listcontainer';

const TransactionComponent = props => {
  return (
    <>
      <div className={styles.container}>
        <Menubar />
        <Date />
        <ListContainer />
      </div>
    </>
  );
};

export default TransactionComponent;
