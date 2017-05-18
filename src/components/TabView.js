import React, { Children } from 'react';

import { calculateCurrency } from '../utils';
import styles from '../styles/TabView.module.css';


export function Tab({
  children
}) {
  return (
    <div>
      { children }
    </div>
  );
}


export function TabView({
  current,
  children,
  onChange,
}) {
  const tabs = Children.toArray(children);

  return (
    <div>
      <ul className={ styles.header }>
        {
          tabs.map((tab, index) => (
            <li
              key={ index }
              className={ index === current && styles.current }
            >
              <a
                onClick={ onChange(index) }
                href="#"
              >{ tab.props.header }</a>
            </li>
          ) )
        }
      </ul>

      { tabs[current] }
    </div>
  );
}
