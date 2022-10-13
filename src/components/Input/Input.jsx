// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';
import { Context } from '../../context';

let classes = [styles.inputNumber];

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ' ',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 100, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

// eslint-disable-next-line react/prop-types
const Input = ({
  pending,
  minValue,
  maxValue,
  value,
  setValue,
  setCorrectValue,
}) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  const { setIsValue } = useContext(Context);

  const [showMaxValueError, setShowMaxValueError] = useState(false);
  const [showMinValueError, setShowMinValueError] = useState(false);

  pending
    ? classes.push(styles.inputDisabled)
    : (classes = classes.filter((item) => item !== 'HfWbaoEnYpL9gd9o_T9d'));

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

  return (
    <div>
      <MaskedInput
        disabled={pending ? true : false}
        className={classes.join(' ')}
        mask={currencyMask}
        value={value.value === 0 ? '' : value.value}
        key={value.key}
        onFocus={(e) => {
          classes.push(styles.inputNumberActive);
          setCorrectValue(e.target.value, minValue, maxValue, setValue, value);
        }}
        onInput={(e) => {
          checkValueAndSetMaxValue(e.target.value, maxValue, value, setValue);
        }}
        onBlur={(e) => {
          setIsValue(true);
          setShowMaxValueError(false);
          setShowMinValueError(false);
          setCorrectValue(e.target.value, minValue, maxValue, setValue, value);
          classes.length = 1;
        }}
      />
      {showMaxValueError && (
        <p className={styles.showError}>Максимальная цена: 6 млн. ₽</p>
      )}
      {showMinValueError && (
        <p className={styles.showError}>Минимальная цена: 1 млн. ₽</p>
      )}
    </div>
  );
};

Input.propTypes = {
  pending: PropTypes.bool,
  register: PropTypes.func,
  inputmode: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
  valuePrepay: PropTypes.object,
  setCorrectValue: PropTypes.func,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    integerLimit: PropTypes.number,
  }),
};

export default Input;
