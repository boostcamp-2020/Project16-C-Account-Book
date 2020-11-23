import React from 'react';
import styles from './cardContainer.module.scss';

export default function CardContainer({
  paymentMethodData,
}): React.ReactElement {
  return (
    <div className={styles.container} data-overlay>
      {paymentMethodData.map(card => (
        <div className={styles.card} style={{ background: `${card.color}` }}>
          <div className={styles.cardTitle}>{card.name}</div>
          <div className={styles.cardDesc}>{card.desc}</div>
        </div>
      ))}
    </div>
  );
}
