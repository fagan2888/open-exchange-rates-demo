import React, { Component } from 'react';
import isomorphicFetch from 'isomorphic-fetch';

import { APP_ID } from './constants';
import Currencies from './components/Currencies';
import Layout from './components/Layout';
import Converter from './components/Converter';
import NewCurrencyDialog from './components/NewCurrencyDialog';
import ExchangeDialog from './components/ExchangeDialog';
import { TabView, Tab } from './components/TabView';


export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentTab: 0,
      rates: {},
      currencies: [
        ['EUR', 'PLN'],
        ['EUR', 'TRY'],
      ],
      pocket: {
        'EUR': 20,
        'PLN': 30,
        'TRY': 20,
      },
    };

    this.toggleCreationDialog = this.toggleCreationDialog.bind(this);
    this.toggleExchangeDialog = this.toggleExchangeDialog.bind(this);
    this.handleNewCurrency = this.handleNewCurrency.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();

    setInterval(this.fetchCurrencies, 30 * 1000);
  }

  fetchCurrencies() {
    isomorphicFetch(
      `https://openexchangerates.org/api/latest.json?app_id=${APP_ID};`
    ).then(
      response => response.json()
    ).then(
      ({ rates }) => {
        this.setState({ rates, loading: false });
      }
    );
  }

  toggleCreationDialog(event) {
    event.preventDefault();

    this.setState(({ showAddCurrencyModal }) => ({
      showAddCurrencyModal: !showAddCurrencyModal,
    }));
  }

  toggleExchangeDialog(event) {
    this.setState(({ showExchangeDialog }) => ({
      showExchangeDialog: !showExchangeDialog,
    }));
  }

  handleNewCurrency(from, to) {
    this.setState({
      showAddCurrencyModal: false,
      currencies: [
        ...this.state.currencies,
        [from, to],
      ],
      pocket: {
        [from]: this.state.pocket[from] || 0,
      },
    });
  }

  handleTabChange(index) {
    return () => {
      this.setState({
        currentTab: index,
      });
    }
  }

  render() {
    const {
      currencies, rates, loading, showAddCurrencyModal,
      showExchangeDialog, currentTab, pocket,
    } = this.state;

    return (
      <Layout
        handlers={{
          toggleCreationDialog: this.toggleCreationDialog,
          toggleExchangeDialog: this.toggleExchangeDialog,
        }}
      >
        <TabView
          current={ currentTab }
          onChange={ this.handleTabChange }
        >
          <Tab header={ 'Rates' }>
            {
              !loading && (
                <Currencies
                  rates={ rates }
                  currencies={ currencies }
                />
            )}
          </Tab>
          <Tab header={ 'Converter' }>
            <Converter
              rates={ rates }
              currencies={ currencies }
            />
          </Tab>
        </TabView>
        { showAddCurrencyModal && (
          <NewCurrencyDialog
            rates={ rates }
            onCancel={ this.toggleCreationDialog }
            onSave={ this.handleNewCurrency }
          />
        ) }
        { showExchangeDialog && (
          <ExchangeDialog
            rates={ rates }
            currencies={ currencies }
            pocket={ pocket }
            onCancel={ this.toggleExchangeDialog }
            onSave={ this.toggleExchangeDialog }
          />
        ) }
      </Layout>
    );
  }
}
