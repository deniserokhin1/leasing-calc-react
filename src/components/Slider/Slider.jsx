// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './Slider.module.scss';

let classes = [styles.range];

// eslint-disable-next-line react/prop-types
const Slider = ({ typeInput, value, maxValue, setValue, pending }) => {
  const changeValue = (targetValue) => {
    setValue({ ...value, value: targetValue });

    const checkValuePrepay = (targetValue) => {
      if (Number(targetValue) < 10) {
        setValue({ ...value, value: '10' });
      }
      if (Number(targetValue) > maxValue) {
        setValue({ ...value, value: maxValue });
      }
    };

    const checkValuePriceCar = (targetValue) => {
      if (Number(targetValue) < 1000000) {
        setValue({ ...value, value: '1000000' });
      }
      if (Number(targetValue) > maxValue) {
        setValue({ ...value, value: maxValue });
      }
    };

    const checkValueTime = (targetValue) => {
      if (Number(targetValue) < 10) {
        setValue({ ...value, value: '10' });
      }
      if (Number(targetValue) > maxValue) {
        setValue({ ...value, value: maxValue });
      }
    };

    const functions = {
      prepay: checkValuePrepay,
      priceCar: checkValuePriceCar,
      time: checkValueTime,
    };
    functions[typeInput](targetValue);
  };

  return (
    <div className="block-range">
      <div className={classes.join(' ')}>
        <input
          // eslint-disable-next-line react/prop-types
          value={value.value}
          disabled={pending ? true : false}
          min={0}
          max={maxValue}
          className={styles.range__input}
          type="range"
          onInput={(e) => {
            changeValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
