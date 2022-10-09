/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({ value, maxValue }) => {
  const changeProgressBar = (value, maxValue) => {
    const persentOffsetProgressBar =
      Math.round(100 - (value / maxValue) * 100) + '%';
    return persentOffsetProgressBar;
  };

  return (
    <div className={styles.block__slider}>
      <div className={styles.slider}>
        <div
          className={styles.slider__progress}
          style={{ right: changeProgressBar(value.value, maxValue) }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
