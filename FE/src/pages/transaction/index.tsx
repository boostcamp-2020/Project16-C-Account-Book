import React, { useState, useEffect, useCallback } from 'react';
import styles from './transaction.module.scss';

import Modal from '../../components/PaymentMethod/Modal';
import Menubar from '../../components/Common/MenuBar';
import ListContainer from '../../components/transaction/list/listcontainer';
import { getDefaultMethods } from '../../api/defaultPaymentMethod';

const TransactionComponent = props => {
  const [modal, setModal] = useState(false);
  const [defaultMethod, setDefaultMethod] = useState([]);

  const getData = async () => {
    const datas = await getDefaultMethods();
    setDefaultMethod(datas);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <Menubar setModal={setModal} pageType="transaction" />
      <ListContainer />
      {modal && <Modal setModal={setModal} defaultMethod={defaultMethod} />}
    </div>
  );
};

export default TransactionComponent;
