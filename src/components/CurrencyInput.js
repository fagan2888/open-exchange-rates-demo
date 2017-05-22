import React from 'react';

import { ltrim } from '../utils';
import styles from '../styles/CurrencyInput.module.css'

function normalizeStream(prefix, out) {
  return event => {
    return out(
      event
        .target
        .value
        .replace(prefix, '')
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1')
    );
  };
}

export default function({
  value,
  onChange,
  prefix = '',
  provideController
}) {
  const stringValue = String(value).trim();
  return (
    <input
      ref={ provideController }
      className={ styles.input }
      type={ 'text' }
      min={ '0' }
      step={ 'any' }
      value={ stringValue && prefix + stringValue }
      onChange={ normalizeStream(prefix, onChange) }
    /> 
  );
}
