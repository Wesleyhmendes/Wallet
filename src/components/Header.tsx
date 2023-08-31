import { useSelector } from 'react-redux';
import { UserInfo, WalletInfo } from '../type';

function Header() {
  const userInfo = useSelector((state: UserInfo) => state.user.email);
  const userExpenses = useSelector((state: WalletInfo) => state.wallet.expenses);
  console.log(userInfo);
  const total = userExpenses.map((expense) => expense.value).reduce((acc, crr) => {
    acc += Number(crr);
    return acc;
  }, 0);
  return (
    <header>
      <p data-testid="email-field">
        Email:
        { userInfo }
      </p>
      <p data-testid="header-currency-field">Casa de Câmbio: BRL</p>
      <p data-testid="total-field">
        Despesa Total:
        { total.toFixed(2) }
      </p>
    </header>
  );
}

export default Header;
