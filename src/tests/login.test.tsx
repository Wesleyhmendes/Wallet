import { render, screen, waitFor } from '@testing-library/react';
import { legacy_createStore as createStore } from 'redux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';
import { USER_LOGIN } from '../redux/actions';
import rootReducer from '../redux/reducers';

const USER_EMAIL = 'teste@trybe.com';
const USER_PASSWORD = '123456';
const route = '/carteira';

const firstDescription = 'Livros';
const firstValue = '10';

describe('Testes referentes à tela de login', () => {
  it('Verifica as funcionalidades da tela de login', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
    await userEvent.type(inputEmail, USER_EMAIL);
    await userEvent.type(inputPassword, USER_PASSWORD);
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/casa de câmbio: brl/i)).toBeInTheDocument();
    });
  });

  it('verifica a tela de form', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(screen.getByText(/casa de câmbio: brl/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/categoria da despesa/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();

    const description = screen.getByPlaceholderText(/descrição/i);
    const valor = screen.getByPlaceholderText(/valor/i);
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    await userEvent.type(description, firstDescription);
    await userEvent.type(valor, firstValue);
    await userEvent.click(addExpense);

    // Verify first expense of the table

    await waitFor(() => {
      const expenseDescription = screen.getByRole('cell', { name: /Livros/i });
      expect(expenseDescription).toBeInTheDocument();
    });
    await waitFor(() => {
      const expenseTag = screen.getByRole('cell', { name: /Alimentação/i });
      expect(expenseTag).toBeInTheDocument();
    });
    await waitFor(() => {
      const expenseMethod = screen.getByRole('cell', { name: /Dinheiro/i });
      expect(expenseMethod).toBeInTheDocument();
    });
    await waitFor(() => {
      const expenseValue = screen.getByRole('cell', { name: /10\.00/i });
      expect(expenseValue).toBeInTheDocument();
    });
    await waitFor(() => {
      const expenseCurrency = screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i });
      expect(expenseCurrency).toBeInTheDocument();
    });
  });

  // Edit first expense of the table
});
