import React, { useState } from 'react';

import PaymentModal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import ListContainer from '../../components/transaction/list/listcontainer';
import TransactionAddModal from '../../components/transaction/TransactionAddModal';
import './transaction.scss';

import useDefaultPayment from '../../service/useDefaultPayment';
import useLoginCheck from '../../service/useLoginCheck';
import useAccountBook from '../../service/useAccountBookSetting';
import SaveModal from '../../components/Common/SaveModal';
import TransactionFormModalProvider from '../../store/TransactionFormModal/TransactionFormModalContext';
import { useTransactionAddModalData } from '../../store/TransactionFormModal/TransactionFormModalHook';
import { useThemeData } from '../../store/Theme/themeHook';
import { useHistory } from 'react-router-dom';
import useSaveModal from '../../service/useSaveModal';

function TransactionComponent(props) {
  const history = useHistory();
  const accountBookId = useLoginCheck();
  const confirmModal = useSaveModal();
  const theme = useThemeData(store => store.mode);

  const isWrongAccess = useAccountBook(accountBookId);
  if (!isWrongAccess) {
    history.push('/');
    return null;
  }

  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const defaultMethod = useDefaultPayment();
  const transactionAddModalVisible = useTransactionAddModalData(
    store => store.transactionAddModalVisible,
  );

  return (
    <div
      className={
        theme === 'dark'
          ? 'transaction__container'
          : 'transaction__container light'
      }
    >
      <MenuBar
        id={accountBookId.id}
        setModal={setPaymentMethodModal}
        pageType="transaction"
      />
      <ListContainer />
      {paymentMethodModal && (
        <PaymentModal
          setModal={setPaymentMethodModal}
          defaultMethod={defaultMethod}
        />
      )}

      {transactionAddModalVisible && (
        <TransactionAddModal
          confirmModal={confirmModal}
          accountbookId={accountBookId.id}
        />
      )}
      {confirmModal.saveModal && (
        <SaveModal
          saveAction={confirmModal.saveAction}
          updateData={confirmModal.updateData}
          setSaveModal={confirmModal.setSaveModal}
          title={confirmModal.modalTitle}
        />
      )}
    </div>
  );
}

export default () => (
  <TransactionFormModalProvider>
    <TransactionComponent />
  </TransactionFormModalProvider>
);
