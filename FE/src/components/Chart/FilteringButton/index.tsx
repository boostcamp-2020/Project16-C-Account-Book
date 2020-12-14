import React from 'react';
import { useThemeData } from '../../../store/Theme/themeHook';
import './filtering-button.scss';

export default function FilteringButton({ dataType, setDataType }) {
  const theme = useThemeData(store => store.mode);
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
        <span
          className={
            theme === 'dark' ? 'filter__income' : 'filter__income light'
          }
        >
          수입
        </span>
      </label>
      <label key="Spending">
        <input
          type="radio"
          name="startday"
          value="지출"
          checked={dataType === '지출'}
          onChange={e => setDataType(e.target.value)}
        />
        <span
          className={
            theme === 'dark' ? 'filter__spending' : 'filter__spending light'
          }
        >
          지출
        </span>
      </label>
    </div>
  );
}
