import React, { useState, useEffect, useCallback } from 'react';
import styles from './transaction.module.scss';

import Modal from '../../components/PaymentMethod/Modal';
import Menubar from '../../components/Common/MenuBar';
import ListContainer from '../../components/transaction/list/listcontainer';
import useDefaultPayment from '../../service/useDefaultPayment';

const TransactionComponent = props => {
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const defaultMethod = useDefaultPayment();
  return (
    <div className={styles.container}>
      <Menubar setModal={setPaymentMethodModal} pageType="transaction" />
      <ListContainer />
      {paymentMethodModal && (
        <Modal setModal={setPaymentMethodModal} defaultMethod={defaultMethod} />
      )}
    </div>
  );
};

export default TransactionComponent;
