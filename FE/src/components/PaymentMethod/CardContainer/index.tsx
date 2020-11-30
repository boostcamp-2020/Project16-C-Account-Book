import React from 'react';
import { v4 } from 'uuid';

import './cardContainer.scss';

export default React.memo(function CardContainer({
  paymentMethods,
}): React.ReactElement {
  return (
    <div className="card__container" data-overlay>
      {paymentMethods.map(card => (
        <div
          key={v4()}
          className="card__container__card"
          style={{ background: `${card.color}` }}
        >
          <div className="card__cancel">X</div>
          <div className="card__title">{card.name}</div>
          <div className="card__desc">{card.desc}</div>
        </div>
      ))}
    </div>
  );
});
