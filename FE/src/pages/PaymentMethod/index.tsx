import React, { useState } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import styles from './paymentPage.module.scss';

export default function PaymentMethod() {
  const [modal, setModal] = useState(true);

  return (
    <div className={styles.wrapper}>
      <MenuBar setModal={setModal} />
      {modal && <Modal setModal={setModal} />}
    </div>
  );
}
