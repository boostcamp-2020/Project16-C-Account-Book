import React, { useState, useEffect, useCallback } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import styles from './paymentPage.module.scss';
import useDefaultPayment from '../../service/useDefaultPayment';

export default function DefaultTemplate() {
  const [modal, setModal] = useState(false);
  const defaultMethod = useDefaultPayment();

  return (
    <div className={styles.wrapper}>
      <MenuBar setModal={setModal} />
      {modal && <Modal setModal={setModal} defaultMethod={defaultMethod} />}
    </div>
  );
}
