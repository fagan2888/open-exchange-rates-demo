import React from 'react';

import styles from '../styles/Layout.module.css';

export default function({
  children,
  handlers
}) {
  return (
    <div className={ styles.container }>
      { children }
      <footer>
        <a
          className={ styles.newCurrencyButton }
          href={ '#' }
          onClick={ handlers.toggleCreationDialog }
        >
          Add New Currency
        </a>
        <a
          className={ styles.exchangeButton }
          href={ '#' }
          onClick={ handlers.toggleExchangeDialog }
        >
          Exchange
        </a>
      </footer>
    </div>
  );
}
