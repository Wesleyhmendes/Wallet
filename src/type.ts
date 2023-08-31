import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type UserInfo = {
  user: {
    email: string,
    password: string,
  }
};

export type ExpensesType = {
  id: 0,
  value: number,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: {
    'id': 0,
    'value': number | string,
    'description': string,
    'currency': string,
    'method': string,
    'tag': string,
    'exchangeRates': {
      'USD': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'CAD': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'EUR': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'GBP': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'ARS': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'BTC': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'LTC': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'JPY': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'CHF': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'AUD': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'CNY': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'ILS': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'ETH': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      },
      'XRP': {
        'code': string | unknown | any,
        'name': string,
        'ask': string,
      }
    }
  }
};

export type WalletInfo = {
  wallet: {
    currencies: Array<string>,
    expenses: [
      {
        currency: string,
        description: string,
        exchangeRates: ExpensesType,
        id: number,
        method: string,
        tag: string,
        value: string,
      },
    ],
    editor: boolean,
    idToEdit: number,
  }
};

export type Dispatch = ThunkDispatch<WalletInfo, null, AnyAction>;
