import getCharacter from '../services/api';

function WalletForm() {
  getCharacter();
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
          {/* coinsApi.forEach((coin) => {
            <option value={ confirm.code }>{ confirm.code }</option>
          }) */}
        </select>
      </label>
    </section>
  );
}

export default WalletForm;
