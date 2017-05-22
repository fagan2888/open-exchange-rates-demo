import React, { Component } from 'react';

import ConverterItem from './ConverterItem';
import { calculateCurrency, uniqueCurrencies } from '../utils';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exchangeMatrix: (
        this.uniqueCurrencies()
          .reduce(
            (prev, current) => (prev[current] = 0, prev),
            {}
          )
      ),
    };
  }

  uniqueCurrencies() {
    const { currencies } = this.props;
    return uniqueCurrencies(currencies);
  }

  convert(updatedCurrency, value) {
    const { rates } = this.props;

    return this.uniqueCurrencies().reduce(
      (prev, currency) => {
        let calculation;

        if (currency === updatedCurrency) {
          calculation = value;
        } else {
          calculation = calculateCurrency(
            updatedCurrency,
            currency,
            rates,
            value
          );
        }

        prev[currency] = calculation;

        return prev;
      },
      {}
    )
  }

  handleChange(updatedCurrency) {
    return value => {
      const exchangeMatrix = this.convert(
        updatedCurrency,
        value
      );

      this.setState({
        exchangeMatrix,
      });
    }
  }

  render() {
    const { exchangeMatrix } = this.state;

    return (
      <div>
        {
          this.uniqueCurrencies().map(
            (currency, index) => (
              <ConverterItem
                key={ index }
                onChange={ this.handleChange(currency) }
                exchangeMatrix={ exchangeMatrix }
                currency={ currency }
              />
            )
          )
        }
      </div>
    );
  }
}
