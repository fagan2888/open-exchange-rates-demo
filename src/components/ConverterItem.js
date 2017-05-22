import React from 'react';

import styles from '../styles/Converter.module.css';

import CurrencyInput from './CurrencyInput';


export default function({
  currency,
  rates,
  exchangeMatrix,
  onChange,
}) {
  return (
    <li className={ styles.converterItem }>
      <div className={ styles.currency }>
        { currency }
      </div>
      <div className={ styles.form }>
        <CurrencyInput
          value={ exchangeMatrix[currency] }
          onChange={ onChange }
        />
      </div>
    </li>
  );
}
