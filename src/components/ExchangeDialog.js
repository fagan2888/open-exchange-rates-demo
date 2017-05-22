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
      amount: 0,
    };

    this.handleChange = this.handleChange.bind(this);
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
    );
  }

  exceedsBalance() {
    return (
      this.state.amount >
        this.props.pocket[this.state.from]
    );
  }

  render() {
    const { rates, onCancel, onSave, currencies, pocket } = this.props;
    const { from, to, amount } = this.state;
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
          amount={ amount }
          onAmountChange={ this.handleChange('amount') }
          onChange={ this.handleChange('from') }
          editable
        />
        <ExchangeOption
          currencies={ currencyOptions }
          pocket={ pocket }
          direction={ 'to' }
          value={ to }
          amount={ calculateCurrency(from, to, rates, amount) }
          onChange={ this.handleChange('to') }
        />
      </div>
    );
  }
}
