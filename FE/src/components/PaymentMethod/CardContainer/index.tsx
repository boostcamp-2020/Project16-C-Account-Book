import React, { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import { paymentContext } from '../../../store/PaymentMethod/paymentMethodContext';
import styles from './cardContainer.module.scss';

export default function CardContainer(): React.ReactElement {
  const store = useContext(paymentContext);
  if (!store) throw Error("Store shouldn't be null");

  return useObserver(() => {
    return (
      <div className={styles.container} data-overlay>
        {store.paymentMethod.map(card => (
          <div className={styles.card} style={{ background: `${card.color}` }}>
            <div className={styles.cardTitle}>{card.name}</div>
            <div className={styles.cardDesc}>{card.desc}</div>
          </div>
        ))}
      </div>
    );
  });
}
