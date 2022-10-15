/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './PopupError.module.scss';

const PopupError = ({
  isFormValid,
  setIsFormValid,
  heigthScreen,
  widthScreen,
}) => {
  return (
    <div
      style={widthScreen < 1025 ? { height: heigthScreen } : { height: '100%' }}
      onClick={() => {
        setIsFormValid(true);
      }}
      className={!isFormValid ? styles.popUpShow : styles.popUpHide}
    >
      <div className={!isFormValid ? styles.modalShow : styles.modalHide}>
        <div className={styles.checkBox}>
          <i
            style={{
              color: '#ff9514',
            }}
            className="fa fa-5x fa-exclamation-circle"
            aria-hidden="true"
          ></i>
        </div>
        <h2 className={styles.modalTitle}>Вы указали некорректные данные</h2>
        <p className={styles.modalDescr}>
          Проверьте данные и&nbsp;попробуйте ещё раз
        </p>
        <div className={styles.containerButton}>
          <button className={styles.button}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default PopupError;
