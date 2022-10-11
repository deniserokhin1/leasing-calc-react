import React, { useContext } from 'react';
import { Context } from '../../context';
import styles from './MonthPay.module.scss';

const MonthPay = ({ monthPay }) => {
  const { isValue } = useContext(Context);
  return (
    <div>
      <p className={styles.info__text}>Ежемесячный платеж от</p>
      {isValue ? (
        <div className={styles.info__money}>
          {monthPay.toLocaleString('ru-Ru')}&nbsp;
          <span className={styles.infoUnits}>₽</span>
        </div>
      ) : (
        <div></div>
      )}
      <input
        style={{ display: 'none' }}
        readOnly
        value={monthPay}
        type="text"
      />
    </div>
  );
};

export default MonthPay;
