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
        >Add New Currency</a>
      </footer>
    </div>
  );
}
