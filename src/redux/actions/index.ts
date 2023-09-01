import { Dispatch, EditExpense } from '../../type';

export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_API_START = 'CURRENCY_API_START';
export const CURRENCY_API_SUCCESS = 'CURRENCY_API_SUCCESS';
export const UPDATE_EXCHANGE = 'UPDATE_EXCHANGE';
export const UPDATE_USER_EXPENSES = 'UPDATE_USER_EXPENSES';
export const EDIT_BUTTON = 'EDIT_BUTTON';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SEND_EXPENSE_ID = 'SEND_EXPENSE_ID';

export const userLogin = (personalInfo: object) => ({
  type: USER_LOGIN,
  payload: personalInfo,
});

export const currencyApiStart = () => ({
  type: CURRENCY_API_START,
});

export const currencyApiSuccess = (currency: Array<string>) => ({
  type: CURRENCY_API_SUCCESS,
  payload: currency,
});

export const updateExchange = (data: any, userExpenseInfo: any) => ({
  type: UPDATE_EXCHANGE,
  payload: {
    data,
    userExpenseInfo,
  },
});

export const updateExpenses = (id: number) => ({
  type: UPDATE_USER_EXPENSES,
  payload: id,
});

export const editButton = () => ({
  type: EDIT_BUTTON,
});

export const sendExpenseId = (id: number) => ({
  type: SEND_EXPENSE_ID,
  payload: id,
});

export const editExpense = (editedExpense: object) => ({
  type: EDIT_EXPENSE,
  payload: editedExpense,
});

const DefaultURL = 'https://economia.awesomeapi.com.br/json/all';

export function getCurrencyApi(userExpenseInfo: any) {
  return async (dispatch: Dispatch) => {
    dispatch(currencyApiStart());
    try {
      const response = await fetch(DefaultURL);
      const data = await response.json();
      const { USDT, ...rest } = data;
      if (!userExpenseInfo) {
        dispatch(currencyApiSuccess(rest));
      } else {
        dispatch(updateExchange(data, userExpenseInfo));
      }
    } catch (error: any) {
      // console.log(error);
    }
  };
}
