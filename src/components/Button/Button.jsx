// eslint-disable-next-line no-unused-vars
import React from 'react';
import SpinerCircle from '../SpinerCircle/SpinerCircle';
import styles from './Button.module.scss';

// eslint-disable-next-line react/prop-types
const Button = ({ checkInputsValues, isValue, children, pending }) => {
  return (
    <div className={styles.btnContainer} style={{ position: 'relative' }}>
      <button
        onMouseDown={() => {
          checkInputsValues();
        }}
        type="submit"
        className={isValue ? styles.btn : styles.btn_disabled}
        disabled={pending ? true : false}
      >
        {pending ? '' : children}
      </button>
      {pending && <SpinerCircle></SpinerCircle>}
    </div>
  );
};

export default Button;
