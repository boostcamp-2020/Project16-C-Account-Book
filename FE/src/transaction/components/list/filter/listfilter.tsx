import React from 'react';
import styles from './listfilter.modules.scss';

const Filter = props => {
  return (
    <div className={styles.container}>
      <div className={styles.inoutFilter}>
        <div>
          <input type="radio" name="inout" id="in" />
          <label htmlFor="in">
            <span>+ 0</span>
          </label>
        </div>
        <div>
          <input type="radio" name="inout" id="out" />
          <label htmlFor="out">
            <span>- 0</span>
          </label>
        </div>
      </div>
      <div className={styles.categoryFilter}>
        <label htmlFor="shopping">
          <input type="checkbox" id="shopping" />
          쇼핑
        </label>
        <label htmlFor="movie">
          <input type="checkbox" id="movie" />
          영화
        </label>
        <label htmlFor="music">
          <input type="checkbox" id="music" />
          음악
        </label>
        <label htmlFor="food">
          <input type="checkbox" id="food" />
          음식
        </label>
        <label htmlFor="any">
          <input type="checkbox" id="any" />
          기타
        </label>
      </div>
    </div>
  );
};

export default Filter;
