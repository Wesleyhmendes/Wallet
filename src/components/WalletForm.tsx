import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCharacter } from '../redux/actions';
import { Dispatch, WalletInfo } from '../type';

function WalletForm() {
  const [userExpense, setUserExpense] = useState([{
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: {},
  }]);

  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacter());
  }, []);

  const currencies = useSelector((state: WalletInfo) => state.wallet.currencies);
  const coins = Object.keys(currencies);

  console.log(currencies);
  return (
    <section>
      <label htmlFor="description">
        Descrição da despesa
        <input type="text" />
      </label>
      <label htmlFor="category">
        Categoria da despesa
        <select name="category" data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor
        <input data-testid="value-input" type="text" />
      </label>
      <label htmlFor="method">
        Método de pagamento
        <select name="method" data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="currency">
        Moeda
        <select name="currency" data-testid="currency-input">
          { coins.map((coin, index) => (
            <option key={ index } value={ coin }>{ coin }</option>
          )) }
        </select>
      </label>
      <button>Adicionar despesa</button>
    </section>
  );
}

export default WalletForm;
