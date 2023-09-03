import { render, screen, waitFor } from '@testing-library/react';
import { legacy_createStore as createStore } from 'redux';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { getCurrencyApi } from '../redux/actions';
import mockData from './helpers/mockData';

const USER_EMAIL = 'teste@trybe.com';
const USER_PASSWORD = '123456';
const route = '/carteira';

const userInfo = {
  user: {
    email: USER_EMAIL,
    password: USER_PASSWORD,
  },
};

const firstDescription = 'Livros';
const firstValue = '44';
const secondDescription = 'Coxinha';
const secondValue = '696';

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

    expect(screen.getByText(/casa de câmbio: brl/i)).toBeInTheDocument();
  });

  it('verifica a tela de form', async () => {
    // vi.spyOn(getCurrencyApi, userInfo);

    renderWithRouterAndRedux(<App />, { initialEntries: [route] });

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
      const expenseValue = screen.getByRole('cell', { name: /44\.00/i });
      expect(expenseValue).toBeInTheDocument();
    });
    await waitFor(() => {
      const expenseCurrency = screen.getByRole('cell', { name: /Dólar Americano\/real brasileiro/i });
      expect(expenseCurrency).toBeInTheDocument();
    });

    // Edit first expense of the table

    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    const editExpense = screen.getByRole('button', { name: /editar despesa/i });
    const removeExpense = screen.getByRole('button', { name: /remove/i });

    await waitFor(() => {
      expect(editButton).toBeDisabled();
      expect(editExpense).toBeInTheDocument();
    });

    await userEvent.type(description, secondDescription);
    await userEvent.type(valor, secondValue);
    await userEvent.click(editExpense);

    await waitFor(() => {
      expect(editButton).not.toBeDisabled();
      expect(addExpense).toBeInTheDocument();
    });

    await waitFor(() => {
      const expenseDescription = screen.getByRole('cell', { name: /Coxinha/i });
      expect(expenseDescription).toBeInTheDocument();
    });
    await waitFor(() => {
      const expenseValue = screen.getByRole('cell', { name: /696\.00/i });
      expect(expenseValue).toBeInTheDocument();
    });

    await userEvent.click(removeExpense);
  });
});
