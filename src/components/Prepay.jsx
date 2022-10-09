// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Prepay = ({ minValue, maxValue, value, setValue, setCorrectValue }) => {
  // const [units, setUnits] = useState('%');
  return (
    <div style={{ display: 'flex' }}>
      <input
        value={value.value === 0 ? '' : value.value}
        key={value.key}
        onInput={(e) => {
          if (e.target.value.replace(/\D/g, '') === '') {
            setValue({ ...value, value: 0 });
          } else {
            setValue({ ...value, value: e.target.value.replace(/\D/g, '') });
          }
          if (Number(e.target.value.replace(/\D/g, '')) > 60) {
            setValue({ ...value, value: 60 });
          }
        }}
        onClick={() => {
          // setUnits('');
        }}
        onBlur={(e) => {
          setCorrectValue(e.target.value, minValue, maxValue, setValue, value);
          // setUnits('%');
        }}
        className="block-units"
        type="text"
      />
      {/* <p className="percents">%</p> */}
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
