/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './Popup.module.scss';

const Popup = ({ isSuccess, setIsSuccess }) => {
  return (
    <div
      onClick={() => {
        setIsSuccess(false);
      }}
      className={isSuccess ? styles.popUpShow : styles.popUpHide}
    >
      <div className={isSuccess ? styles.modalShow : styles.modalHide}>
        <div className={styles.checkBox}>
          <i
            style={{
              color: '#ff9514',
            }}
            className="fa fa-5x fa-check-square-o"
            aria-hidden="true"
          ></i>
        </div>
        <h2 className={styles.modalTitle}>Заявка успешно отправлена</h2>
        <p className={styles.modalDescr}>
          Наш специалист скоро свяжется с Вами
        </p>
        <div className={styles.containerButton}>
          <button className={styles.button}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
