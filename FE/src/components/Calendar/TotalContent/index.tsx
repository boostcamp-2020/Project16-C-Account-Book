import React from 'react';
import './totalContent.scss';

export default function TotalContent(props) {
  return (
    <div className="calendar__total__price">
      <div className="calendar__income__total">수입합</div>
      <div className="calendar__spending__total">지출합</div>
    </div>
  );
}
