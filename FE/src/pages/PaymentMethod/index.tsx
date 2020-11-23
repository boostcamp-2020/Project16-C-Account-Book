import React, { useState } from 'react';

import Modal from '../../components/PaymentMethod/Modal';
import MenuBar from '../../components/Common/MenuBar';
import styles from './paymentPage.module.scss';

export default function PaymentMethod() {
  const [modal, setModal] = useState(true);

  // 백엔드에서 받아올 default 결제수단.
  const defaultMethod = [
    { name: 'KB 국민카드', color: 'hsla(0, 100%, 50%, 0.93)' },
    { name: 'Kakao ', color: 'hsla(40, 100%, 50%, 0.93)' },
    { name: 'SC 제일은행', color: 'hsla(80, 100%, 50%, 0.93)' },
    { name: 'Naver ', color: 'hsla(120, 100%, 50%, 0.93)' },
    { name: 'KEB Hana ', color: 'hsla(160, 100%, 50%, 0.93)' },
    { name: 'WOORI Card', color: 'hsla(200, 100%, 50%, 0.93)' },
    { name: 'Samsung', color: 'hsla(240, 100%, 50%, 0.93)' },
    { name: 'Hyundai', color: 'hsla(280, 100%, 50%, 0.93)' },
    { name: 'BC Card', color: 'hsla(320, 100%, 50%, 0.93)' },
  ];

  return (
    <div className={styles.wrapper}>
      <MenuBar setModal={setModal} />
      {modal && <Modal setModal={setModal} defaultMethod={defaultMethod} />}
    </div>
  );
}
