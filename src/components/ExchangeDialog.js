import React, { Component } from 'react';

import styles from '../styles/Dialog.module.css';
import ExchangeOption from './ExchangeOption';
import ExchangeHeader from './ExchangeHeader';
import { uniqueCurrencies, calculateCurrency } from '../utils';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: 'EUR',
      to: 'PLN',
      fromAmount: 0,
      toAmount: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleReverseChange = this.handleReverseChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(key) {
    return value => {
      this.setState({
        [key]: value
      });
    };
  }

  submit() {
    this.props.onSave(
      this.state.from,
      this.state.to,
      Number(this.state.fromAmount),
      Number(this.state.toAmount),
    );
  }

  handleAmountChange(value) {
    this.setState({
      fromAmount: value,
      toAmount: calculateCurrency(
        this.state.from,
        this.state.to,
        this.props.rates,
        value
      ),
    })
  }

  handleReverseChange(value) {
    this.setState({
      toAmount: value,
      fromAmount: calculateCurrency(
        this.state.to,
        this.state.from,
        this.props.rates,
        value
      ),
    })
  }

  exceedsBalance() {
    return (
      this.state.fromAmount >
        this.props.pocket[this.state.from]
    );
  }

  render() {
    const { rates, onCancel, onSave, currencies, pocket } = this.props;
    const { from, to, fromAmount, toAmount } = this.state;
    const currencyOptions = uniqueCurrencies(currencies);

    const exceedsBalance = this.exceedsBalance();

    return (
      <div className={ styles.dialog }>
        <ExchangeHeader
          onCancel={ onCancel }
          onSubmit={ this.submit }
          submitEnabled={ !exceedsBalance }
        />
        <ExchangeOption
          highlight={ exceedsBalance }
          currencies={ currencyOptions }
          pocket={ pocket }
          direction={ 'from' }
          value={ from }
          amount={ fromAmount }
          onAmountChange={ this.handleAmountChange }
          onChange={ this.handleChange('from') }
          prefix={ '-' }
        />
        <ExchangeOption
          currencies={ currencyOptions }
          pocket={ pocket }
          direction={ 'to' }
          value={ to }
          onAmountChange={ this.handleReverseChange }
          amount={ toAmount }
          onChange={ this.handleChange('to') }
          prefix={ '+' }
        />
      </div>
    );
  }
}
