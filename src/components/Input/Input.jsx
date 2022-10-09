// eslint-disable-next-line no-unused-vars
import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

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

const checkValueAndSetMaxValue = (targetValue, maxValue, value, setValue) => {
  if (Number(targetValue.split(' ').join('')) > maxValue) {
    setValue({
      ...value,
      value: Number(maxValue),
    });
    console.log('Максимальный размер аванса: 6 млн. ₽');
  } else {
    console.log('Молодец!');
    setValue({
      ...value,
      value: Number(targetValue.split(' ').join('').replace(/\D/g, '')),
    });
  }
};

// eslint-disable-next-line react/prop-types
const Input = ({ minValue, maxValue, value, setValue, setCorrectValue }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  return (
    <div>
      <MaskedInput
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
          setCorrectValue(e.target.value, minValue, maxValue, setValue, value);
          classes.length = 1;
        }}
      />
    </div>
  );
};

Input.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
};

Input.propTypes = {
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
