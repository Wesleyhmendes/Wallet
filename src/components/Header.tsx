import { useSelector } from 'react-redux';
import { UserInfo } from '../type';

function Header() {
  const user = useSelector((state: UserInfo) => state.user);
  return (
    <header>
      <p data-testid="email-field">
        Email:
        { user.email }
      </p>
      <p data-testid="total-field">Despesa Total:0</p>
      <p data-testid="header-currency-field">Casa de Câmbio: BRL</p>
    </header>
  );
}

export default Header;
