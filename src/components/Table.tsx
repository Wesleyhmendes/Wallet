import { useSelector } from 'react-redux';
import { WalletInfo } from '../type';

function Table() {
  const userExpenses = useSelector((state: WalletInfo) => state.wallet.expenses);

  let selectedCambio = '';
  userExpenses.forEach((expense) => {
    const { currency } = expense;
    selectedCambio = expense.exchangeRates[currency].name;
  });

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
      { userExpenses.map((expense, index) => (
        <tbody key={ index }>
          <tr>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ parseFloat(expense.value).toFixed(2) }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>{ parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              { (parseFloat(expense.value) * parseFloat(expense
                .exchangeRates[expense.currency].ask)).toFixed(2) }
            </td>
            <td>Real</td>
            <button>✏️</button>
            <button>❌</button>
          </tr>
        </tbody>
      )) }
    </table>
  );
}

export default Table;
