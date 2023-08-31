import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type UserInfo = {
  user: {
    email: string,
    password: string,
  }
};

export type WalletInfo = {
  wallet: {
    currencies: Array<string>,
    expenses: Array<number>,
    editor: boolean,
    idToEdit: number,
  }
};

export type Dispatch = ThunkDispatch<WalletInfo, null, AnyAction>;
