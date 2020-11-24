import React, { useState, useEffect, useCallback } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import styles from './paymentPage.module.scss';
import { getDefaultMethods } from '../../api/defaultPaymentMethod';

export default function PaymentMethod() {
  const [modal, setModal] = useState(false);
  const [defaultMethod, setDefaultMethod] = useState([]);

  const getData = useCallback(async () => {
    const datas = await getDefaultMethods();
    setDefaultMethod(datas);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <MenuBar setModal={setModal} />
      {modal && <Modal setModal={setModal} defaultMethod={defaultMethod} />}
    </div>
  );
}
