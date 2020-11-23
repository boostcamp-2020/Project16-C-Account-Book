import React, { useRef, useState, useEffect } from 'react';
import './newMethod.scss';

interface SetData {
  setAddData: (addData: { name: string; color: string }) => void;
}

export default function NewMethod({ setAddData }: SetData): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carousel = useRef();
  // const cellCount = data.length;
  const radius = 288;
  const theta = 360 / data.length;

  useEffect(() => {}, [selectedIndex]);

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
    setAddData({
      name: event.target.textContent,
      color: event.target.dataset.color,
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="scene">
          <div className="carousel" ref={carousel}>
            {data.map(card => (
              <div
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
        <button type="button" onClick={onClickPrev} className="prev__button">
          prev
        </button>
        <button type="button" onClick={onClickNext} className="next__button">
          next
        </button>
      </div>
    </>
  );
}

const data = [
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
