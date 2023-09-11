import { useSelector } from 'react-redux';
import { UserInfo, WalletInfo } from '../../type';
import './header.modules.css';

function Header() {
  const userInfo = useSelector((state: UserInfo) => state.user.email);
  const userExpenses = useSelector((state: WalletInfo) => state.wallet.expenses);

  const totalExpense = userExpenses.reduce((total, expense) => {
    const { value, currency } = expense;
    const askValue = parseFloat(expense.exchangeRates[currency].ask);
    const expenseValue = parseFloat(value);
    return total + askValue * expenseValue;
  }, 0);

  return (
    <header className="HeaderUserInfos">
      <div className="loginTitle">
        <img className="moneyFormIcon" src="src/assets/money-icon.png" alt="" />
        <h1>
          Trybe
          <span className="walletWord">Wallet</span>
        </h1>
      </div>
      <div className="headerInfos">
        <p className="emailP" data-testid="email-field">
          <img className="profileIcon" src="src/assets/profile-icon.svg" alt="edit" />
          { userInfo }
        </p>
        <p data-testid="header-currency-field">
          <b>Casa de Câmbio: </b>
          BRL
        </p>
        <p className="total" data-testid="total-field">
          <img className="totalIcon" src="src/assets/total-icon.svg" alt="edit" />
          <b className="totalP">
            Total de despesas:
          </b>
          { totalExpense.toFixed(2) }
        </p>
      </div>
    </header>
  );
}

export default Header;
