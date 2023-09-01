import { AnyAction } from 'redux';
import {
  CURRENCY_API_SUCCESS,
  CURRENCY_API_START,
  UPDATE_EXCHANGE,
  UPDATE_USER_EXPENSES,
  EDIT_BUTTON,
  EDIT_EXPENSE,
  SEND_EXPENSE_ID,
} from '../actions';
import { WalletInfo } from '../../type';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE: WalletInfo['wallet'] = {
  currencies: [],
  expenses: [],
  // editor: false,
  editMode: false,
  expenseIdToEdit: 0,
};

const personalWallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case CURRENCY_API_SUCCESS:
      return {
        ...state,
        currencies: Object.keys(action.payload),
      };
    case CURRENCY_API_START:
      return state;
    case UPDATE_USER_EXPENSES:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    case EDIT_BUTTON:
      return {
        ...state,
        editMode: !state.editMode,
      };
    case SEND_EXPENSE_ID:
      return {
        ...state,
        expenseIdToEdit: action.payload,
      };
    case EDIT_EXPENSE: {
      const updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === state.expenseIdToEdit) {
          return {
            ...expense,
            ...action.payload,
          };
        } return expense;
      });
      return {
        ...state,
        expenses: updatedExpenses,
      }; }
    case UPDATE_EXCHANGE:
      return { ...state,
        expenses: [
          ...state.expenses,
          { ...action.payload.userExpenseInfo,
            exchangeRates: action.payload.data,
          }] };
    default:
      return state;
  }
};

export default personalWallet;
