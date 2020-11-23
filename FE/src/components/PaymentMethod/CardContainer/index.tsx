import React, { useContext } from 'react';
import { paymentContext } from '../../../store/PaymentMethod/paymentMethodContext';
import { useRootData } from '../../../store/PaymentMethod/paymentMethodHook';
import styles from './cardContainer.module.scss';

export default function CardContainer(): React.ReactElement {
  const store = useContext(paymentContext);
  if (!store) throw Error("Store shouldn't be null");
  const paymentMethods = useRootData(store => store.paymentMethod);

  return (
    <div className={styles.container} data-overlay>
      {paymentMethods.map(card => (
        <div className={styles.card} style={{ background: `${card.color}` }}>
          <div className={styles.cardTitle}>{card.name}</div>
          <div className={styles.cardDesc}>{card.desc}</div>
        </div>
      ))}
    </div>
  );
}
