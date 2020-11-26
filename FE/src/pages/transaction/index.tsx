import React, { useState, useEffect, useCallback } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import ListContainer from '../../components/transaction/list/listcontainer';
import styles from './transaction.module.scss';
import { getDefaultMethods } from '../../api/defaultPaymentMethod';

export default function TransactionComponent() {
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
    <div className={styles.wrapper}>
      <MenuBar setModal={setModal} pageType="transaction" />
      {modal && <Modal setModal={setModal} defaultMethod={defaultMethod} />}
      <ListContainer />
    </div>
  );
}
