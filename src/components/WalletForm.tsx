import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { getCurrencyApi, editExpense, editButton } from '../redux/actions';
import { Dispatch, EditExpense, WalletInfo } from '../type';

function WalletForm() {
  const INPUTS_INICIAL_STATE: EditExpense = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  const [lastId, setLastId] = useState(0);
  const [userExpense, setUserExpense] = useState(INPUTS_INICIAL_STATE);

  useEffect(() => {
    dispatch(getCurrencyApi(false));
  }, []);

  const dispatch: Dispatch = useDispatch();

  const currencies = useSelector((state: WalletInfo) => state.wallet.currencies);
  const idToEdit = useSelector((state: WalletInfo) => state.wallet.editMode);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserExpense({
      ...userExpense,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!idToEdit) {
      const updatedUserExpense = {
        ...userExpense,
        id: lastId === 0 ? 0 : lastId, // Não preciso desta condicional. Retirar depois...
      };

      dispatch(getCurrencyApi(updatedUserExpense));
      setUserExpense(INPUTS_INICIAL_STATE);
      setLastId(lastId + 1);
    } else {
      const editedInfo = {
        value: userExpense.value,
        description: userExpense.description,
        currency: userExpense.currency,
        method: userExpense.method,
        tag: userExpense.tag,
      };
      dispatch(editExpense(editedInfo));
      setUserExpense(INPUTS_INICIAL_STATE);
      dispatch(editButton());
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="description">
        Descrição da despesa
        <input
          placeholder="Descrição"
          data-testid="description-input"
          value={ userExpense.description }
          onChange={ handleChange }
          name="description"
          type="text"
        />
      </label>
      <label htmlFor="category">
        Categoria da despesa
        <select
          onChange={ (event) => handleChange(event) }
          name="tag"
          data-testid="tag-input"
          value={ userExpense.tag }
        >
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
          placeholder="Valor"
          value={ userExpense.value }
          onChange={ (event) => handleChange(event) }
          name="value"
          data-testid="value-input"
          type="number"
        />
      </label>
      <label htmlFor="method">
        Método de pagamento
        <select
          onChange={ (event) => handleChange(event) }
          name="method"
          data-testid="method-input"
          value={ userExpense.method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="currency">
        Moeda
        <select
          onChange={ (event) => handleChange(event) }
          name="currency"
          data-testid="currency-input"
          value={ userExpense.currency }
        >
          { currencies.map((coin, index) => (
            <option key={ index } value={ coin }>{ coin }</option>
          )) }
        </select>
      </label>
      <button>{ idToEdit ? 'Editar despesa' : 'Adicionar Despesa' }</button>
    </form>
  );
}

export default WalletForm;
