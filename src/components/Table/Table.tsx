import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Dispatch, TableInfos, WalletInfo } from '../../type';
import { updateExpenses, editButton, sendExpenseId } from '../../redux/actions';
import './table.modules.css';

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
    <div className="mainTable">

      <table className="table">
        <thead>
          <tr>
            <th className="tableHead">Descrição</th>
            <th className="tableHead">Tag</th>
            <th className="tableHead">Método de pagamento</th>
            <th className="tableHead">Valor</th>
            <th className="tableHead">Moeda</th>
            <th className="tableHead">Câmbio utilizado</th>
            <th className="tableHead">Valor convertido</th>
            <th className="tableHead">Moeda de conversão</th>
            <th className="tableHead2">Editar/Excluir</th>
          </tr>
        </thead>
        { expenseState.map((expense) => (
          <tbody key={ expense.id }>
            <tr>
              <td className="tableBody">{ expense.description }</td>
              <td className="tableBody">{ expense.tag }</td>
              <td className="tableBody">{ expense.method }</td>
              <td className="tableBody">{ (expense.value).toFixed(2) }</td>
              <td className="tableBody">{ expense.currency }</td>
              <td className="tableBody">{ (expense.cambio as number).toFixed(2) }</td>
              <td className="tableBody">{ (expense.convert as number).toFixed(2) }</td>
              <td className="tableBody">{ expense.baseCoin }</td>
              <td className="buttonTD">
                <button
                  className="editButton"
                  data-testid="edit-btn"
                  name="remove"
                  disabled={ idToEdit }
                  onClick={ () => handleEdit(expense.id) }
                >
                  Editar
                </button>

                <button
                  className="removeButton"
                  data-testid="delete-btn"
                  onClick={ () => handleDelete(expense.id) }
                  disabled={ idToEdit }
                >
                  Remover
                </button>
              </td>
            </tr>
          </tbody>
        )) }
      </table>
    </div>
  );
}

export default Table;
