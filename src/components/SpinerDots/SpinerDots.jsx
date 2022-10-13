/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './SpinerDots.module.scss';

const SpinerDots = () => {
  return (
    <div className={styles.div_spiner}>
      <svg width="48" height="48" viewBox="0 0 24 24">
        <circle className={styles.spinner_qM83} cx="4" cy="12" r="3" />
        <circle
          className={[styles.spinner_qM83, styles.spinner_oXPr].join(' ')}
          cx="12"
          cy="12"
          r="3"
        />
        <circle
          className={[styles.spinner_qM83, styles.spinner_ZTLf].join(' ')}
          cx="20"
          cy="12"
          r="3"
        />
      </svg>
    </div>
  );
};

export default SpinerDots;
