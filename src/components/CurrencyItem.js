import React from 'react';

import { calculateCurrency } from '../utils';
import styles from '../styles/Currency.module.css';

export default function({
  source,
  target,
  rates,
}) {
  return (
    <li className={ styles.currencyItem }>
      <div className={ styles.source }>1 { source }</div>
      <div className={ styles.target }>
        { calculateCurrency(source, target, rates, 1) }
        { target }
      </div>
    </li>
  );
}
