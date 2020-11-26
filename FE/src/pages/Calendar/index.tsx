import React, { useState, useEffect } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import Calendar from '../../components/Calendar';
import styles from './calendar.module.scss';
import useDefaultPayment from '../../service/useDefaultPayment';

export default function CalendarPage() {
  const [modal, setModal] = useState(false);
  const defaultMethod = useDefaultPayment();

  return (
    <div className={styles.wrapper}>
      <MenuBar setModal={setModal} pageType="calendar" />
      <Calendar />
      {modal && <Modal setModal={setModal} defaultMethod={defaultMethod} />}
    </div>
  );
}
