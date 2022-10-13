/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './ProgressBar.module.scss';

let classes = [styles.slider__progress];

const ProgressBar = ({ value, maxValue, pending }) => {
  const changeProgressBar = (value, maxValue) => {
    const persentOffsetProgressBar =
      Math.round(100 - (value / maxValue) * 100) + '%';
    return persentOffsetProgressBar;
  };

  pending ? classes.push(styles.slider_disabled) : (classes.length = 1);

  return (
    <div className={styles.block__slider}>
      <div className={styles.slider}>
        <div
          className={classes.join(' ')}
          style={{ right: changeProgressBar(value.value, maxValue) }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
