import React, { useState, useEffect } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import Calendar from '../../components/Calendar';
import styles from './calendar.module.scss';
import useDefaultPayment from '../../service/useDefaultPayment';

export default function CalendarPage() {
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const defaultMethod = useDefaultPayment();

  return (
    <div className={styles.wrapper}>
      <MenuBar setModal={setPaymentMethodModal} pageType="calendar" />
      <Calendar />
      {paymentMethodModal && (
        <Modal setModal={setPaymentMethodModal} defaultMethod={defaultMethod} />
      )}
    </div>
  );
}
