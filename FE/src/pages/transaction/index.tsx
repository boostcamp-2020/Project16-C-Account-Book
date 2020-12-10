import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import ListContainer from '../../components/transaction/list/listcontainer';
import TransactionAddModal from '../../components/transaction/TransactionAddModal';
import styles from './transaction.module.scss';

import useDefaultPayment from '../../service/useDefaultPayment';
import useLoginCheck from '../../service/useLoginCheck';
import useAccountBook from '../../service/useAccountBookSetting';

import TransactionFormModalProvider from '../../store/TransactionFormModal/TransactionFormModalContext';
import { useTransactionAddModalData } from '../../store/TransactionFormModal/TransactionFormModalHook';

function TransactionComponent(props) {
  useLoginCheck();

  const accountBookId = useHistory().location.state;
  useAccountBook(accountBookId);

  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const defaultMethod = useDefaultPayment();
  const transactionAddModalVisible = useTransactionAddModalData(
    store => store.transactionAddModalVisible,
  );

  return (
    <div className={styles.container}>
      <MenuBar
        id={accountBookId.id}
        setModal={setPaymentMethodModal}
        pageType="transaction"
      />
      <ListContainer />
      {paymentMethodModal && (
        <Modal setModal={setPaymentMethodModal} defaultMethod={defaultMethod} />
      )}

      {transactionAddModalVisible && (
        <TransactionAddModal accountbookId={accountBookId.id} />
      )}
    </div>
  );
}

export default () => (
  <TransactionFormModalProvider>
    <TransactionComponent />
  </TransactionFormModalProvider>
);
