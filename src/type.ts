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

export type EditExpense = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
};

export type WalletInfo = {
  wallet: {
    currencies: Array<string>,
    expenses: Array<Expense>,
    // editor: boolean,
    editMode: boolean,
    expenseIdToEdit: number,
  }
};

export type TableInfos = {
  description: string,
  tag: string,
  method: string,
  value: number,
  currency: string,
  cambio: number | string,
  convert: number | string,
  baseCoin: string,
  id: number,
};

export type Dispatch = ThunkDispatch<WalletInfo, null, AnyAction>;
