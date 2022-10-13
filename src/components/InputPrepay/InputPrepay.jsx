// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './InputPrepay.module.scss';
import { Context } from '../../context';

let classes = [styles.inputNumber];

const InputPrepay = ({ valuePriceCar, setValue, valuePrepay, pending }) => {
  const { isClickPrepay } = useContext(Context);
  isClickPrepay ? classes.push(styles.inputNumberActive) : (classes.length = 1);

  const divValue =
    (valuePrepay.value * valuePriceCar.value) / 100 === 0
      ? ''
      : Math.floor((valuePrepay.value * valuePriceCar.value) / 100);

  pending
    ? classes.push(styles.inputDisabled)
    : (classes = classes.filter((item) => item !== 'HfWbaoEnYpL9gd9o_T9d'));

  return (
    <div className={classes.join(' ')} key={valuePriceCar.key}>
      {divValue ? divValue.toLocaleString('ru-Ru') : ''}
      &nbsp;
      {divValue ? <span className={styles.infoUnits}>₽</span> : ''}
      <input
        style={{ display: 'none' }}
        type="text"
        value={divValue}
        key={valuePriceCar.key}
        readOnly
        onInput={(e) => {
          setValue({
            ...valuePriceCar,
            value: Number(e.target.value.split(' ').join('')),
          });
        }}
      />
    </div>
  );
};

InputPrepay.propTypes = {
  inputmode: PropTypes.string,
  valuePriceCar: PropTypes.object,
  setValue: PropTypes.func,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
  valuePrepay: PropTypes.object,
  setCorrectValue: PropTypes.func,
};

export default InputPrepay;
