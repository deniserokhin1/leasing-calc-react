import React, { useContext } from 'react';
import { Context } from '../../context';
import SpinerDots from '../SpinerDots/SpinerDots';
import styles from './Sum.module.scss';

const Sum = ({ monthPay, prepay, priceCar, valueTime, pending }) => {
  const sum = Math.round(
    monthPay * valueTime.value + (priceCar.value * prepay.value) / 100
  );

  const { isValue } = useContext(Context);

  return (
    <div className="block-info">
      <p className={styles.info__text}>Сумма договора лизинга</p>
      {isValue ? (
        <div
          style={pending ? { color: '#57575776' } : {}}
          className={styles.info__money}
        >
          {sum.toLocaleString('ru-Ru')}&nbsp;
          <span className={styles.infoUnits}>₽</span>
        </div>
      ) : (
        <SpinerDots></SpinerDots>
      )}
      <input style={{ display: 'none' }} readOnly value={sum} type="text" />
    </div>
  );
};

export default Sum;
