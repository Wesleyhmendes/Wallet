import { Dispatch } from '../../type';

// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_API_START = 'CURRENCY_API_START';
export const CURRENCY_API_SUCCESS = 'CURRENCY_API_SUCCESS';

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

const DefaultURL = 'https://economia.awesomeapi.com.br/json/all';

export function getCharacter() {
  return async (dispatch: Dispatch) => {
    dispatch(currencyApiStart());
    try {
      const response = await fetch(DefaultURL);
      const data = await response.json();
      delete data.USDT;
      dispatch(currencyApiSuccess(data));
    } catch (error: any) {
      console.log(error);
    }
  };
}
