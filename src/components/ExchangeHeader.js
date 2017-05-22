import React from 'react';
import classNames from 'classnames';

import styles from '../styles/ExchangeHeader.module.css';

export default function({
  onCancel,
  onSubmit,
  submitEnabled
}) {
  return (
    <div className={ styles.header }>
      <a
        href={ '#' }
        className={ styles.cancel }
        onClick={ onCancel }
      >
        Cancel
      </a>
      <a
        href={ '#' }
        className={
          classNames({
            [styles.submit]: true,
            [styles.disabled]: !submitEnabled,
          })
        }
        onClick={ submitEnabled && onSubmit }
      >
        Exchange
      </a>
    </div>
  );
}
