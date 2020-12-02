import React, { useState, useEffect, useCallback } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import ListContainer from '../../components/transaction/list/listcontainer';
import styles from './transaction.module.scss';

import useDefaultPayment from '../../service/useDefaultPayment';
import useLoginCheck from '../../service/useLoginCheck';

export default function TransactionComponent(props) {
  useLoginCheck();
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const defaultMethod = useDefaultPayment();

  return (
    <div className={styles.container}>
      <MenuBar setModal={setPaymentMethodModal} pageType="transaction" />
      <ListContainer />
      {paymentMethodModal && (
        <Modal setModal={setPaymentMethodModal} defaultMethod={defaultMethod} />
      )}
    </div>
  );
}
