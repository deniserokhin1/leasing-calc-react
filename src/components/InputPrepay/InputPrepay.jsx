// eslint-disable-next-line no-unused-vars
import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import PropTypes from 'prop-types';
import styles from './InputPrepay.module.scss';

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

const InputPrepay = ({ maxValue, valuePriceCar, setValue, valuePrepay }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  return (
    <MaskedInput
      className={classes.join(' ')}
      mask={currencyMask}
      value={Math.round((valuePrepay.value * valuePriceCar.value) / 100)}
      key={valuePriceCar.key}
      readOnly
      onInput={(e) => {
        if (Number(e.target.value.split(' ').join('')) > maxValue) {
          setValue({
            ...valuePriceCar,
            value: Number(maxValue),
          });
        } else {
          setValue({
            ...valuePriceCar,
            value: Number(e.target.value.split(' ').join('')),
          });
        }
      }}
    />
  );
};

InputPrepay.defaultProps = {
  inputMode: 'numeric',
  maskOptions: {},
};

InputPrepay.propTypes = {
  inputmode: PropTypes.string,
  valuePriceCar: PropTypes.object,
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

export default InputPrepay;
