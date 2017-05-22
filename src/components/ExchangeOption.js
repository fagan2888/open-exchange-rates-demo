import React, { Component } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import CurrencyInput from './CurrencyInput';
import styles from '../styles/ExchangeOption.module.css';

export default class ExchangeOption extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};
    this.handleSlideChange = this.handleSlideChange.bind(this);
  }

  handleSlideChange(index) {
    const { onChange, currencies } = this.props;
    const currency = currencies[index];
    onChange(currency);
  }

  render() {
    const {
      currencies,
      pocket,
      value,
      direction,
      onAmountChange,
      amount,
      highlight,
      prefix,
    } = this.props;

    return (
      <div className={ classNames(styles.slider, styles[direction]) }>
        <Slider
          dots
          infinite
          slideToShow={ 1 }
          slidesToScroll={ 1 }
          initialSlide={ currencies.indexOf(value) }
          arrows={ false }
          afterChange={ this.handleSlideChange }
        >
          {
            currencies.map((currency, index) => (
              <div
                key={ index }
                className={ styles.option }
              >
                <div className={ styles.currency }>
                  { currency }
                </div>
                <div className={ styles.input }>
                 <CurrencyInput
                    onChange={ onAmountChange }
                    value={ amount }
                    prefix={ prefix }
                  />
                </div>
                <div className={ classNames(styles.amount, {
                  [styles.highlighted]: highlight
                })}>
                  You have { pocket[currency].toFixed(2) } { currency }
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
    );
  }
}
