import React, { useContext } from 'react';
import { Context } from '../../context';
import SpinerDots from '../SpinerDots/SpinerDots';
import styles from './MonthPay.module.scss';

const MonthPay = ({ monthPay, pending }) => {
  const { isValue } = useContext(Context);
  return (
    <div>
      <p className={styles.info__text}>Ежемесячный платеж от</p>
      {isValue ? (
        <div
          style={pending ? { color: '#57575776' } : {}}
          className={styles.info__money}
        >
          {monthPay.toLocaleString('ru-Ru')}&nbsp;
          <span className={styles.infoUnits}>₽</span>
        </div>
      ) : (
        <SpinerDots></SpinerDots>
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
