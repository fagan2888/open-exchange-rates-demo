import React, { Component } from 'react';

import styles from '../styles/Dialog.module.css';


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: 'EUR',
      to: 'PLN',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(key) {
    return event => {
      this.setState({
        [key]: event.target.value
      });
    };
  }

  submit() {
    this.props.onSave(
      this.state.from,
      this.state.to,
    );
  }

  render() {
    const { rates, onCancel, onSave } = this.props;
    const { from, to } = this.state;

    const optionSet = Object.keys(rates).map(
      key => (
        <option
          key={ key }
          value={ key }
        >
          { key }
        </option>
      )
    );

    return (
      <div className={ styles.dialog }>
        <p>
          <label>From</label>
          <select
            onChange={ this.handleChange('from') }
            value={ from }
          >
            { optionSet }
          </select>
          <label>To</label>
          <select
            onChange={ this.handleChange('to') }
            value={ to }
          >
            { optionSet }
          </select>
        </p>
        <p className={ styles.dialogActions }>
          <a
            href={ '#' }
            onClick={ onCancel }
          >
            Cancel
          </a>
          <a
            href={ '#' }
            className={ styles.submit }
            onClick={ this.submit }
          >
            Submit
          </a>
        </p>
      </div>
    );
  }
}
