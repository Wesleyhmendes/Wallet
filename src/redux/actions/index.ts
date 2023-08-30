// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_API = 'CURRENCY_API';

export const userLogin = (personalInfo: object) => ({
  type: USER_LOGIN,
  payload: personalInfo,
});

export const currencyApi = (currency: string) => ({
  type: CURRENCY_API,
  payload: currency,
});
