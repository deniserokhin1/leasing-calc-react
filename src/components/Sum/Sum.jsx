import React, { useContext } from 'react';
import { Context } from '../../context';
import styles from './Sum.module.scss';

const Sum = ({ monthPay, prepay, priceCar, valueTime }) => {
  const sum = Math.round(
    monthPay * valueTime.value + (priceCar.value * prepay.value) / 100
  );

  const { isValue } = useContext(Context);

  return (
    <div className="block-info">
      <p className={styles.info__text}>Сумма договора лизинга</p>
      {isValue ? (
        <div className={styles.info__money}>
          {sum.toLocaleString('ru-Ru')}&nbsp;
          <span className={styles.infoUnits}>₽</span>
        </div>
      ) : (
        <div></div>
      )}
      <input style={{ display: 'none' }} readOnly value={sum} type="text" />
    </div>
  );
};

export default Sum;
