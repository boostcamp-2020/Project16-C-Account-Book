import React from 'react';

export default function FilteringButton({ dataType, setDataType }) {
  return (
    <div className="data__type">
      <label key="Income">
        <input
          type="radio"
          name="startday"
          value="수입"
          checked={dataType === '수입'}
          onChange={e => setDataType(e.target.value)}
        />
        <span className="filter__income">수입</span>
      </label>
      <label key="Spending">
        <input
          type="radio"
          name="startday"
          value="지출"
          checked={dataType === '지출'}
          onChange={e => setDataType(e.target.value)}
        />
        <span className="filter__spending">지출</span>
      </label>
    </div>
  );
}
