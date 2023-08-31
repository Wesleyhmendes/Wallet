import { useSelector } from 'react-redux';
import { UserInfo, WalletInfo } from '../type';

function Header() {
  const userInfo = useSelector((state: UserInfo) => state.user.email);
  const userExpenses = useSelector((state: WalletInfo) => state.wallet.expenses);

  const totalExpense = userExpenses.reduce((total, expense) => {
    const { value, currency } = expense;
    const askValue = parseFloat(expense.exchangeRates[currency].ask);
    const expenseValue = parseFloat(value);
    return total + askValue * expenseValue;
  }, 0);

  console.log(userExpenses);

  return (
    <header>
      <p data-testid="email-field">
        Email:
        { userInfo }
      </p>
      <p data-testid="header-currency-field">Casa de Câmbio: BRL</p>
      <p data-testid="total-field">
        { totalExpense.toFixed(2) }
      </p>
    </header>
  );
}

export default Header;
