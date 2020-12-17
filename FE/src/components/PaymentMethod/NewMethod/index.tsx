import React, { useRef, useState } from 'react';

import { useDefaultPaymentData } from '../../../store/PaymentMethod/paymentMethodHook';
import './newMethod.scss';

interface SetData {
  defaultMethod: object[];
}

export default function NewMethod({
  defaultMethod,
}: SetData): React.ReactElement {
  const updateAddTemplate = useDefaultPaymentData(
    store => store.updateAddTemplate,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carousel = useRef();

  const radius = 288;
  const theta = 360 / defaultMethod.length;

  const rotateCarousel = turn => {
    if (carousel) {
      const angle = theta * turn * -1;
      carousel.current.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
    }
  };

  const onClickPrev = () => {
    rotateCarousel(selectedIndex - 1);
    setSelectedIndex(selectedIndex - 1);
  };

  const onClickNext = () => {
    rotateCarousel(selectedIndex + 1);
    setSelectedIndex(selectedIndex + 1);
  };

  const onClickCard = event => {
    updateAddTemplate({
      name: event.target.textContent,
      color: event.target.dataset.color,
    });
  };

  return (
    <>
      <div className="new__method__wrapper">
        <div className="new__method__scene">
          <div className="new__method__carousel" ref={carousel}>
            {defaultMethod.map((card, index) => (
              <div
                key={`${card.name}${index}`}
                className="carousel__cell"
                onClick={onClickCard}
                data-color={card.color}
                style={{ background: `${card.color}` }}
              >
                {card.name}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onClickPrev}
          className="new__method__prev__button"
        >
          prev
        </button>
        <button
          type="button"
          onClick={onClickNext}
          className="new__method__next__button"
        >
          next
        </button>
      </div>
    </>
  );
}
