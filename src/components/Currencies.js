import React from 'react';

import CurrencyItem from './CurrencyItem';

export default function({
  rates,
  currencies,
}) {
  return (
    <div>
      {
        currencies.map(
          ([source, target], index) => (
            <CurrencyItem
              key={ index }
              rates={ rates }
              source={ source }
              target={ target }
            />
          )
        )
      }
    </div>
  );
}
