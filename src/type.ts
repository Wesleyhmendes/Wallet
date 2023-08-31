import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type UserInfo = {
  user: {
    email: string,
    password: string,
  }
};

export type ExpensesType = {
  id: number,
  value: number,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: {
    [key: string]: {
      code: string,
      name: string,
      ask: string,
    }
  }
};

export type Expense = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: ExpensesType['exchangeRates']
};

export type WalletInfo = {
  wallet: {
    currencies: Array<string>,
    expenses: Array<Expense>,
    editor: boolean,
    idToEdit: number,
  }
};

export type Dispatch = ThunkDispatch<WalletInfo, null, AnyAction>;
