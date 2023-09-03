import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, TableInfos, WalletInfo } from '../type';
import { updateExpenses, editButton, sendExpenseId } from '../redux/actions';

function Table() {
  const [expenseState, setExpenseState] = useState<TableInfos[]>([]);

  const userExpenses = useSelector((state: WalletInfo) => state.wallet.expenses);
  const idToEdit = useSelector((state: WalletInfo) => state.wallet.editMode);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    const getExpenses = userExpenses.map((expense) => {
      return {
        description: expense.description,
        tag: expense.tag,
        method: expense.method,
        value: parseFloat(expense.value),
        currency: expense.exchangeRates[expense.currency].name,
        cambio: parseFloat(expense.exchangeRates[expense.currency].ask),
        convert: (parseFloat(expense.value) * parseFloat(expense
          .exchangeRates[expense.currency].ask)),
        baseCoin: 'Real',
        id: expense.id,
      };
    });

    setExpenseState(getExpenses);
  }, [userExpenses]);

  const handleDelete = (id: number) => {
    dispatch(updateExpenses(id));
  };

  const handleEdit = (id: number) => {
    dispatch(editButton());
    dispatch(sendExpenseId(id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      { expenseState.map((expense) => (
        <tbody key={ expense.id }>
          <tr>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ (expense.value).toFixed(2) }</td>
            <td>{ expense.currency }</td>
            <td>{ (expense.cambio as number).toFixed(2) }</td>
            <td>{ (expense.convert as number).toFixed(2) }</td>
            <td>{ expense.baseCoin }</td>
            <td>
              <button
                data-testid="edit-btn"
                disabled={ idToEdit }
                onClick={ () => handleEdit(expense.id) }
              >
                <img src="imgs/edit.svg" alt="edit" />
              </button>

              <button
                data-testid="delete-btn"
                onClick={ () => handleDelete(expense.id) }
                disabled={ idToEdit }
              >
                <img src="imgs/remove.svg" alt="remove" />
              </button>
            </td>
          </tr>
        </tbody>
      )) }
    </table>
  );
}

export default Table;
