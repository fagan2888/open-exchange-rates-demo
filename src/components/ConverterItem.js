import React from 'react';

import styles from '../styles/Converter.module.css';


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
        <input
          type={ 'number' }
          step={ '0.01' }
          value={ exchangeMatrix[currency] }
          onChange={ onChange }
        /> 
      </div>
    </li>
  );
}
