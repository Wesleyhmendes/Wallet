import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { getCurrencyApi } from '../redux/actions';
import { Dispatch, WalletInfo } from '../type';

function WalletForm() {
  const [userExpense, setUserExpense] = useState({
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  });

  useEffect(() => {
    dispatch(getCurrencyApi(false));
  }, []);

  const dispatch: Dispatch = useDispatch();
  const currencies = useSelector((state: WalletInfo) => state.wallet.currencies);
  const coins = Object.keys(currencies);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserExpense({
      ...userExpense,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getCurrencyApi(userExpense));
    setUserExpense({
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  };

  console.log(currencies);
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="description">
        Descrição da despesa
        <input
          value={ userExpense.description }
          onChange={ handleChange }
          name="description"
          type="text"
        />
      </label>
      <label htmlFor="category">
        Categoria da despesa
        <select onChange={ handleChange } name="tag" data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor
        <input
          value={ userExpense.value }
          onChange={ handleChange }
          name="value"
          data-testid="value-input"
          type="text"
        />
      </label>
      <label htmlFor="method">
        Método de pagamento
        <select onChange={ handleChange } name="method" data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="currency">
        Moeda
        <select onChange={ handleChange } name="currency" data-testid="currency-input">
          { coins.map((coin, index) => (
            <option key={ index } value={ coin }>{ coin }</option>
          )) }
        </select>
      </label>
      <button>Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
