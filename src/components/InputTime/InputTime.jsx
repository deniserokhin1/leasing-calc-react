// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import PropTypes from 'prop-types';
import styles from './InputTime.module.scss';
import { Context } from '../../context';

const classes = [styles.inputNumber];

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

const InputTime = ({
  minValue,
  maxValue,
  value,
  setValue,
  setCorrectValue,
  pending,
}) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  const [showMaxValueError, setShowMaxValueError] = useState(false);
  const [showMinValueError, setShowMinValueError] = useState(false);

  const { setIsValue } = useContext(Context);

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
        style={pending ? { color: '#57575776' } : {}}
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
        <p className={styles.showError}>
          Максимальный срок лизинга: 60 месяцев.
        </p>
      )}
      {showMinValueError && (
        <p className={styles.showError}>Минимальный срок: 10 месяцев.</p>
      )}
    </div>
  );
};

InputTime.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
};

InputTime.propTypes = {
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

export default InputTime;
