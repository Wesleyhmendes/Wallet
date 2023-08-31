import { AnyAction } from 'redux';
import { CURRENCY_API_SUCCESS, CURRENCY_API_START } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const personalWallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case CURRENCY_API_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
      };
    case CURRENCY_API_START:
      return state;
    default:
      return state;
  }
};

export default personalWallet;
