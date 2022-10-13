// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context';
import styles from './Prepay.module.scss';

const Prepay = ({
  minValue,
  maxValue,
  value,
  setValue,
  setCorrectValue,
  pending,
}) => {
  const [showInputPrepay, setShowInputPrepay] = useState(false);
  const [showDivPrepay, setShowDivPrepay] = useState(true);

  const [showMaxValueError, setShowMaxValueError] = useState(false);
  const [showMinValueError, setShowMinValueError] = useState(false);

  const checkValueAndSetMaxValue = (targetValue, maxValue, value, setValue) => {
    if (Number(targetValue.split(' ').join('')) > maxValue) {
      setIsValue(true);
      setValue({
        ...value,
        value: Number(maxValue),
      });
      setShowMaxValueError(true);
      setShowMinValueError(false);
    } else if (Number(targetValue.split(' ').join('')) < minValue) {
      setIsValue(false);
      setShowMinValueError(true);
      setShowMaxValueError(false);
      setValue({
        ...value,
        value: Number(targetValue.split(' ').join('').replace(/\D/g, '')),
      });
    } else {
      setIsValue(true);
      setShowMaxValueError(false);
      setShowMinValueError(false);
      setValue({
        ...value,
        value: Number(targetValue.split(' ').join('').replace(/\D/g, '')),
      });
    }
  };

  const { setIsClickPrepay } = useContext(Context);
  const { setIsValue } = useContext(Context);

  return (
    <div
      onClick={() => {
        if (!pending) {
          setIsClickPrepay(true);
          setShowDivPrepay(false);
          setShowInputPrepay(true);
        }
      }}
    >
      {showDivPrepay && (
        <div
          style={pending ? { color: '#57575776' } : {}}
          className={styles.percents}
        >
          {value.value === 0 ? '' : value.value + '%'}
        </div>
      )}
      {showInputPrepay && (
        <input
          value={value.value === 0 ? '' : value.value}
          autoFocus={true}
          key={value.key}
          onInput={(e) => {
            checkValueAndSetMaxValue(e.target.value, maxValue, value, setValue);
          }}
          onBlur={(e) => {
            setIsValue(true);
            setShowMaxValueError(false);
            setShowMinValueError(false);
            setIsClickPrepay(false);
            setShowDivPrepay(true);
            setShowInputPrepay(false);
            setCorrectValue(
              e.target.value,
              minValue,
              maxValue,
              setValue,
              value
            );
          }}
          className={styles.blockUnits}
          type="text"
        />
      )}
      {showMaxValueError && (
        <p className={styles.showError}>Максимальный размер аванса: 60%</p>
      )}
      {showMinValueError && (
        <p className={styles.showError}>Минимальный размер аванса: 10%</p>
      )}
    </div>
  );
};

Prepay.propTypes = {
  key: PropTypes.string,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
  setCorrectValue: PropTypes.func,
};

export default Prepay;
